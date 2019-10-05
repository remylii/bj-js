import { Board } from "#/Board";
import { config } from "#/config/app";

describe("Board", (): void => {
    test("constructor", (): void => {
        const b = new Board(10);
    });

    test(`put`, (): void => {
        const board = new Board(10);
        const s1 = "●";
        const s2 = "◆";

        board.put(9, 9, s1);
        board.put(0, 0, s2);

        const s1_idx = board.getViewData().indexOf(s1);
        const s2_idx = board.getViewData().indexOf(s2);
        expect(s1_idx).toBe(99);
        expect(s2_idx).toBe(0);
    });

    test(`throws out board range`, (): void => {
        const board = new Board(5);
        const s = "x";

        expect((): void => {
            board.put(5, 0, s);
        }).toThrow();

        expect((): void => {
            board.put(0, 5, s);
        }).toThrow();

        expect((): void => {
            board.put(-1, 0, s);
        }).toThrow();

        expect((): void => {
            board.put(0, -1, s);
        }).toThrow();
    });

    test(`throws already put`, (): void => {
        const board = new Board(3);
        const s1 = "x";
        const s2 = "y";

        board.put(0, 0, s1);
        expect((): void => {
            board.put(0, 0, s1);
        }).toThrow();

        expect((): void => {
            board.put(0, 0, s2);
        }).toThrow();
    });

    test(`exists`, (): void => {
        const board = new Board(10);
        const s = `x`;

        for (let i = 0; i < 100; i++) {
            let res = board.exists(i);
            expect(res).toBe(false);

            board.setData(i, s);
        }

        for (let i = 0; i < 100; i++) {
            let res2 = board.exists(i);
            expect(res2).toBe(true);
        }
    });
});

describe(`isWin`, (): void => {
    test(`line win`, (): void => {
        const board = new Board(10);
        const s = `●`;

        for (let i = 0; i < config.WIN_COUNT; i++) {
            let res = board.isWin(i);
            expect(res).toBe(false);
        }

        board.put(4, 0, s);
        board.put(3, 0, s);
        board.put(2, 0, s);
        board.put(1, 0, s);
        board.put(0, 0, s);

        for (let i = 0; i < config.WIN_COUNT; i++) {
            let res = board.isWin(i);
            expect(res).toBe(true);
        }
    });

    test(`line not enough`, (): void => {
        const board = new Board(10);
        const s = `●`;
        const s2 = `○`;

        board.put(4, 0, s2);
        board.put(3, 0, s);
        board.put(2, 0, s);
        board.put(1, 0, s);
        board.put(0, 0, s);

        for (let i = 0; i < config.WIN_COUNT; i++) {
            let res = board.isWin(i);
            expect(res).toBe(false);
        }
    });

    test(`tate win`, (): void => {
        const board = new Board(10);
        const s = `●`;

        for (let i = 0; i < config.WIN_COUNT; i++) {
            let j = i * 10;
            let res = board.isWin(j);
            expect(res).toBe(false);
        }

        board.put(0, 4, s);
        board.put(0, 3, s);
        board.put(0, 2, s);
        board.put(0, 1, s);
        board.put(0, 0, s);

        for (let i = 0; i < config.WIN_COUNT; i++) {
            let j = i * 10;
            let res = board.isWin(j);
            expect(res).toBe(true);
        }
    });

    test(`diagonal left to right win`, (): void => {
        const board = new Board(10);
        const s = "○";

        for (let i = 0; i < config.WIN_COUNT; i++) {
            let j = i * 11;
            let res = board.isWin(j);
            expect(res).toBe(false);
        }

        board.put(0, 0, s);
        board.put(1, 1, s);
        board.put(2, 2, s);
        board.put(3, 3, s);
        board.put(4, 4, s);

        for (let i = 0; i < config.WIN_COUNT; i++) {
            let j = i * 11;
            let res = board.isWin(j);
            expect(res).toBe(true);
        }
    });

    test(`diagonal right to left win`, (): void => {
        const board = new Board(10);
        const s = "○";

        for (let i = 0; i < config.WIN_COUNT; i++) {
            let j = 40 - i * 9;
            let res = board.isWin(j);
            expect(res).toBe(false);
        }

        board.put(0, 4, s);
        board.put(1, 3, s);
        board.put(2, 2, s);
        board.put(3, 1, s);
        board.put(4, 0, s);

        for (let i = 0; i < config.WIN_COUNT; i++) {
            let j = 40 - i * 9;
            let res = board.isWin(j);
            expect(res).toBe(true);
        }
    });
});
