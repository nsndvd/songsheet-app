import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  icons = [
    "settings",
    "edit",
    "add_box",
    "delete"
  ]

  constructor() { }

  ngOnInit() {
  }

}
