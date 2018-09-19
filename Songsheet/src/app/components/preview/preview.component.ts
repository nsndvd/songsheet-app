import { Component, OnInit } from '@angular/core';
import { ParserService } from '../../services/parser.service';
import { Song } from '../../models/song';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  testString = `[title: Gods not done with you; artist: Tauren Wells; bpm: 65; books: test, fj4 - 94]

  [order: Intro, Str 1, Refrain, Str 2, Refrain 2, Bridge, Refrain, Outro]
  
  [block: Intro]
  [F#] [G#] [Fm][F#]        <r>2x<r> | ;Filip + Finia, Ruben Becken
  
  [block: Str 1]
  [F#]Stan<r>di***ng <g>in *your** [<r>G#<r>]<g>ruins feels<b> a [Fm]lot<b> like the [F#]end | Jannes + Nils
  [F#]So used to [G#]losing, you're [Fm]afraid to try [A#m]again
  [F#]  Right now all you [G#]see are ashes
  [Fm]Where there was a [F#]flame
  [F#]The truth is that you're [G#]not forgotten
  [Fm]'Cause Grace knows your [F#]name
  
  [block: Refrain]
  [A#m]God's not done with [F#]you | Rhythmisch!
  Even with your [C#]broken heart and your [Fm]wounds and your scars
  [A#m]God's not done with [F#]you
  Even when you're [C#]lost and it's hard and you're [Fm]falling apart
  [A#m]God's not done with [F#]you
  It's not [C#]over, it's only [Fm]begun
  So don't [F#]hide, don't [G#]run
  'Cause [Fm]God's not [F#]done with | ; Wiederholen ->
  [C#]You-ou-ou-[G#]ou-ou
  [Fm]You-ou-ou-ou-[A#m]ou
  
  [block: Str 2]
  [F#]There's​ a light you don't [G#]notice
  Until you're [Fm]standing in the [F#]dark
  [F#]And there's a strength that's [G#]growing
  In[Fm]side your shattered [F#]heart
  Woah-o-o-o-o-oah
  
  [block: Refrain 2]
  [A#m]God's not done with [F#]you | Rhythmisch!
  Even with your [C#]broken heart and your [Fm]wounds and your scars
  [A#m]God's not done with [F#]you
  Even when you're [C#]lost and it's hard and you're [Fm]falling apart
  [A#m]God's not done with [F#]you
  It's not [C#]over, it's only [Fm]begun
  So don't [F#]hide, don't [G#]run
  'Cause [Fm]God's not [F#]done with
  [C#]You-ou-ou-ou-[G#]ou
  [Fm]You-ou-ou-ou-[A#m]ou
  He's not done with
  [F#]You-ou-ou-ou-[G#]ou
  [A#m]You-ou-ou-ou-[C#]ou
  
  [Block: Bridge]
  He's got a [D#m]plan, this is [A#m]part of it | FETTT
  He's gonna [Fm]finish what He [G#]started
  He's got a [D#m]plan, this is part of [A#m]it
  He's gonna [Fm]finish what He [G#]started
  [F#]He's not done  [G#]
  [Fm]God's not [A#m]done writing your story [F#] <r>[G#]*ruhiger*<r> 
  No, [A#m]He's not done
  [C#]God's not done with-
  
  [block: Outro]
  [F#]You, you[G#] | Ruben rhythmisch bleiben
  No, [A#m]He's not done
  [C#]God's not done with you`;
  song:string;

  constructor(private parser: ParserService) { }

  ngOnInit() {
    const obj:Song = this.parser.str2Obj(this.testString);
    console.log(obj);
    this.parser.obj2PDF(obj);
  }

}
