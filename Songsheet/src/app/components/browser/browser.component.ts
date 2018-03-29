import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Song } from '../../../ts/song';
import { DATABASES, BROWSERTYPES } from '../../../ts/databases';
import { Songgroup } from '../../../ts/songgroup';

let moment = require('moment');

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

  songscounter: number[] = [1];

  constructor(private route: ActivatedRoute) { }
  
  ngOnInit() {
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

  changeDateFormat(that){
    let val;
    switch(that.type){
      case 'date':
        val = moment(that.value);
        that.type = 'text';
        that.value = !val.isValid() ? '' : val.locale('de').format('L');
        break;
      case 'text':
        val = moment(that.value, 'DD.MM.YYYY');
        that.type = 'date';
        that.value = !val.isValid() ? '' : val.format('YYYY-MM-DD');
        break;
    }
  }

  submitSong(e){
    e.preventDefault();
  }

  submitEvent(e){
    e.preventDefault();
  }

  addSongField(e){
    e.preventDefault();
    this.songscounter.push(this.songscounter.length + 1);
  }

  removeSongField(e){
    e.preventDefault();
    if(this.songscounter.length > 1){
      this.songscounter.pop();
    }
  }

  addEntry(type: BROWSERTYPES, obj: [Song, Songgroup]){

  }

}
