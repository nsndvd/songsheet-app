import { SongsheetParser } from '../songsheetParser';
import { Utils } from '../utils';
import { Block } from './block';
import { SimplestLayout } from '../layout/simplestLayout';
import { Layout } from '../layout/layout';

/**
 * Song object describing a whole song
 * @property {string} title - title of this song
 * @property {string} artist - artist of this song
 * @property {string} bpm - bpm of this song
 * @property {string[]} books - books where this song can be found
 * @property {string[]} order - array of titles in the order how they should be printed
 * @property {number} layout - layout id (SimplestLayout = 0)
 * @property {Block[]} blocks - array of blocks identified by there titles
 * @property {number} ann_cells - max annotation cells in whole song
 * @property {number} lyrics_width - max width of lyrics
 * */
export class Song{

    title: string = 'Song';
    artist: string = '';
    bpm: number;
    books: string[] = [];
    order: string[] = [];

    lyrics_width: number = -1;
    ann_cells: number = 0;
    blocks: object = {};
    layout: Layout = null;

    /**
     * @constructor
     * @param {string} string - whole song for parsing to a Songobject
     * @param {Object} layout_settings - see Layout constructor
     * */
    constructor(string: string, layout_settings: object){
        let res = SongsheetParser.parse(string);
        this.title = res[0];
        this.artist = res[1];
        this.bpm = Number(res[2]);
        this.books = res[3];
        this.set_blocks(res[5]);
        this.order = res[4];

        this.layout = new SimplestLayout(layout_settings);
    }

    /**
     * set blocks, ann_cells and lyrics_width
     * @param {Block[]} blocks - array of blocks
     * */
    set_blocks(blocks: Block[]): void{
        let width = -1;
        for(let block of blocks){
            this.blocks[block.title] = block;
            width = Utils.max(width, block.lyrics_width);
            this.ann_cells = Utils.max(this.ann_cells, block.annotation_cells);
        }
        this.lyrics_width = width;
    }

    /**
     * set font
     * @param {string} font - string which identifies a font
     * */
    set_font(font): void{
        this.layout.set_font(font);
    }

    /**
     * set line height
     * @param {number} height - set line height
     * */
    set_line_height(height): void{
        this.layout.set_line_height(height);
    }

    /**
     * gets order of blocks for this song
     * @return {string[]} return all blocks identified by their title
     * */
    get_order(): string[]{
        return this.order;
    }
}
