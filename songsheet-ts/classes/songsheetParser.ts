import { Block } from './song_structure/block';
import { Line } from './song_structure/line';

/**
 * main parser for a .st document
 * */
export class SongsheetParser{
    /**
     * @constructor
     * */
    constructor(){

    }

    /**
     * @static
     * parse string to Song object. default title is 'Song'.
     * @param {string} string - string of the file to parse
     * @returns {any[]} [title, artist, bpm, books, order, blocks]
     * */
    static parse(string: string): any[]{
        let title;
        let bpm;
        let artist;
        let books: string[];
        let blocks = [];
        let order = [];
        let default_order = [];
        let curr_block_title = '';
        let lines = [];
        let infos_regex = /\[\s*?(title|bpm|artist|books).*\]/g;

        for(let line of string.split(/\r?\n/)){

            //ignore empty lines
            if(!/\w/.test(line))
                continue;

          let offset_infos = SongsheetParser.escape_block(line).search(infos_regex);    // first with brackets in case only keys...
          let offset_order = SongsheetParser.escape_block(line).indexOf('[order:');
          let offset_block = SongsheetParser.escape_block(line).indexOf('[block:');
          let end = line.indexOf(']');

            // force new lines after title and order
            if(offset_infos !== -1 && offset_order !== -1)
                throw Error('Meta data must be seperated in lines');

            // parse title
            if(offset_infos !== -1 && end !== -1){
                [title, bpm, artist, books] = SongsheetParser.parseTitle(line);
            }

            // parse order
            if(offset_order !== -1){
                end = end - offset_order - 7;
                for(let block of line.substr(offset_order + 7, end).split(',')){
                    order[order.length] = block.replace(/(^\s+|\s+$)/g, '');
                }
                continue;
            }

            // start block
            if(offset_block !== -1){
                // save old block
                blocks[blocks.length] = new Block(curr_block_title, lines);
                lines = [];

                // get title
                end = end - offset_block - 8;
                curr_block_title = line.substr(offset_block + 8, end).replace(/(^\s+|\s+$)/g, '');
                // if order is emtpy save order of appearance
                default_order[default_order.length] = curr_block_title;
            }
            // parse block
            else{
                lines[lines.length] = new Line(line);
            }
        }

        blocks[blocks.length] = new Block(curr_block_title, lines);

        if(order.length === 0)
            order = default_order;

        return [title, artist, bpm, books, order, blocks];
    }

    /**
     * @static
     * strip whitespaces of a block to enable indexOf
     * @param {string} string - string to escape
     * @returns {string} escaped string
     * */
    static escape_block(string){
        string = string.toLowerCase().replace(/\[\s+/, '');
        string = string.replace(/\s+:/, ':');
        return string;
    }

    /**
     * get substring of line with offset, match, key_length, separator indecies
     * @param {string} line - line to get substring from
     * @param {number} offset - total offset
     * @param {number} match - match of the key
     * @param {number} key_length - key length
     * @param {number} separator - end of value
     * @returns {string} value of block
     * */
    static get_stripped_substring(line, offset, match, key_length, separator){
        return line.substr(offset + match + key_length, separator - match - key_length).replace(/(^\s+|\s+$)/g, '');
    }

    /**
     * @static
     */
    static parseTitle(line: string): [string, number, string, string[]] {

        let infos_regex_without: RegExp = /(title|bpm|artist|books)/g;
        let match: number;
        let str: string = SongsheetParser.escape_block(line);
        let offset: number = 0;
        let title: string = 'Song';
        let bpm: number;
        let artist: string;
        let books: string[] = [];

        while((match = str.search(infos_regex_without)) >= 0 ){
          let key = str.charAt(match) + str.charAt(match+1);
          let key_length;
          let separator = str.indexOf(';', match) > 0 ? str.indexOf(';', match) : str.indexOf(']', match);

          switch(key){
            case 'ti':
              key_length = 6;
              title = SongsheetParser.get_stripped_substring(line, offset, match, key_length, separator);
              break;
            case 'bp':
              key_length = 4;
              bpm = Number(SongsheetParser.get_stripped_substring(line, offset, match, key_length, separator));
              break;
            case 'ar':
              key_length = 7;
              artist = SongsheetParser.get_stripped_substring(line, offset, match, key_length, separator);
              break;
            case 'bo':
              key_length = 6;
              books = SongsheetParser.get_stripped_substring(line, offset, match, key_length, separator).split(',');
              break;
          }
          str = SongsheetParser.escape_block(line.substr(offset+separator+1)); //remove all before first separator
          offset += separator+1;
        }

        return [title, bpm, artist, books];
    }
}