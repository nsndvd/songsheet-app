import { Component, OnInit } from '@angular/core';
import { ParserService } from '../../services/parser.service';
import { Song } from '../../models/song';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  constructor(private parser: ParserService) { }

  ngOnInit() {
  }

}
