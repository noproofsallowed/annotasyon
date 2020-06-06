import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { Rect } from '../canvas/canvas.component';
import { parse } from 'querystring';
import { FormControl } from '@angular/forms';
import { interval } from 'rxjs';
import { Editor } from 'codemirror';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';

export interface HocrNode {
  id: string;
  typeset: string;
  bbox: Rect;
  props: { [key: string]: string[] };
  children: HocrNode[];
}

const bboxRe = /bbox (\d+) (\d+) (\d+) (\d+)/;
const idRe = /id=\'([^']*)\'/;

@Component({
  selector: 'app-hocr',
  templateUrl: './hocr.component.html',
  styleUrls: ['./hocr.component.css']
})
export class HocrComponent implements OnInit, AfterViewInit {
  @Input() imgsrc: string;
  @ViewChild('editor', { static: true }) editorComponent: CodemirrorComponent;
  hocrStr: string;
  doc: Document = null;
  root: HocrNode[] = [];
  focus: Rect = null;
  idMap: { [key: string]: Rect } = {};
  hocrComp = new FormControl('', { updateOn: 'change' });
  cmconfig = {
    lineNumbers: true,
    theme: 'solarized light',
    mode: 'xml',
    lineWrapping: true
  };
  domparser = new DOMParser();
  rects = [];

  @Input()
  set hocr(hocr: string) {
    this.hocrStr = hocr;
    this.parse();
  }

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {}

  setHocrString() {
    this.hocrStr = this.hocrComp.value;
    this.parse();
  }

  // TODO[oeren]: parse props as well
  parseDoc(el: Element): HocrNode {
    const id = el.id;
    const typeset = el.classList[0];

    const propStr = el.getAttribute('title');
    const match = propStr.match(bboxRe);
    const x0 = Number(match[1]);
    const x1 = Number(match[3]);
    const y0 = Number(match[2]);
    const y1 = Number(match[4]);
    const bbox = {
      text: '',
      x: x0,
      y: y0,
      tag: typeset,
      width: x1 - x0,
      height: y1 - y0
    };

    this.idMap[id] = bbox;

    const children: HocrNode[] = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < el.children.length; i++) {
      children.push(this.parseDoc(el.children[i]));
    }

    if (children.length === 0) {
      bbox.text = el.innerHTML;
    }

    return {
      id,
      typeset,
      bbox,
      props: {},
      children
    };
  }

  getRects(node: HocrNode): Rect[] {
    let ret: Rect[] = [node.bbox];
    for (const child of node.children) {
      ret = ret.concat(this.getRects(child));
    }
    return ret;
  }

  parse() {
    this.doc = this.domparser.parseFromString(this.hocrStr, 'text/html');
    const children = this.doc.getElementsByClassName('ocr_page');
    this.rects = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < children.length; i++) {
      console.log(children[i]);
      const node = this.parseDoc(children[i]);
      this.root.push(node);
      this.rects = this.rects.concat(this.getRects(node));
    }
  }

  scrollTo(rect: Rect) {
    const index = this.hocrStr.indexOf(
      `bbox ${rect.x} ${rect.y} ${rect.x + rect.width} ${rect.y + rect.height}`
    );
    const pos = this.editorComponent.codeMirror.posFromIndex(index);
    this.editorComponent.codeMirror.scrollIntoView(pos);
  }

  save() {
    const pom = document.createElement('a');
    pom.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(this.hocrStr)
    );
    pom.setAttribute('download', 'output.hocr');

    if (document.createEvent) {
      const event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      pom.dispatchEvent(event);
    } else {
      pom.click();
    }
  }

  cursorChanged(e: Editor) {
    this.parse();
    if (this.hocrStr === '' || this.hocrStr === undefined) {
      return;
    }
    const index = e.indexFromPos(e.getCursor());
    const st = this.hocrStr.substr(0, index);
    const re = new RegExp(idRe, 'g');
    let match: string[];
    let lastMatch: string[];
    // tslint:disable-next-line: no-conditional-assignment
    while ((match = re.exec(st)) !== null) {
      lastMatch = match;
    }
    if (
      lastMatch === undefined ||
      lastMatch === null ||
      lastMatch.length === 0
    ) {
      return;
    }
    this.focus = this.idMap[lastMatch[1]];
    this.focus.tag = 'focus';
    this.rects.push(this.focus);
  }

  generateTesseract() {
    // TODO[oeren]: implement this after simple flask server
  }
}
