import { Component, OnInit, Input } from '@angular/core';

import { Song } from '../../../ts/song';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss', '../global_styles.scss']
})
export class SongComponent implements OnInit {

  @Input() song: Song;

  constructor() { }

  ngOnInit() {
  }

}