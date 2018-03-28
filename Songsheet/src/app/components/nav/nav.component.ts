import { Component, OnInit } from '@angular/core';

import { MenuItem } from '../../../ts/menuitem';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

  menu: MenuItem[] = [
    {
      route: 'browser/songs',
      label: 'Songs',
    },
    {
      route: 'browser/events',
      label: 'Events',
    },
    {
      route: 'editor',
      label: 'Editor'
    },
    {
      route: 'settings',
      label: 'Settings'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}