import { Component } from '@angular/core';
import { OcrService } from './ocr.service';
import { Rect } from './canvas/canvas.component';
import { ReadVarExpr } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Osmanlica Annotasyon Aleti';
  hocr = '';
  imgsrc = '';

  constructor(private ocrService: OcrService) {}

  handleFileInput(files: FileList) {
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
      if (typeof reader.result === 'string') {
        this.imgsrc = reader.result;
      }
    };
    const image = files.item(0);
    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
