import { Component } from '@angular/core';

import { DATABASES } from './models/databases';
import { DataService } from './services/data.service';
import { Router } from '@angular/router';
import { MenuItem } from './models/menuitem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  menu: MenuItem[] = [
    {
      route: 'browser/songs',
      label: 'So',
    },
    {
      route: 'browser/events',
      label: 'Ev',
    },
    {
      route: 'editor',
      label: 'Ed'
    },
    {
      route: 'settings',
      label: 'Se'
    }
  ]

  constructor(private DataService: DataService, private router: Router){ }

  ngOnInit(){
    // load data from dir or force user to set defaultDir
    this.DataService.getByKey(DATABASES.settings, 'defaultPath').then(res => {
      if(!res){
        //this.router.navigateByUrl('/settings')
      }
    });
  }
}