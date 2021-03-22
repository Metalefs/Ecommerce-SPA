import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  OnInit,
  Inject,
  HostListener,
  PLATFORM_ID,
} from '@angular/core';

@Component({
  selector: 'personalizados-lopes-scroll-top',
  templateUrl: './scrolltop.component.html',
  styleUrls: ['./scrolltop.component.scss'],
})
export class ScrolltopComponent implements OnInit {
  windowScrolled: boolean;
  constructor(@Inject(PLATFORM_ID) private platform: Object) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(PLATFORM_ID)) {
      if (window.pageYOffset >= 600) {
        this.windowScrolled = true;
      } else if (this.windowScrolled && window.pageYOffset <= 600) {
        this.windowScrolled = false;
      }
    }
  }
  scrollToTop() {
    if (isPlatformBrowser(PLATFORM_ID))
      (function smoothscroll() {
        var currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - currentScroll / 8);
        }
      })();
  }
  ngOnInit() {}
}
