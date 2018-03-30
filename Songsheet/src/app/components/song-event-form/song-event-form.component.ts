import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

import { Song } from '../../../ts/song';
import { DATABASES, BROWSERTYPES } from '../../../ts/databases';
import { Songgroup } from '../../../ts/songgroup';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-song-event-form',
  templateUrl: './song-event-form.component.html',
  styleUrls: ['./song-event-form.component.scss']
})
export class SongEventFormComponent implements OnInit {

  @Input() type: string;
  @Input() display: boolean;
  @Input() id: string; 

  songscounter: number[] = [1];  
  songs: Song[] = [];
  
  song: Song = new Song();
  songBooksStr: string = '';

  event: Songgroup = new Songgroup();
  eventDate: string = '';
  eventSongBuffer: string[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    setInterval(() => {
      this.dataService.getAll(DATABASES.songs).then( songs => {
        this.songs = songs;
      })
    }, 1000);

    // init song/event if editMeta is called
    if(this.id !== null){
      switch(this.type){
        case 'songs':
          this.dataService.getByKey(DATABASES.songs, this.id).then( song => {
            this.song = new Song(song);
            this.songBooksStr = this.song.books.join('; ');
          });
          break;

        case 'events':
        this.dataService.getByKey(DATABASES.events, this.id).then( event => {
          this.event = new Songgroup(event);
          this.eventDate = this.event.getDate();
          this.eventSongBuffer = ['']; // TODO
        });
        break;
      }
    }

    // init eventSongBuffer
  }

  toggleAddForm(){
    this.display = !this.display;
    this.eventDate = this.event.getDate();

    //reset event
    this.event = new Songgroup();
    this.eventDate = '';

    //reset song
    this.song = new Song();
    this.songBooksStr = '';
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
    this.song.books = this.songBooksStr.split(';');
    // remove last book if input terminates with ';'
    if (this.song.books[this.song.books.length - 1] === ''){
      this.song.books.pop();
    }

    this.dataService.upsert(DATABASES.songs, this.song);
    this.toggleAddForm();    
  }

  submitEvent(e){
    e.preventDefault();
    this.event.setDate(this.eventDate);
    this.dataService.upsert(DATABASES.events, this.event);
    this.toggleAddForm();    
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

}
