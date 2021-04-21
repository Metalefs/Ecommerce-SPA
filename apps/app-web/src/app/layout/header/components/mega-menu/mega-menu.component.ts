import { Component, Input, OnInit } from '@angular/core';
import { NavLink } from 'apps/app-web/src/app/data/models/navlinks';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'personalizados-lopes-mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss']
})
export class MegaMenuComponent implements OnInit {

  @Input() Categorias: NavLink;
  items: MegaMenuItem[];

  ngOnInit() {

    this.items = this.items = [
      {
        label: 'Últimos produtos', icon: 'fa fa-fw fa-check',
        items: [
          [
            {
              label: 'TV 1',
              items: [
                { label: 'TV 1.1' },
                { label: 'TV 1.2' }
              ]
            },
          ],
          [
            {
              label: 'TV 3',
              items: [{ label: 'TV 3.1' }, { label: 'TV 3.2' }]
            },
          ]
        ]
      },
      {
        label: 'Para festas', icon: 'fa fa-fw fa-soccer-ball-o',
        items: [
          [
            {
              label: 'Sports 1',
              items: [
                { label: 'Sports 1.1' },
                { label: 'Sports 1.2' }
              ]
            },
          ],
          [
            {
              label: 'Sports 3',
              items: [
                { label: 'Sports 3.1' },
                { label: 'Sports 3.2' }
              ]
            },
          ],
          [
            {
              label: 'Sports 5',
              items: [
                { label: 'Sports 5.1' },
                { label: 'Sports 5.2' }
              ]
            },
          ]
        ]
      },
      {
        label: 'Para empresas', icon: 'fa fa-fw fa-child',
        items: [
          [
            {
              label: 'Entertainment 1',
              items: [
                { label: 'Entertainment 1.1' },
                { label: 'Entertainment 1.2' }
              ]
            },
          ],
          [
            {
              label: 'Entertainment 3',
              items: [
                { label: 'Entertainment 3.1' },
                { label: 'Entertainment 3.2' }
              ]
            },
          ]
        ]
      },
      {
        label: 'Acessórios', icon: 'fa fa-fw fa-gears',
        items: [
          [
            {
              label: 'Technology 1',
              items: [
                { label: 'Technology 1.1' },
                { label: 'Technology 1.2' }
              ]
            },
          ],
          [
            {
              label: 'Technology 4',
              items: [
                { label: 'Technology 4.1' },
                { label: 'Technology 4.2' }
              ]
            }
          ]
        ]
      }
    ];
  }

}
