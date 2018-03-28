import { Song } from './song';

export class Songgroup {
    id: string;
    name: string;
    description: string;
    link: string;
    date: Date;
    songs: Song[];
}