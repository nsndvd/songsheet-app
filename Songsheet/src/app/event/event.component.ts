import { Component, OnInit, Input } from '@angular/core';

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

class Songgroup {
  id: string;
  name: string;
  description: string;
  link: string;
  date: Date;
  songs: Song[];
}

class Song {
  id: string;
  name: string;
  artist: string;
  bpm: number;
  books: string[];
  path: string;
  link: string;
  preview: string;
  obj: any;
  last_modified: Date;
  created: Date;
}