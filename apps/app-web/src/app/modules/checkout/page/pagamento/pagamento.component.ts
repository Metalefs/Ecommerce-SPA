import { Component, Input, OnInit } from '@angular/core';
import { cardFlip } from 'apps/app-web/src/app/animations';
import { CheckoutService } from '../../checkout.service';

@Component({
  selector: 'personalizados-lopes-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss'],
  animations: [cardFlip]
})
export class PagamentoComponent implements OnInit {
  state = 'flipped';
  @Input() _init_point:string;
  constructor(public checkoutService: CheckoutService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.flip()
    }, 0);
  }
  ngOnDestroy() {
    this.flip()
  }

  flip() {
    if (this.state === "default") {
      this.state = "flipped";
    } else {
      this.state = "default";
    }
  }
}
