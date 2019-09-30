import { arrayExpression } from "@babel/types";

type BoardData = Array<string|null>;

export class Board {
    private length: number;
    private data: BoardData;

    constructor(n: number) {
        if (n < 0) {
            throw Error;
        }
        this.length = n;

        const total_cell_count = n**2;
        this.data = new Array<string|null>(total_cell_count).fill(null);
    }

    getViewData(): Array<string|null> {
        return this.data;
    }

    put(x: number, y: number, block: string): void {
        if (0 > x || x >= this.length) {
            throw Error(`Invalid argument x`);
        }

        if (0 > y || y >= this.length) {
            throw Error(`Invalid argument y`);
        }

        const idx = x + (y * this.length);
        if (this.data[x] !== null) {
            throw Error(`Already declared`);
        }

        this.data[idx] = block;
    }

    isGameEnd(idx: number): boolean {
        if (this.data[idx] === undefined || this.data[idx] === null) {
            return false;
        }

        const win_count: number = 5;
        const s = this.data[idx];

        // yoko
        const yoko = this.data.slice(idx, idx + win_count);
        const yoko_result = yoko.every(elem => elem === s);
        if (yoko_result === true) {
            return true;
        }
        // yoko m
        if (idx >= (win_count - 1)) {
            const yoko_minus = this.data.slice((idx - win_count + 1), idx);
            const yoko_minus_result = yoko_minus.every(elem => elem === s);
            if (yoko_minus_result === true) {
                return true;
            }
        }

        // tate
        const tate_temp = new Array;
        for (let i = 0; i < win_count; i++) {
            tate_temp.push( idx + (i * this.length) );
        }
        const tate = tate_temp.map(v => this.data[v]);
        const tate_result = tate.every(elem => elem === s);
        if (tate_result === true) {
            return true;
        }

        // tate m
        const tate_m_temp = new Array;
        for (let i = 0; i < win_count; i++) {
            tate_m_temp.push( idx - (i * this.length) );
        }
        const tate_minus = tate_m_temp.map(v => this.data[v]);
        const tate_m_result = tate_minus.every(elem => elem === s);
        if (tate_m_result === true) {
            return true;
        }
        return false;
    }
}
