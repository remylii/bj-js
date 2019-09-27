import { arrayExpression } from "@babel/types";

export class Board {
    private length: number;
    private data: Array<string|null>;

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
}
