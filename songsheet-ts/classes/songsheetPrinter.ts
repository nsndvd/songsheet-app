import { Song } from './song_structure/song';

/**
 * @name SongsheetPrinter 
 * @description
 * takes a Songobject and generates a HTML or PDF string from it.
 */
export class SongsheetPrinter {

    /**
     * getHTML
     * @param song Song
     * @returns string HTML string which represents the Song object
     */
    static getHTML(song: Song): string{
        // TODO
        return '';
    }

    /**
     * getHTML
     * @param song Song
     * @returns string HTML string which represents the Song object
     */
    static getPDF(song: Song): Blob{
        // TODO
        return null;
    }
}