export class Song {
    id?: string;
    title: string = '';
    artist?: string;
    bpm?: number;
    books?: string[];
    blocks?: any;
    order?: string[];
    annotationCells: number = 0;
    maxLineWidth: number = 0;
}