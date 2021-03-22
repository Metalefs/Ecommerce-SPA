import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DocumentRef } from './document.service';
import { WindowRef } from './window.service';

@Injectable({
    providedIn: "root",
})
export class PageScrollService{
  constructor(@Inject(PLATFORM_ID) private platform: Object, private windowRef: WindowRef){}
    scrollTop(){
      if (isPlatformBrowser(this.platform)) {
        (function smoothscroll() {
          var currentScroll = this.document.documentElement.scrollTop || this.document.body.scrollTop;
          if (currentScroll > 0) {
            this.windowRef.nativeWindow.requestAnimationFrame(smoothscroll);
            this.windowRef.nativeWindow.scrollTo(0, currentScroll - (currentScroll / 8));
          }
        })();
      }
    }
    scrollDown(){
      if (isPlatformBrowser(this.platform)) {
        (function smoothscroll() {
          this.windowRef.nativeWindow.scrollTo({ left: 0, top: this.document.body.scrollHeight, behavior: "smooth" });
        })();
      }
    }
}
