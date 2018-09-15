import { Layout } from './layout';

/**
 * The first and simplest layout covering all important features.
 * @extends Layout
 * @see Layout
 * */
export class SimplestLayout extends Layout{

    /**
     * @constructor
     * @param {Object} settings - settings which can be applied to this layout (optional).
     * @param {string} settings.font - Available fonts are 'ubuntu', 'anonymous', 'roboto'. default is 'ubuntu'
     * @param {boolean} settings.table - Display tablelines. default is true
     * @param {boolean} settings.annotations - Display annotations. default is true
     * @returns {Layout} SimplestLayout - object of SimplestLayout
     * */
    constructor(settings){
        super(settings);
    }

    /**
     * generates a pdfMake object for a given Song object.
     * @param {Song} song - Song object to generate a pdfMake object for.
     * @returns {pdfMake} json - pdfMake json object
     * */
    gen(song){
        let that = this;
        this.song = song;
        this.pdf.set_font(this.font);
        this.pdf.set_footer(function (currPage, pageCount){
            let text = fPDF.get_text('erstellt mit Songsheet '+currPage+ ' von '+pageCount, 8, undefined, [100, 100, 100]);
            text.width = 150;
            text.font = that.pdf.font;
            text.margin = [2, 1];
            return {
              columns: [
                  {text: '', width:'*'},
                  text,
                  {image: logo, width: 10},
                  {text: '', width: 25}
              ]
            };
        });

        // write header
        this.write_header(song.title, song.artist, song.bpm, song.books);

        // iterate over blocks for writing
        this.go_through_blocks_and_print(song);

        // print last block
        return this.pdf.get_body_as_string();
    }

    /**
     * generates a pdfMake object for a block with a given amount of repetitions
     * @param {Block} block - Block to print
     * @param {number} count - amount of repetitions
     * */
    print_block(block, count){
        //padding top
        this.pdf.new_table();

        // set cell widths
        this.set_widths();

        // write block header
        this.write_block_header(block, count);

        // write block
        for(let i = 0; i < block.lines.length; i++){
            let line = block.lines[i];
            if((/\w/.test(line.lyrics[1]) || /\w/.test(line.lyrics[0])) && i < block.lines.length - 1)
                this.print_line(line);
            else if(/\w/.test(line.lyrics[1]) || /\w/.test(line.lyrics[0]))
                this.print_line(line, 'B');
        }

        block.increase_printed_counter();
    }

    /**
     * generates a pdfMake object for a line with a border
     * @param {Line} line - Line object to print
     * @param {string} border - string where borders should be displayed: 'B' -> bottom, 'L' -> left, 'T' -> top, 'R' -> right
     * */
    print_line(line, border=''){
        let border_ann_1 = this.table ? border+'L' : 0;
        let border_ann = this.table ? 'L' : 0;
        this.pdf.cell(this.parse_markdown_line(line.lyrics[0]), 0);
        if(this.song.ann_cells > 0)
            this.pdf.cell('', border_ann);
        this.pdf.new_line();
        this.pdf.cell(this.parse_markdown_line(line.lyrics[1]), border);

        if(this.annotations) {
            for (let i = 0; i < this.song.ann_cells; i++) {
                let text = ' ';
                if (line.annotations.length >= i + 1) {
                    if (Array.isArray(line.annotations[i]))
                        text = line.annotations[i][line.parent.get_printed_counter()];
                    else
                        text = line.annotations[i];
                }

                text = text || "";
                this.pdf.cell(this.parse_markdown_line(text), border_ann_1);
            }
        }

        this.pdf.new_line();
    }

    /**
     * interates through all blocks of a song and generates the pdfMake object
     * @param {Song} song - Song to print
     * */
    go_through_blocks_and_print(song){
        let prev_block = new Block('', []);
        let counter = 1;
        for(let block of song.get_order()){
            // look forward and count amount of blocks
            // if next is equal increase counter
            // if next is not equal print prev block and
            // set prev_block to curr_block
            let next_block = song.blocks[block];
            if(prev_block === undefined)
                prev_block = next_block;
            else if(prev_block.title === '')
                prev_block = next_block;
            else if(next_block !== undefined && prev_block.title === next_block.title && next_block.all_diff_printed())
                counter ++;
            else{
                this.print_block(prev_block, counter);
                // set prev_block to next_block
                prev_block = next_block;
                counter = 1;
            }
        }

        if(prev_block !== undefined)
            this.write_last_block(prev_block, counter);
    }

    /**
     * creates the header for a block
     * @param {Block} block - Block to parse
     * @param {number} count - repetition amount of this block
     * */
    write_block_header(block, count){
        let block_header = block.title;
        if(count !== 1)
            block_header += ' ' + count + 'x';

        // check if table lines should be printed
        let border = this.table ? 'B' : 0;
        this.pdf.cell(this.parse_markdown_line(block_header), border);
        this.pdf.new_line();
    }

    /**
     * print the last block
     * @param {Block} block - Block to parse
     * @param {number} counter - repetition amount of this block
     * */
    write_last_block(block, counter){
        this.print_block(block, counter);
        this.pdf.new_table();
    }
}
