import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class OcrService {
  URL = "http://localhost:5000/imagetohocr";

  constructor(private http: HttpClient) {}

  getOcr(image: File): Observable<any> {
    const formData = new FormData();
    formData.append("fileName", image.name);
    formData.append("fileData", image, "olucakbuins");

    return this.http.post(this.URL, formData);
  }
}
