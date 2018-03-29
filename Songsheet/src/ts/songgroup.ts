import { Song } from './song';

export class Songgroup {
    id?: string;
    name: string;
    description?: string;
    date?: Date;
    songs: Song[];

    link(): string{
        return '';
    }
}