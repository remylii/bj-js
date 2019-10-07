import { config } from "#/config/app";

type BoardData = Array<string | null>;

export class Board {
    private length: number;
    private data: BoardData;

    constructor(n: number) {
        if (n < 0) {
            throw Error;
        }
        this.length = n;

        const total_cell_count = n ** 2;
        this.data = new Array<string | null>(total_cell_count).fill(null);
    }

    getViewData(): Array<string | null> {
        return this.data;
    }

    put(x: number, y: number, block: string): void {
        if (0 > x || x >= this.length) {
            throw Error(`Invalid argument x`);
        }

        if (0 > y || y >= this.length) {
            throw Error(`Invalid argument y`);
        }

        const idx = x + y * this.length;

        this.setData(idx, block);
        return;
    }

    setData(n: number, block: string): void {
        if (this.exists(n) === true) {
            throw Error(`Already declared`);
        }

        this.data[n] = block;
    }

    exists(n: number): boolean {
        if (this.data[n] !== null) {
            return true;
        }

        return false;
    }

    isWin(idx: number): boolean {
        const indexes: Array<number> = [
            this.length + 1,
            this.length,
            this.length - 1,
            1
        ];

        const s = this.data[idx];
        if (s === null || s === undefined) return false;

        const idx_n: number = parseInt(idx.toString().substr(-1), 10);

        for (const val of indexes) {
            let round = 0;
            let same_count = 1;
            while (round < 2) {
                let base = round === 0 ? val : -val;

                if (idx_n === (this.length - 1)) {
                    if (base === -(this.length - 1) || base === 1 || base === this.length + 1) {
                        round++;
                        continue;
                    }
                } else if (idx%this.length === 0) {
                    if (base === -(this.length + 1) || base === -1 || base === this.length - 1) {
                        round++;
                        continue;
                    }
                }

                oneSide: for (let i = 1; i < config.WIN_COUNT; i++) {
                    let target_idx = idx + base * i;
                    let n: number = parseInt(target_idx.toString().substr(-1), 10);

                    if (target_idx < 0 || s !== this.data[target_idx]) {
                        break oneSide;
                    }

                    same_count++;

                    if (n === (this.length - 1)) {
                        if (base === -(this.length - 1) || base === 1 || base === this.length + 1) {

                            break oneSide;
                        }
                    }

                    if (target_idx%this.length === 0) {
                        if (base === -(this.length + 1) || base === -1 || base === this.length - 1) {
                            break oneSide;
                        }
                    }
                }

                round++;
            }

            if (same_count >= config.WIN_COUNT) {
                return true;
            }
        }

        return false;
    }
}
