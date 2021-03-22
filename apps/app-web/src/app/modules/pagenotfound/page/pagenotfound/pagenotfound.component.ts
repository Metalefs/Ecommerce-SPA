import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Select } from '@ngxs/store';
import { WindowRef } from 'apps/app-web/src/app/data/service/window.service';
import { ProdutoState } from 'apps/app-web/src/app/data/store/state';
import { Produto } from 'libs/data/src/lib/classes';
import { Observable } from 'rxjs';

@Component({
  selector: 'personalizados-lopes-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.scss']
})
export class PagenotfoundComponent implements OnInit {
  @Select(ProdutoState.ObterListaProdutos) Produtos$: Observable<Produto[]>;
  constructor(private windowRef: WindowRef, @Inject(PLATFORM_ID) private platformId: any) { }

  ngOnInit(): void {
  }

  back(){
    if(isPlatformBrowser(this.platformId)) {
      // Use the window reference: this.windowRef
      this.windowRef.nativeWindow.location.pathname
    }
  }

}
