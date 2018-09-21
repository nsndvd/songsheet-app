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
  highlightedText:string = '';
  linenumbers: number[] = [1];

  constructor(private fb: FormBuilder, private htmlFactory: HtmlFactoryService) {
    this.inputGroup = this.fb.group({
      'inputControl': [null]
    });
  }

  ngOnInit() {
    this.inputGroup.get('inputControl').valueChanges.subscribe((v) => {
      this.update(v);
    });
  }

  update(inputText:string){
    this.highlightedText = this.htmlFactory.highlightText(inputText);
    this.updateNewLines();
  }

  updateNewLines(){
    this.linenumbers = [1];
    const str = this.inputGroup.get('inputControl').value;
    const m = str.match(/\n/g);
    if(m){
      for(let match of m){
        this.linenumbers.push(this.linenumbers.length+1);
      }
    }
  }

}
