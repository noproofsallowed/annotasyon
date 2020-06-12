import { BrowserModule, HammerModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { NgModule, Injectable } from "@angular/core";
import { HammerGestureConfig } from "@angular/platform-browser";
import { HAMMER_GESTURE_CONFIG } from "@angular/platform-browser";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgSqUiModule } from "@sq-ui/ng-sq-ui";
import { CodemirrorModule } from "@ctrl/ngx-codemirror";

import * as Hammer from "hammerjs";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HocrComponent } from "./hocr/hocr.component";
import { CanvasComponent } from "./canvas/canvas.component";

@Injectable()
export class AnnoHammerConfig extends HammerGestureConfig {
  overrides = {
    pan: { direction: Hammer.DIRECTION_ALL, threshold: 1 },
  } as any;
}

@NgModule({
  declarations: [AppComponent, HocrComponent, CanvasComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CodemirrorModule,
    ReactiveFormsModule,
    FormsModule,
    HammerModule,
    NgSqUiModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: AnnoHammerConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
