import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { Song } from '../../../ts/song';
import { DATABASES, BROWSERTYPES } from '../../../ts/databases';
import { Songgroup } from '../../../ts/songgroup';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent implements OnInit {

  type: string;
  headline: string;
  search_text: string;
  displayAddForm: boolean = false;
  editID = null;
  
  song_view: object = {
    headline: 'Your Songs',
    search_text: 'Search a song'
  }
  event_view: object = {
    headline: 'Your Events',
    search_text: 'Search an event'
  }
  songs: Song[] = [];
  events: Songgroup[] = [];

  constructor(private route: ActivatedRoute, private dataService: DataService) { }
  
  ngOnInit() {
    setInterval(() => {
      this.dataService.getAll(DATABASES.songs).then( songs => {
        this.songs = songs;
      })
    }, 300)
    setInterval(() => {
      this.dataService.getAll(DATABASES.events).then( events => {
        this.events = events;
      })
    }, 300)

    this.route.params.subscribe(params => {
      this.type = params['type'];
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

  toggleAddForm(){
    this.displayAddForm = !this.displayAddForm;
  }
  
}
