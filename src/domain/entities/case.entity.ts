export interface ICase {
    lat: number;
    lng: number;
    isSent: boolean;
    genre: string;
    age: number;
}

export interface ICaseDocument extends ICase, Document {}