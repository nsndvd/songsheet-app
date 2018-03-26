import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {

  @Input() song: Song;

  constructor() { }

  ngOnInit() {
  }

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
  last_modified: DateTimeFormat;
  created: DateTimeFormat;
}