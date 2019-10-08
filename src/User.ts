export class User {
    private _stone: string;
    private _color: string;

    constructor(s: string, color: string) {
        this._stone = s;
        this._color = color;
    }

    get stone(): string {
        return this._stone;
    }

    paint(elem: HTMLElement): void {
        elem.classList.add(`block-` + this._color);
    }
}
