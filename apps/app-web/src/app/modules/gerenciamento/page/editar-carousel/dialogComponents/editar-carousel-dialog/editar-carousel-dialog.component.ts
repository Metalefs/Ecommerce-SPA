import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { entities } from '@personalizados-lopes/data';
import { BackgroundPositions, backgroundSizes, backgroundRepeats} from '../../../../../../data/models/css-background-properties';
@Component({
  selector: 'personalizados-lopes-editar-carousel-dialog',
  templateUrl: './editar-carousel-dialog.component.html',
  styleUrls: ['./editar-carousel-dialog.component.scss']
})
export class EditarCarouselDialogComponent implements OnInit {

  Carousel:entities.Carousel;
  BackgroundPositions = BackgroundPositions;
  backgroundSizes = backgroundSizes;
  backgroundRepeats = backgroundRepeats;
  constructor(public dialogRef: MatDialogRef<EditarCarouselDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  entities.Carousel) {
      this.Carousel = data;
    }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
