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
}
