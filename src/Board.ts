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
        const indexes = [
            -(this.length + 1),
            -(this.length),
            -(this.length - 1),
            -1,
            1,
            (this.length - 1),
            this.length,
            (this.length + 1)
        ];

        const win_count = 5;
        const s = this.data[idx];
        if (s === null || s === undefined) return false;

        iterableIndexes: for (const val of indexes) {
            for (let i = 1; i < win_count; i++) {
                let target_idx = idx + (val * i);
                if (target_idx < 0 || s !== this.data[target_idx]) {
                    continue iterableIndexes;
                }
            }

            return true;
        }

        return false;
    }
}
