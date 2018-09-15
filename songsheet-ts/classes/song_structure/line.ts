import { Block } from "./block";
import { MARKUP_REP_REG } from "../constants";
import { Utils } from "../utils";

/**
 * Line object
 * @property {string[]} lyrics - [top_line, bottom_line] with lyrics and chords
 * @property {string[]} annotations - array of all annotaions
 * @property {number} width - maximum width of lyrics
 * @property {number} diff_annotations - different annotations per repetition
 * @property {number} ann_cells - how many annotation cells are defined
 * @property {boolean} has_annotations - whether this line has annotations
 * @property {Block} parent - block where this line is in
 * */
export class Line{

    lyrics: string[];
    annotations: string[];
    width: number;
    diff_annotations: number;
    ann_cells: number;
    has_annotations: boolean;
    parent: Block;

    /**
     * @constructor
     * @param {string} line - string to parse as a line
     * */
    constructor(line: string){
        let res = Line.parse_line(line);
        this.lyrics = res[0];
        this.annotations = res[1];
        this.width = res[2];
        this.diff_annotations = res[3];
        this.ann_cells = this.annotations.length;
        this.has_annotations = this.ann_cells > 0;
        this.parent = null;
    }

    /**
     * @static
     * parses the line string to Line object
     * @param {string} line - string to parse
     * @returns ParsedLine ParsedLine
     * */
    static parse_line(line: string): ParsedLine{
        let top_line = '';
        let bottom_line_markup = line.split('|')[0].replace(/(^\s+|\s+$)/g, '');
        let bottom_line = bottom_line_markup.replace(MARKUP_REP_REG, '');
        bottom_line_markup = bottom_line_markup.replace(/\[.*?\]/g, '');
        let l = Line.parse_annotations(line);

        let len_top_line = 0;
        let b_l_spaces = '';
        let offset = bottom_line.indexOf('[');
        let end = bottom_line.indexOf(']');
        let len = end - offset;

        //line with chord
        if(offset !== -1 && end !== -1){
          let i = 0;
          while(offset !== -1 && end !== -1){
            //add spaces
            if(offset - len_top_line > 0)
              top_line += new Array(offset - len_top_line + 1).join(' ');
            //TODO solution for spaces in bottom_line_markup
            else if(offset - len_top_line < 0){
                b_l_spaces = new Array(len_top_line - offset + 1).join(' ');
            }

            top_line += bottom_line.substr(offset + 1, len - 1).replace(/(^\s+|\s+$)/g, '') + ' ';
            bottom_line = bottom_line.substr(0, offset) + bottom_line.substr(end + 1);

            b_l_spaces = '';
            len_top_line = top_line.length;
            offset = bottom_line.indexOf('[');
            end = bottom_line.indexOf(']');
            len = end - offset;
          }
        }

        return new ParsedLine(top_line, bottom_line_markup, l.annotations, l.diffAnnotations);
    }


    /**
     * @static
     * parse annotations of string
     * @param {string} line - string to parse
     * @returns ParsedAnnotations
     * */
    static parse_annotations(line: string): ParsedAnnotations{
        let splitted = line.split('|');
        let parsed = new ParsedAnnotations();
        let i = 0;
        for (let a of splitted){
            // lyrics are not wanted
            if (i !== 0){
                //if annotation is array convert entries to string
                if(/;/.test(a)){
                    let ar = Line.parse_array(a);
                    ar = Line.strip_each_entry(ar);
                    parsed.annotations[parsed.annotations.length] = ar;
                    parsed.diffAnnotations = Utils.max(a.length, parsed.diffAnnotations);
                }else
                    parsed.annotations[parsed.annotations.length] = [a.replace(/(^\s+|\s+$)/g, '')];
            }
            i++;
        }
        return parsed;
    }

    /**
     * @static
     * parses an annotations string to an array if there are different strings for different repetitions
     * @param {string} a - split array by ';'
     * @returns {string[]} - array of strings
     * */
    static parse_array(a: string): string[]{
        a = '[\'' + a.replace(/;/g, '\',\'') + '\']';
        return eval(a);
    }

    /**
     * @static
     * strip white spaces from each entry of an array
     * @param {string[]} a - array to strip
     * @returns {string[]} stripped strings
     * */
    static strip_each_entry(a: string[]): string[]{
        for(let i = 0; i < a.length; i++)
            a[i] = a[i].replace(/(^\s+|\s+$)/g, '');
        return a;
    }
}

class ParsedLine {
    topLine: string = '';
    bottomLine: string = '';
    annotations: string[][] = [[]];
    maxLength: number = 0;
    diffAnnotations = 0;

    constructor(topLine: string, bottomLine: string, annotations: string[][], diffAnnotations: number) {
        this.topLine = topLine;
        this.bottomLine = bottomLine;
        this.maxLength = Utils.max(topLine.length, bottomLine.length);
        this.diffAnnotations = diffAnnotations;
    }
}

class ParsedAnnotations {
    annotations: string[][] = [[]];
    diffAnnotations: number = 0;
}