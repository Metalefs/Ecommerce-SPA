import { Component, OnInit, Inject, HostListener } from '@angular/core';

@Component({
    selector: 'personalizados-lopes-scroll-top',
    templateUrl: './scrolltop.component.html',
    styleUrls: ['./scrolltop.component.scss']
})
export class ScrolltopComponent implements OnInit {
    windowScrolled: boolean;
    constructor() {}

    @HostListener("window:scroll", [])
    onWindowScroll() {
        if (window.pageYOffset  >= 600) {
            this.windowScrolled = true;
        }
       else if (this.windowScrolled && window.pageYOffset <= 600) {
            this.windowScrolled = false;
      }
    }
    scrollToTop() {
        (function smoothscroll() {
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 8));
            }
        })();
    }
    ngOnInit() {}
}
