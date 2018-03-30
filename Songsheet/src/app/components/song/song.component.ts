import { Component, OnInit, Input } from '@angular/core';

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
  editID: string = null;
  displayAddForm: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }


  editMeta(id){
    this.editID = id;
    this.toggleAddForm();
  }

  delete(id){
    this.dataService.delete(DATABASES.songs, id).then( res => console.log(res), err => console.log(err));
  }

  toggleAddForm(){
    this.displayAddForm = !this.displayAddForm;
  }

}