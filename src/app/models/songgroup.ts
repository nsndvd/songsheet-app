
export class Songgroup {
  public id?: string;
  public name: string = '';
  public description?: string = '';
  public date? = null;
  public songs: string[] = []; //uuids of songs

  constructor(params?: string | any){
    if(typeof params === 'string'){
      this.name = name;
    }else if(params){
      this.id = params.id;
      this.name = params.name;
      this.description = params.description;
      this.date = params.date;
      this.songs = params.songs;
    }
  }
}