import { Song } from '../song_structure/song';
import { FONTS, DEFAULT_FONT, MARKUP_REG } from '../constants';
import { Block } from '../song_structure/block';
import { Line } from '../song_structure/line';

/**
 * abstract Layout class. Basic constructor settings and helper classes.
 * @property {Object} pdf - fPDF object
 * @property {string} font - font to use for this layout
 * @property {number} font_size - default font-size
 * @property {boolean} table - whether to print table lines. default is true
 * @property {boolean} annotations - whether to print annotations. default is true
 * @property {Object} song - song which has this layout
 * */
export abstract class Layout{

    font: string = 'ubuntu';
    font_size: number = 10;
    table: boolean = true;
    annotations: boolean = true;
    song: Song;

    /**
     * @constructor
     * @param {Object} settings - settings which can be applied to this layout (optional).
     * @param {string} settings.font - Available fonts are 'ubuntu', 'anonymous', 'roboto'. default is 'ubuntu'
     * @param {boolean} settings.table - Display tablelines. default is true
     * @param {boolean} settings.annotations - Display annotations. default is true
     * @returns {Layout} SimplestLayout - object of SimplestLayout
     * */
    constructor(settings: settings){
        if(new.target === Layout)
            throw new TypeError('this Class is an abstract class.');

        if(settings && 'table' in settings)
            this.table = settings['table'];
        if(settings && 'annotations' in settings)
            this.annotations = settings['annotations'];
        if(settings && 'font' in settings && settings.font in FONTS){
            this.font = settings.font;
        }
    }

    /**
     * generates a pdfMake object for a given Song object.
     * @abstract
     * @param Song song - Song object to generate a pdfMake object for.
     * */
    gen(song: Song){
        throw new TypeError('this Class is an abstract class.');
    }

    /**
     * generates a pdfMake object for a block with a given amount of repetitions
     * @abstract
     * @param Block block - Block to print
     * @param number counter - amount of repetitions
     * */
    print_block(block: Block, counter: number){
        throw new TypeError('this Class is an abstract class.');
    }

    /**
     * generates a pdfMake object for a line with a border
     * @param Line line - Line object to print
     * @abstract
     * */
    print_line(line: Line){
        throw new TypeError('this Class is an abstract class.');
    }

    /**
     * set font for this layout.
     * @param string font - Font to set
     * */
    set_font(font: string = DEFAULT_FONT){
        for(let f in FONTS)
            if(font === f)
                this.font = font;
    }

    /**
     * Parse markdown string to pdfMake json.
     * Options are:
     * * - italic
     * ** - bold
     * <r> - red
     * <g> - green
     * <b> - blue
     * @param string string - string to parse
     * @returns Line[] line - returns the string as an array of text elements in pdfMake format
     */
    parse_markdown_line(string: string): Line[]{
        let line = [];

        let first = true;
        string += ' ';     // catch * at the end

        let s = new State();
        let match = string.match(MARKUP_REG);
        if(match === null){
            //TODO replace fPDF
            line[0] = fPDF.get_text(string, this.font_size);
            string = '';
        }
        while(match){
            let skip = match[0].length;
            let weight = s.is_bold ? 'B' : '';
            weight += s.is_italic ? 'I' : '';

            let text = string.substr(0, string.search(new RegExp(escapeRegExp(match[0]))));
            line[line.length] = fPDF.get_text(text, this.font_size, weight, s.color);

            if(/\*[^*]/.test(match[0]))
                skip -= 1;
            string = string.substr(text.length + skip);

            s.update(match[0]);

            match = string.match(MARKUP_REG);
            first = false;
        }
        let weight = s.is_bold ? 'B' : '';
        weight += s.is_italic ? 'I' : '';

        if(string.length > 0)
            line[line.length] = fPDF.get_text(string, this.font_size, weight, s.color);
        return line;
    }

    /**
     * parse title, artist, bpm and books to a pdfMake json.
     * @param {string} title - title of the song as a string
     * @param {string} artist - artist as a string
     * @param {string} bpm - bpm as a string
     * @param {string[]} books - array of books where the song is from
     * */
    write_header(title, artist, bpm, books){
        this.pdf.set_widths(['*', 11/2.5, 10, 11/2.5, 40/2.5]);
        this.pdf.cell(fPDF.get_text(title, this.font_size + 2), 0);

        if(bpm !== undefined)
            this.pdf.cell(fPDF.get_image(bpm_image, 16), 0);
        else
            this.pdf.cell(fPDF.get_text(' ', this.font_size), 0);
        this.pdf.cell(fPDF.get_text(bpm, this.font_size - 2), 0, [0,3]);

        if(books !== undefined && books.length > 0)
            this.pdf.cell(fPDF.get_image(books_image, 16), 0);
        else
            this.pdf.cell(fPDF.get_text(' ', this.font_size), 0);
        this.pdf.cell(fPDF.get_text(books.join('\n'), this.font_size - 2), 0);
        this.pdf.new_table();

        this.pdf.cell(fPDF.get_text(artist, this.font_size - 2), 0, [0,-10]);
        this.pdf.new_table();
    }

    /**
     * set widths of the tables with respect to amount of annotation cells
     * */
    set_widths(){
        let width_lyr = 2 * this.song.lyrics_width;
        let width_ann = this.song.ann_cells > 0 ? (190 - width_lyr) / this.song.ann_cells : 0;

        if(width_ann === 0)
            width_lyr = '*';

        let widths = [width_lyr];
        for(let i = 1; i <= this.song.ann_cells; i++)
            widths[i] = width_ann;

        this.pdf.set_widths(widths);
    }
}

/**
 * State class which saves the current state of text formats while parsing a markdown string
 * @property {boolean} is_bold - current text is bold
 * @property {boolean} is_italic - current text is italic
 * @property {number[]} color - current color of the text as an array with values 0 to 255
 * */
class State{

    is_bold: boolean = false;
    is_italic: boolean = false;
    color: [number, number, number] = [0,0,0];

    /**
     * @constructor
     * */
    constructor(){ }

    /**
     * updates the current state by the matched string
     * @param {string} match - update the current state by the matched string
     * */
    update(match){
        if(/\*[^*]/.test(match))
            this.is_italic = !this.is_italic;
        else if(/\*\*/.test(match))
            this.is_bold = !this.is_bold;
        else if(/<r>/.test(match))
            this.color = [255, 0, 0];
        else if(/<g>/.test(match))
            this.color = [0, 255, 0];
        else if(/<b>/.test(match))
            this.color = [0, 0, 255];
    }
}

interface settings{
    font?: string;
    table?: boolean;
    annotations?: boolean;
}
