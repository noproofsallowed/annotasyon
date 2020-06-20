import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Input,
  AfterViewInit,
  Output,
  EventEmitter,
} from "@angular/core";
import { MouseInput } from "hammerjs";
import { interval } from "rxjs";

const WIDTH = 600;
const HEIGHT = 800;
const TAG_COLORS = {
  ocr_page: "black",
  ocr_carea: "gray",
  ocr_par: "darkgreen",
  ocr_line: "green",
  ocrx_word: "lime",
};

export interface Rect {
  x: number;
  y: number;
  text: string;
  tag: string;
  width: number;
  height: number;
}

@Component({
  selector: "app-canvas",
  templateUrl: "./canvas.component.html",
  styleUrls: ["./canvas.component.scss"],
})
export class CanvasComponent implements OnInit, AfterViewInit {
  private image = new Image();
  @ViewChild("image") canvasElement: ElementRef;
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  public scale = 1.0;
  public anchorx = 0;
  public anchory = 0;
  public deltax = 0;
  public deltay = 0;
  public width = WIDTH;
  public height = HEIGHT;
  public mousex = 0;
  public mousey = 0;
  public showText = true;
  public showRect = true;
  public tagVisibility = new Map([
    ["ocr_page", true],
    ["ocr_carea", true],
    ["ocr_par", true],
    ["ocr_line", true],
    ["ocrx_word", true],
  ]);
  @Output() selectedChange = new EventEmitter<Rect>();
  @Input() public rects: Rect[];

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.canvas = this.canvasElement.nativeElement as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d");

    this.image.onload = () => {
      this.scale = this.fitScale(
        this.image.width,
        this.image.height,
        WIDTH,
        HEIGHT
      );
      this.width = this.image.width * this.scale;
      this.height = this.image.height * this.scale;
      if (this.width < WIDTH) {
        this.anchorx = (WIDTH - this.width) / 2;
      }
      if (this.height < HEIGHT) {
        this.anchory = (HEIGHT - this.height) / 2;
      }
      interval(20).subscribe(this.loop.bind(this));
      console.log("width=" + this.width + ", height=" + this.height);
      console.log(
        "image.width=" + this.image.width + ",image.height=" + this.image.height
      );
    };
  }

  fitScale(
    width: number,
    height: number,
    targetWidth: number,
    targetHeight: number
  ): number {
    let scale = targetWidth / width;
    if (targetHeight / height < scale) {
      scale = targetHeight / height;
    }
    return scale;
  }

  loop() {
    const offsetx = this.anchorx + this.deltax;
    const offsety = this.anchory + this.deltay;
    const scale = this.scale;
    this.width = this.image.width * scale;
    this.height = this.image.height * scale;
    this.context.clearRect(0, 0, WIDTH, HEIGHT);
    this.context.drawImage(
      this.image,
      offsetx,
      offsety,
      this.width,
      this.height
    );
    this.context.font = "14px Courier Prime, monospace";
    for (const rect of this.rects) {
      const rectx = rect.x * scale + offsetx;
      const recty = rect.y * scale + offsety;
      const rectwidth = rect.width * scale;
      const rectheight = rect.height * scale;
      if (rect.tag === "focus") {
        this.context.fillStyle = "rgba(0, 200, 0, 0.4)";
        this.context.fillRect(rectx, recty, rectwidth, rectheight);
        this.context.fillStyle = "black";
      }
      if (this.showRect && this.tagVisibility.get(rect.tag)) {
        if (TAG_COLORS.hasOwnProperty(rect.tag)) {
          this.context.strokeStyle = TAG_COLORS[rect.tag];
        } else {
          this.context.strokeStyle = "silver";
        }
        this.context.strokeRect(rectx, recty, rectwidth, rectheight);
      }
      if (this.showText) {
        this.context.fillText(
          rect.text,
          rectx,
          recty + rectheight - 3,
          rectwidth
        );
      }
    }
  }

  @Input()
  set focus(focus: Rect) {
    if (focus === null || focus === undefined) {
      return;
    }
    const scale = Math.min(
      1.5,
      this.fitScale(focus.width, focus.height, WIDTH, HEIGHT)
    );
    let offsetx = -focus.x * scale;
    let offsety = -focus.y * scale;
    const twidth = focus.width * scale;
    const theight = focus.height * scale;
    if (twidth < WIDTH) {
      offsetx += (WIDTH - twidth) / 2;
    }
    if (theight < HEIGHT) {
      offsety += (HEIGHT - theight) / 2;
    }
    this.anchorx = offsetx;
    this.anchory = offsety;
    this.scale = scale;
  }

  onPan(e: MouseInput) {
    this.deltax = e.deltaX;
    this.deltay = e.deltaY;
    if (e.isFinal) {
      this.anchorx += this.deltax;
      this.anchory += this.deltay;
      this.deltax = 0;
      this.deltay = 0;
    }
  }

  setScale(e: KeyboardEvent) {
    this.scale = parseFloat((e.target as HTMLInputElement).value);
  }

  onMouseMove(e: MouseEvent) {
    this.mousex = (e.offsetX - this.anchorx - this.deltax) / this.scale;
    this.mousey = (e.offsetY - this.anchory - this.deltay) / this.scale;
  }

  select(e: MouseEvent) {
    const x = (e.offsetX - this.anchorx - this.deltax) / this.scale;
    const y = (e.offsetY - this.anchory - this.deltay) / this.scale;
    this.selectedChange.emit(this.getSmallestRect(x, y));
  }

  getSmallestRect(x: number, y: number): Rect {
    let ret: Rect;
    let area = -1;
    for (const rect of this.rects) {
      if (rect.x > x || rect.x + rect.width < x) {
        continue;
      }
      if (rect.y > y || rect.y + rect.height < y) {
        continue;
      }
      if (area === -1 || rect.width * rect.height < area) {
        area = rect.width * rect.height;
        ret = rect;
      }
    }
    return ret;
  }

  incScale() {
    this.scale += 0.1;
  }

  decScale() {
    this.scale -= 0.1;
  }

  @Input()
  set imgsrc(imgsrc: string) {
    this.image.src = imgsrc;
  }

  toggleRects(val: boolean) {
    this.showRect = val;
  }

  toggleText(val: boolean) {
    this.showText = val;
  }

  toggleTag(tag: string, val: boolean) {
    this.tagVisibility.set(tag, val);
  }
}
