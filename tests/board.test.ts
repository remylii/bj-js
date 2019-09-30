import { Board } from '#/Board';

describe('Board', (): void => {
    test('constructor', (): void => {
        const b = new Board(10);
    });

    test(`put`, (): void => {
        const board = new Board(10);
        const s1 = '●';
        const s2 = '◆';

        board.put(9, 9, s1);
        board.put(0, 0, s2);

        const s1_idx = board.getViewData().indexOf(s1);
        const s2_idx = board.getViewData().indexOf(s2);
        expect(s1_idx).toBe(99);
        expect(s2_idx).toBe(0);
    });

    test(`throws out board range`, (): void => {
        const board = new Board(5);
        const s = 'x';

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
        const s1 = 'x';
        const s2 = 'y';

        board.put(0, 0, s1);
        expect((): void => {
            board.put(0, 0, s1);
        }).toThrow();

        expect((): void => {
            board.put(0, 0, s2);
        }).toThrow();
    });
});


describe(`isGameEnd`, (): void => {
    test(`line win`, (): void => {
        const board = new Board(10);
        const s = `●`;

        board.put(4, 0, s);
        board.put(3, 0, s);
        board.put(2, 0, s);
        board.put(1, 0, s);
        board.put(0, 0, s);

        const response = board.isGameEnd(0);
        expect(response).toBe(true);
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

        const response = board.isGameEnd(0);
        expect(response).toBe(false);
    });
});
