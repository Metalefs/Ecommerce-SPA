import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemCarousel } from 'libs/data/src/lib/classes';
import { BackgroundPositions, backgroundSizes, backgroundRepeats} from '../../../../../../data/models/css-background-properties';
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
  BackgroundPositions = BackgroundPositions;
  backgroundSizes = backgroundSizes;
  backgroundRepeats = backgroundRepeats;
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
