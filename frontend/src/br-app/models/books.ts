export interface Book {
    _id?: string;
    name: string;
    author: string;
    year?: number;
    rate: number;
    genres: string;
    description: string;
    imgUrl?: string;
    tags: string[];
}

export interface BooksRecommended {
    coefficient?: number;
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
