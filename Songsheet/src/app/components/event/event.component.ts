import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Songgroup } from '../../../ts/songgroup';
import { DataService } from '../../services/data.service';
import { DATABASES } from '../../../ts/databases';
import * as q from 'q';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input() event: Songgroup;
  @Output() editMeta: EventEmitter<any> = new EventEmitter();
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  JSON = JSON;

  constructor(private dataService: DataService) { }

  songs: string[] = [];

  ngOnInit() { 
    if(!this.event.getSongs){
      this.event = new Songgroup(this.event);
    }
    this.setSongs();
  }

  emitEditMeta(songgroup){
    this.editMeta.emit(songgroup);
  }

  delete(id){
    this.dataService.delete(DATABASES.events, id);
    this.deleted.emit();
  }

  setSongs(){
    this.event.getSongs().forEach( uuid => {
      this.dataService.getByKey(DATABASES.songs, uuid).then(res => {
        if(res)
          this.songs.push(res.name);
      });
    });
  }
}