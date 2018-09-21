import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-songsheet-textarea',
  templateUrl: './songsheet-textarea.component.html',
  styleUrls: ['./songsheet-textarea.component.scss']
})
export class SongsheetTextareaComponent implements OnInit {

  inputGroup: FormGroup;
  highlightedText:string = '';
  linenumbers: number[] = [1];

  constructor(private fb: FormBuilder, private renderer: Renderer2, private el: ElementRef) {
    this.inputGroup = fb.group({
      'inputControl': [null]
    });
  }

  ngOnInit() {
    this.inputGroup.get('inputControl').valueChanges.subscribe((v) => {
      console.log(v);
      this.update();
    });
  }

  update(){
    this.renderer.setStyle(this.el.nativeElement, 'height', this.el.nativeElement.scrollHeight);
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
