import { Component, OnInit } from '@angular/core';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Select, Store } from '@ngxs/store';
import { InformacoesContato } from 'libs/data/src/lib/classes';
import { Observable } from 'rxjs';
import { InformacoesContatoState } from '../../../data/store/state';

@Component({
  selector: 'personalizados-lopes-social-network-links',
  templateUrl: './social-network-links.component.html',
  styleUrls: ['./social-network-links.component.scss']
})
export class SocialNetworkLinksComponent implements OnInit {
  @Select(InformacoesContatoState.ObterInformacoesContato) InformacoesContato$: Observable<InformacoesContato>;

  @Select(InformacoesContatoState.IsInformacoesContatoLoaded) IsInformacoesContatoLoaded$;
  FIcon = faFacebook;
  InstaIcon = faInstagram;
  InboxIcon = faShoppingCart;


  constructor(private store: Store) { }

  ngOnInit(): void {
  }

}
