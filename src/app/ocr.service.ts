import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OcrService {
  constructor() { }

  getOcr(image: File): Observable<string>{
    return of('HOCRSTRINGTEST');
  }
}
