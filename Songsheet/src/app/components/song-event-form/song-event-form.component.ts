import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
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
    if(id){
      this.id = String(id);
    }
  };
  @Output() displayOut: EventEmitter<any> = new EventEmitter();
  @ViewChild('form_event', {read: ElementRef}) form: ElementRef;

  displayBool: boolean = true;
  type: DATABASES;
  id: string;
  songscounter: number[] = [1];  
  songs: Song[] = [];
  
  song: Song = new Song();
  songBooksStr: string = '';

  songgroup: Songgroup = new Songgroup();
  songgroupDate: string = '';
  songgroupSongBuffer: string[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.initValues();
   }

  ngAfterViewChecked(){
    this.updateSelectSongs();
  }

  setSong(model){
    let song = Number(model.name[model.name.length-1]) - 1;
    let songUUID = model.value;
    this.songgroupSongBuffer[song] = songUUID;
    this.updateSelectSongs();
  }

  updateSelectSongs(){
    if(this.form){
      this.songgroupSongBuffer.forEach( (uuid, i) => {
        let dom = this.form.nativeElement.querySelector('#song'+(i+1)+' [value="'+uuid+'"]') as HTMLSelectElement;
        if(dom) {
          dom.selected = true;
        }
      });
    }
  }

  closeAddForm(){
    this.displayBool = false;
    this.songgroupDate = this.songgroup.getDate();

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
    this.songgroup.setDate(this.songgroupDate);
    //remove empty songs from buffer
    this.songgroup.setSongs(this.songgroupSongBuffer);

    this.dataService.upsert(DATABASES.events, this.songgroup);
    this.closeAddForm();
  }

  addSongField(e){
    e.preventDefault();
    this.songgroupSongBuffer.push('');
  }

  removeSongField(e){
    e.preventDefault();
    if(this.songgroupSongBuffer.length > 1){
      this.songgroupSongBuffer.pop();
    }
  }

  initValues(){
    this.dataService.getAll(DATABASES.songs).then( songs => {
      this.songs = songs;
    })

    // init song/event if editMeta is called
    if(this.id){
      this.dataService.getByKey(this.type, this.id).then( elem => {
        switch(this.type){
          case DATABASES.songs:
            this.song = new Song(elem);
            this.songBooksStr = this.song.books ? this.song.books.join('; ') : '';
            break;
            
          case DATABASES.events:
            this.songgroup = new Songgroup(elem);
            this.songgroupDate = this.songgroup.getDate();
            this.songgroupSongBuffer = this.songgroup.getSongs().concat(['']);
            break;
          }
      });
    } else {
      this.songgroupSongBuffer = [''];
    }

  }

}
