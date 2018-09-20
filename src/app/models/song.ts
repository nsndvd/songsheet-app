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