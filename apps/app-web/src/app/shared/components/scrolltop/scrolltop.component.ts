import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  OnInit,
  Inject,
  HostListener,
  PLATFORM_ID,
} from '@angular/core';
import { WindowRef } from '../../services/window.service';


@Component({
  selector: 'personalizados-lopes-scroll-top',
  templateUrl: './scrolltop.component.html',
  styleUrls: ['./scrolltop.component.scss'],
})
export class ScrolltopComponent implements OnInit {
  windowScrolled: boolean;
  constructor(@Inject(PLATFORM_ID) private platform: Object,private windowRef: WindowRef) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.windowRef.nativeWindow.pageYOffset >= 600) {
      this.windowScrolled = true;
    } else if (this.windowScrolled && this.windowRef.nativeWindow.pageYOffset <= 600) {
      this.windowScrolled = false;
    }
  }
  scrollToTop() {
    if (isPlatformBrowser(this.platform))
      (function smoothscroll() {
        var currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          this.windowRef.nativeWindow.requestAnimationFrame(smoothscroll);
          this.windowRef.nativeWindow.scrollTo(0, currentScroll - currentScroll / 8);
        }
      })();
  }
  ngOnInit() {}
}
