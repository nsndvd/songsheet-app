import { Utils } from "../utils";
import { Line } from "./line";

/**
 * Block class
 * @property {string} title - Title of block
 * @property {Object} lines - Array of Line objects
 * @property {number} annotation_cells - how many annotation cells are needed
 * @property {number} lyrics_width - maximum width of lyrics
 * @property {number} max_diff_annotations - maximum different annotations per repetition
 * @property {number} printed - how often a block is printed
 * */
export class Block{

    title: string;
    lines: Line[];
    annotation_cells: number = 0;
    lyrics_width = -1;
    max_diff_annotations = 0;
    printed = 0;

    /**
     * @constructor
     * @param {string} title - Title of this Block
     * @param Line[] lines - Array of Line objects
     * */
    constructor(title: string, lines: Line[]){
        this.title = title;
        this.lines = lines;
        this.annotation_cells = 0;
        this.lyrics_width = -1;
        this.max_diff_annotations = 0;
        this.printed = 0;

        for(let line of lines){
            line.parent = this;
            this.lyrics_width = Utils.max(this.lyrics_width, line.width);
            this.annotation_cells = Utils.max(this.annotation_cells, line.ann_cells);
            this.max_diff_annotations = Utils.max(this.max_diff_annotations, line.diff_annotations);
        }

        if(title==='str 1'){
            console.log(this);
        }
    }

    /**
     * returns current counter.
     * @returns {number} current counter
     * */
    get_printed_counter(): number{
        return this.printed;
    }

    /**
     * increase current counter
     */
    increase_printed_counter(): void{
        this.printed++;
    }

    /**
     * returns true if all different annotations are printed
     * @return {boolean} this.printed === this.max_diff_annotations
     * */
    all_diff_printed(): boolean{
        return this.printed === this.max_diff_annotations;
    }
}
