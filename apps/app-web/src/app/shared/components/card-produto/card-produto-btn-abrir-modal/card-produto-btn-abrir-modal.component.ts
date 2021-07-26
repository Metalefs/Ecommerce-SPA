import { Component, Input, OnInit } from '@angular/core';
import { PreviewProdutoComponent } from '../../dialogs/preview-produto/preview-produto.component';

@Component({
  selector: 'personalizados-lopes-card-produto-btn-abrir-modal',
  templateUrl: './card-produto-btn-abrir-modal.component.html',
  styleUrls: ['./card-produto-btn-abrir-modal.component.scss']
})
export class CardProdutoBtnAbrirModalComponent implements OnInit {

  @Input() AbrirPreviewProduto: () => void;

  constructor() {
  }

  ngOnInit(): void {
  }

}
