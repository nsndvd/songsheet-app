import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Song } from '../../../ts/song';
import { DataService } from '../../services/data/data.service';
import { DATABASES } from '../../../ts/databases';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {

  @Input() song: Song;
  @Output() editID: EventEmitter<any> = new EventEmitter();

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  editMeta(id){
    this.editID.emit(id);
  }

  delete(id){
    this.dataService.delete(DATABASES.songs, id).then( res => console.log(res), err => console.log(err));
  }

}