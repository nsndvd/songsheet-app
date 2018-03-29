export class Song {
    id?: string;
    name: string;
    artist?: string;
    bpm?: number;
    books?: string[];
    path: string;
    obj: any;
    private preview: string;

    link(): string{
        return ''
    }

    getPreview(): string{
        return this.preview;
    }

    setPreview(prev: string){
        this.preview = prev;
    }
}