import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { WindowRef } from './window.service';
function _Document(window:WindowRef): any {
  return window.nativeWindow.window.document;
}
@Injectable({
  providedIn: "root",
})
export class DocumentRef {
  constructor(private WindowRef: WindowRef){}
  get nativeDocument(): any {
    return _Document(this.WindowRef);
  }
}
