import { Component, OnInit, Input } from '@angular/core';
import { Songgroup } from '../../../ts/songgroup';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input() event: Songgroup;

  constructor() { }

  ngOnInit() {
  }

}