import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DocumentRef } from './document.service';
import { WindowRef } from './window.service';

@Injectable({
    providedIn: "root",
})
export class PageScrollService{
  constructor(@Inject(PLATFORM_ID) private platform: Object, private windowRef: WindowRef, private document: DocumentRef){}
    scrollTop(){
      let self = this;
      if (isPlatformBrowser(this.platform)) {
        (function smoothscroll() {
          var currentScroll = self.document.nativeDocument.documentElement.scrollTop || self.document.nativeDocument.body.scrollTop;
          if (currentScroll > 0) {
            self.windowRef.nativeWindow.requestAnimationFrame(smoothscroll);
            self.windowRef.nativeWindow.scrollTo(0, currentScroll - (currentScroll / 8));
          }
        })();
      }
    }
    scrollDown(){
      let self = this;
      if (isPlatformBrowser(this.platform)) {
        (function smoothscroll() {
          self.windowRef.nativeWindow.scrollTo({ left: 0, top: self.document.nativeDocument.body.scrollHeight, behavior: "smooth" });
        })();
      }
    }
}
