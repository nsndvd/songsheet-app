import { Component } from '@angular/core';

import { DATABASES } from '../ts/databases';
import { DataService } from './services/data/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private DataService: DataService){ }

  ngOnInit(){
    //TODO: load data from dir or force user to set defaultDir
    this.DataService.getByKey(DATABASES.settings, 'defaultPath').then(res => console.log(res))
  }
}