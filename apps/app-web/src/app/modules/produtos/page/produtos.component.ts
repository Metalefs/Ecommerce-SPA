import 'rxjs/add/operator/filter';
import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { cardFlip, fade, slideInOut } from '../../../animations';
import { ObterImagensCarousel } from '../../../helper/FileHelper';
import { MediaMatcher } from '@angular/cdk/layout';
import { ProdutoStateService } from '../produto-state.service';

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
    protected produtoStateService:ProdutoStateService) {

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
