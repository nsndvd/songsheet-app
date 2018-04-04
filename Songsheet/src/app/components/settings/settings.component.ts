import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { DATABASES } from '../../../ts/databases';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  path = '';

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  setDefaultPath(path){
    // TODO: use electron here
    //console.log(path);
    //this.dataService.upsert(DATABASES.settings, {id: 'defaultPath', value: path});
  }

}
