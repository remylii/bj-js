export class User {
    private _stone: string;

    constructor(s: string) {
        this._stone = s;
    }

    get stone(): string {
        return this._stone;
    }
}
