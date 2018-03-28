import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Song } from '../../../ts/song';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss', '../global_styles.scss']
})
export class BrowserComponent implements OnInit {

  private type: string;
  headline: string;
  search_text: string;
  
  song_view: object = {
    headline: 'Your Songs',
    search_text: 'Search a song'
  }
  event_view: object = {
    headline: 'Your Events',
    search_text: 'Search an event'
  }
  songs: Song[] = [
    {
      id: '1234',
      name: 'God of Wonders',
      artist: 'Künstler',
      bpm: 100,
      books: [],
      path: '',
      link: '',
      preview: 'haaaalooooo',
      obj: {},
      last_modified: new Date(),
      created: new Date()
    }
  ];
  events: Event[] = [];

  constructor(private route: ActivatedRoute) {
  }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.type = params['type'];
      console.log(this.type);
      switch(this.type){
        default:
        case 'songs':
          Object.assign(this, this.song_view);
          break;
        case 'events':
          Object.assign(this, this.event_view);
          break;
      }
    });
  }

}
