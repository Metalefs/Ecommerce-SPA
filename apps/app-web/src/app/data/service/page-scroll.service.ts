import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
    providedIn: "root",
})
export class PageScrollService{
  constructor(@Inject(PLATFORM_ID) private platform: Object, private Document: Document){}
    scrollTop(){
      if (isPlatformBrowser(this.platform)) {
        (function smoothscroll() {
          var currentScroll = this.Document.documentElement.scrollTop || this.Document.body.scrollTop;
          if (currentScroll > 0) {
              window.requestAnimationFrame(smoothscroll);
              window.scrollTo(0, currentScroll - (currentScroll / 8));
          }
        })();
      }
    }
    scrollDown(){
      if (isPlatformBrowser(this.platform)) {
        (function smoothscroll() {
            window.scrollTo({ left: 0, top: this.Document.body.scrollHeight, behavior: "smooth" });
        })();
      }
    }
}
