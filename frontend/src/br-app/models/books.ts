export interface Book {
    _id?: string;
    name: string;
    author: string;
    year?: number;
    rate: number;
    genres: string;
    tags: string[];
    description: string;
    imgUrl?: string;
}
