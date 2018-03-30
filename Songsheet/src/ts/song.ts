interface ISong {
    id?: string;
    name: string;
    artist?: string;
    bpm?: number;
    books?: string[];
    obj?: any;
    preview: string;
}

export class Song {
    public id?: string;
    public name: string = '';
    public artist?: string = '';
    private bpm?: number = null;
    public books?: string[];
    public obj?: any;
    private preview: string = '';

    constructor(params?: string | any){
        if(typeof params === 'string'){
            this.name = params;
        }else if(typeof params !== 'undefined'){
            this.id = params.id;
            this.name = params.name;
            this.artist = params.artist;
            this.bpm = params.bpm;
            this.books = params.books;
            this.obj = params.obj;
            this.preview = params.preview;
        }
    }

    path(): string {
        return '';
    }

    link(): string{
        return '';
    }

    getPreview(): string{
        return this.preview;
    }

    setPreview(prev: string){
        this.preview = prev;
    }

    getBPM(): number{
        return this.bpm;
    }

    setBPM(val: [string, number]){
        if (typeof val === 'string' && !isNaN(Number(val)) && val !== '') {
            this.bpm = Number(val);
        } else if(typeof val === 'number') {
            this.bpm = val;
        } else {
            return false;
        }
        return true;
    }
}