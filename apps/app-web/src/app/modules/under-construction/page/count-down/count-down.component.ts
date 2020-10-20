import { utf8Encode } from '@angular/compiler/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { faThinkPeaks } from '@fortawesome/free-brands-svg-icons';
import * as moment from 'moment';

@Component({
  selector: 'personalizados-lopes-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss']
})
export class CountDownComponent implements OnInit {

  constructor() { }

  @Input() LaunchDate:moment.Moment = moment("10/23/2020");
  DaysLeft:number;
  HoursLeft:number;
  MinutesLeft:number;
  SecondsLeft:number;

  NextMinute:Date = new Date();
  NextHour:Date = new Date();
  NextDay:Date = new Date();

  Minutes: number;
  Hours: number;
  Seconds: number;

  blinkMinutos:boolean = false;
  blinkHoras:boolean = false;
  blinkDias:boolean = false;

  tick(){
    let Now:moment.Moment = moment();

    this.DaysLeft    = Math.abs(this.LaunchDate.diff(Now, 'days'));

    this.HoursLeft   = moment(this.NextDay).diff(Now, 'hours');

    this.SecondsLeft = moment(this.NextMinute).diff(Now, 'seconds');

    Now.seconds(0);
    if(this.NextHour.getDay() > Now.day())
      this.NextHour.setHours(0)
    this.MinutesLeft = moment(this.NextHour).diff(Now, 'minutes');

    this.setHours(this.HoursLeft);
    this.setMinutes(this.MinutesLeft);
    this.setSeconds(this.SecondsLeft);
  }

  update(){
    if(new Date().getHours() < 23){
      this.NextDay.setDate(new Date().getDate()+1);
      this.NextDay.setHours(0);
      this.NextHour.setHours(new Date().getHours()+1);
      this.NextHour.setMinutes(0);
    }else{
      this.NextDay.setDate(new Date().getDate());
      this.NextHour.setMinutes(59);
    }

    this.NextMinute.setMinutes(new Date().getMinutes()+1);
    this.NextMinute.setSeconds(0);
  }

  setMinutes(n:number){
    this.Minutes = n;
    this.blinkMinutos = true;
    setInterval(()=>{
      this.blinkMinutos = false;
    },2000)
  }
  setHours(n:number){
    this.Hours = n;
    this.blinkHoras = true;
    setInterval(()=>{
      this.blinkHoras = false;
    },1000)
  }
  setSeconds(n:number){
    this.Seconds = n;
  }

  ngOnInit(): void {
    this.update();

    setInterval(()=>{

      this.tick();
      if(this.Seconds<=0)
        this.update();

    },100)
  }

}
