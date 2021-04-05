import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'personalizados-lopes-close-btn',
  templateUrl: './close-btn.component.html',
  styleUrls: ['./close-btn.component.scss']
})
export class CloseBtnComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
  return(){
    history.back();
  }
}
