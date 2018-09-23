import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HtmlFactoryService } from '../../services/html-factory.service';

@Component({
  selector: 'app-songsheet-textarea',
  templateUrl: './songsheet-textarea.component.html',
  styleUrls: ['./songsheet-textarea.component.scss']
})
export class SongsheetTextareaComponent implements OnInit {

  inputGroup: FormGroup;
  htmlLines:string[] = [];

  constructor(private fb: FormBuilder, private htmlFactory: HtmlFactoryService) {
    this.inputGroup = this.fb.group({
      'inputControl': [null]
    });
  }

  ngOnInit() {
    this.inputGroup.get('inputControl').valueChanges.subscribe((v) => {
      this.update(v);
    });
    this.update('');
  }

  update(inputText:string){
    this.htmlLines = this.htmlFactory.highlightText(inputText);
  }

}
