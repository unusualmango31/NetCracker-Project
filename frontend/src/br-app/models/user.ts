export interface User {
    email: string;
    username: string;
    password: string;
    tags: string[];
    isAdmin: boolean;
    booksIds?: string[];
}
