import { Component, OnInit } from "@angular/core";
import { OcrService } from "./ocr.service";
import { Rect } from "./canvas/canvas.component";
import { ReadVarExpr } from "@angular/compiler";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "Osmanlica Annotasyon Aleti";
  hocr = "";
  imgsrc = "";
  numPage = 0;
  curPage = new FormControl("");
  res;
  constructor(private ocrService: OcrService) {}

  ngOnInit() {
    this.curPage.valueChanges.subscribe((val) => {
      let page = parseFloat(val);
      if (page < 0) {
        this.curPage.setValue(0);
        page = 0;
      } else if (page >= this.numPage) {
        this.curPage.setValue(String(this.numPage - 1));
        page = this.numPage - 1;
      }
      this.openPage(page);
    });
  }

  handleFileInput(files: FileList) {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        this.imgsrc = reader.result;
      }
    };
    const image = files.item(0);
    if (image) {
      reader.readAsDataURL(image);
    }
    this.ocrService.getOcr(image).subscribe(
      (res) => {
        console.log(res);
        this.res = res;
        this.numPage = res.data.length;
        this.curPage.setValue("0");
        this.openPage(0);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openPage(page: number) {
    this.hocr = this.res.data[page].hocr;
    if (this.res.data[page].data_url) {
      this.imgsrc = this.res.data[page].data_url;
    }
  }
}
