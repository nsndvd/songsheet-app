export class Song {
  id?: string;
  title: string = '';
  artist?: string;
  bpm?: number;
  books?: string[];
  blocks?: any;
  order?: string[];
  annotationCells: number = 0;
  maxLineWidth: number = 0;
  preview?: string;

  static isDefinedNonNullSong(val: any): val is Song {
    if(val) {
      let is: boolean = true;
      is = is && (val.id? typeof val.id === 'string': !val.id);
      is = is && typeof val.title === 'string';
      is = is && (val.artist? typeof val.artist === 'string': !val.artist);
      is = is && (val.bpm? typeof val.bpm === 'number': !val.bpm);
      is = is && (val.books? val.id instanceof Array: !val.books);
      is = is && (val.order? val.id instanceof Array: !val.order);
      is = is && (val.annotationCells? typeof val.annotationCells === 'number': !val.annotationCells);
      return is && (val.maxLineWidth? typeof val.maxLineWidth === 'number': !val.maxLineWidth);
    } else return false;
  }

  static from(val: any): Song {
    if(Song.isDefinedNonNullSong(val)) {
      const song: Song = new Song();
      song.id = (val as Song).id;
      song.title = (val as Song).title;
      song.artist = (val as Song).artist;
      song.bpm = (val as Song).bpm;
      song.books = (val as Song).books;
      song.blocks = (val as Song).blocks;
      song.order = (val as Song).order;
      song.annotationCells = (val as Song).annotationCells;
      song.maxLineWidth = (val as Song).maxLineWidth;
      return song;
    }
    else return null;
  }

  constructor(song?: string | any){
    if(typeof song === 'string'){
      this.title = song;
    }else if(song){
      this.id = song.id ? song.id : undefined;
      this.title = song.title ? song.title : '';
      this.artist = song.artist ? song.artist : undefined;
      this.bpm = song.bpm ? song.bpm : undefined;
      this.books = song.books ? song.books : undefined;
      this.blocks = song.blocks ? song.blocks : undefined;
      this.order = song.order ? song.order : undefined;
      this.annotationCells = song.annotationCells ? song.annotationCells : 0;
      this.maxLineWidth = song.maxLineWidth ? song.maxLineWidth : 0;
      this.preview = song.preview ? song.preview : undefined;
    }
  }
}
