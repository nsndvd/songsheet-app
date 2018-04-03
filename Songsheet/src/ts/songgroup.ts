import { Song } from './song';
import * as moment from 'moment'

interface ISonggroup{
    id?: string;
    name: string;
    description?: string;
    date?: any;
    songs: Song[];
}

export class Songgroup {
    id?: string;
    name: string = '';
    description?: string = '';
    private date? = null;
    private songs: string[] = []; //uuids of songs

    constructor(params?: string | any){
        if(typeof params === 'string'){
            this.name = name;
        }else if(typeof params !== 'undefined'){
            this.id = params.id;
            this.name = params.name;
            this.description = params.description;
            this.date = params.date;
            this.songs = params.songs;
        }
    }

    link(): string{
        return '';
    }

    getDate(){
        if(this.date){
            return this.date.locale('de').format('L');
        }
        return '';
    }

    setDate(date: string){
        let val;
        if (/\./g.test(date)) {
            val = moment(date, 'DD.MM.YYYY');
        } else {
            val = moment(date);
        }
        this.date = !val.isValid() ? null : val;
    }

    getSongs(){
        return this.songs;
    }

    setSongs(arr){
        this.songs = arr.filter(Boolean).filter(String);
    }
}