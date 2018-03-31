import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  @Input() 
  set display([type, id]){
    this.initValues();
    this.type = <DATABASES> type;
    this.id = String(id);
  };
  @Output() displayOut: EventEmitter<any> = new EventEmitter();

  displayBool: boolean = true;
  type: DATABASES;
  id: string;
  songscounter: number[] = [1];  
  songs: Song[] = [];
  
  song: Song = new Song();
  songBooksStr: string = '';

  event: Songgroup = new Songgroup();
  eventDate: string = '';
  eventSongBuffer: string[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.initValues();
   }

  closeAddForm(){
    this.displayBool = false;
    this.eventDate = this.event.getDate();

    this.displayOut.emit({
      display: this.displayBool, 
      type: this.type, 
      id: this.id
    });
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
    this.closeAddForm();    
  }

  submitEvent(e){
    e.preventDefault();
    this.event.setDate(this.eventDate);
    this.dataService.upsert(DATABASES.events, this.event);
    this.closeAddForm();    
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

  initValues(){
    this.dataService.getAll(DATABASES.songs).then( songs => {
      this.songs = songs;
    })

    // init song/event if editMeta is called
    console.log(this.id);
    if(this.id){
      this.dataService.getByKey(this.type, this.id).then( elem => {
        switch(this.type){
          case DATABASES.songs:
            this.song = new Song(elem);
            this.songBooksStr = this.song.books ? this.song.books.join('; ') : '';
            break;
            
          case DATABASES.events:
            this.event = new Songgroup(event);
            this.eventDate = this.event.getDate();
            this.eventSongBuffer = ['']; // TODO
            break;
          }
      });
    }
  }

}
