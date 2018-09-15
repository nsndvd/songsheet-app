import { SongsheetPrinter } from './songsheetPrinter';
import { Song } from './song_structure/song';
import { FONTS } from './constants';

export class SongsheetGen {

    songs: object = {};

    /**
     * @constructor
     * */
    constructor(){ }

    /**
     * generates pdfMake objects for all Songs
     * @returns string[] HTMLs as strings for each song added to this generator. Empty array if no song is given.
     * */
    getHTML(): string[] {
        let res: string[] = [];

        //iterate over songs
        for(let song in this.songs){

            // if song exists generate HTML
            if(this.songs.hasOwnProperty(song)) {
              res[res.length] = SongsheetPrinter.getHTML(this.songs[song]);
            }
        }
        return res;
    }

    /**
     * generates PDF from HTML
     * @returns PDF file
     */
    getPDF(): Blob{
        // TODO
        return null;
    }

    /**
     * add a song to the generation queue. can also be used to update a song if the title wasnt changed.
     * @param {string} string - .st file as string
     * @param {Object} settings - layout settings (see Layout)
     * */
    add_song(string: string, settings: object): void{
        //TODO for multiple layouts change null
        let song = new Song(string, settings);
        this.songs[song.title] = song;
    };

    /**
     * remove a song from the queue
     * @param {string} song_title - song title which identifies the song
     * */
    remove_song(song_title: string): void{
        delete this.songs[song_title];
    }

    /**
     * get a Song object for song title
     * @param {string} song_title - song title which identifies the song
     * @returns {Song} song object
     * */
    get_song(song_title: string): Song{
        return this.songs[song_title]
    };

    /**
     * get all available fonts
     * @returns {Object} all fonts as a dictionary with { font_id: { bold: ".tff", ... } }
     * */
    get_available_fonts(): object{
        return FONTS;
    }

    /**
     * get current font for a song by song title
     * @param {string} song_title - song title which identifies the song
     * @returns {string} font id
     * */
    get_font_for_song(song_title: string): string{
        return this.songs[song_title].layout.font;
    }

    /**
     * get all loaded songs
     * @returns {Song[]} get all songs in the queue
     * */
    get_songs(): object{
        return this.songs;
    }
}