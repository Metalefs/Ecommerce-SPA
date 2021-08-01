import 'rxjs/add/operator/filter';
import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { cardFlip, fade, slideInOut } from '../../../animations';
import { ObterImagensCarousel } from '../../../helper/FileHelper';
import { MediaMatcher } from '@angular/cdk/layout';
import { ProdutoStateService } from '../produto-state.service';
import { Produto } from 'libs/data/src/lib/classes';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProdutoState } from '../../../data/store/state';

@Component({
  selector: 'personalizados-lopes-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
  animations: [cardFlip, fade, slideInOut]
})
export class ProdutosComponent implements OnInit {

  imagens: [{ path: string }] = [{ path: ObterImagensCarousel()[0] }];

  state = "flipped"

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private produtoStateService:ProdutoStateService,
    media: MediaMatcher,
    private cdr: ChangeDetectorRef) {

      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => cdr.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

  ngOnInit(): void {
    this.produtoStateService.HandleFilterState();
    this.produtoStateService.Atualizar();

    setTimeout(() => {
      this.flip()
    }, 0)

  }

  ngOnDestroy() {
    this.flip();
  }

  flip() {
    if (this.state === "default") {
      this.state = "flipped";
    } else {
      this.state = "default";
    }
  }

}
