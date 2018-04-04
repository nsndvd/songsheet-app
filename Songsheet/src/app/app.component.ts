import { Component } from '@angular/core';

import { DATABASES } from '../ts/databases';
import { DataService } from './services/data/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private DataService: DataService, private router: Router){ }

  ngOnInit(){
    // load data from dir or force user to set defaultDir
    this.DataService.getByKey(DATABASES.settings, 'defaultPath').then(res => {
      if(!res){
        this.router.navigateByUrl('/settings')
      }
    });
  }
}