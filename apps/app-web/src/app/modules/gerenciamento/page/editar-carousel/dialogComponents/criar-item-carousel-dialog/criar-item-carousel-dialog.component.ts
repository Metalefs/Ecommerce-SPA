import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemCarousel } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-criar-item-carousel',
  templateUrl: './criar-item-carousel-dialog.component.html',
  styleUrls: ['./criar-item-carousel-dialog.component.scss']
})
export class CriarItemCarouselDialogComponent implements OnInit {
  ItemCarousel = new ItemCarousel(
    "",
    "",
    "",
    "",
    "",
    "",
  )
  backgroundSizes:Select[] = [
    {"Nome":"Cobrir","value":"cover"},
    {"Nome":"Conter","value":"contain"},
  ]
  BackgroundPositions:Select[] = [
    {"Nome":"Topo","value":"top"},
    {"Nome":"Inferior","value":"bottom"},
    {"Nome":"Center","value":"center"},
    {"Nome":"Esquerda","value":"left"},
    {"Nome":"Direita","value":"right"},
  ]
  constructor(public dialogRef: MatDialogRef<CriarItemCarouselDialogComponent>) { }

  ngOnInit(): void {
  }

  upload($event){
    this.ItemCarousel.url = $event.target.files[0];
    console.log(this.ItemCarousel.url);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
interface Select {
  Nome:string;
  value:string;
}
