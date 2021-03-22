import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

function _window(): any {
  return window;
}
@Injectable({
  providedIn: "root",
})
export class WindowRef {
 get nativeWindow(): any {
   return _window();
 }
}
