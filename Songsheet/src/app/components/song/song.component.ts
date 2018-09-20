import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Song } from '../../../ts/song';
import { DataService } from '../../services/data.service';
import { DATABASES } from '../../../ts/databases';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {

  @Input() song: Song;
  @Output() editMeta: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  emitEditMeta(song){
    this.editMeta.emit(song);
  }

  del(id){
    this.dataService.delete(DATABASES.songs, id);
    this.delete.emit();
  }

}