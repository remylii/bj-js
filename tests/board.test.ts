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

        const response1 = board.isGameEnd(0);
        const response2 = board.isGameEnd(4);
        expect(response1).toBe(true);
        expect(response2).toBe(true);
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

        const response1 = board.isGameEnd(0);
        const response2 = board.isGameEnd(4);
        expect(response1).toBe(false);
        expect(response2).toBe(false);
    });

    test(`tate win`, (): void => {
        const board = new Board(10);
        const s = `●`;

        board.put(0, 4, s);
        board.put(0, 3, s);
        board.put(0, 2, s);
        board.put(0, 1, s);
        board.put(0, 0, s);

        const response1 = board.isGameEnd(0);
        expect(response1).toBe(true);

        const response2 = board.isGameEnd(40);
        expect(response2).toBe(true);
    });

    test(`diagonal left to right win`, (): void => {
        const board = new Board(10);
        const s = '○';

        board.put(0, 0, s);
        board.put(1, 1, s);
        board.put(2, 2, s);
        board.put(3, 3, s);
        board.put(4, 4, s);

        const response1 = board.isGameEnd(44);
        expect(response1).toBe(true);

        const response2 = board.isGameEnd(0);
        expect(response2).toBe(true);
    });

    test(`diagonal right to left win`, (): void => {
        const board = new Board(10);
        const s = '○';

        const a = board.isGameEnd(40);
        expect(a).toBe(false);

        board.put(0, 4, s);
        board.put(1, 3, s);
        board.put(2, 2, s);
        board.put(3, 1, s);

        const b = board.isGameEnd(4);
        expect(b).toBe(false);

        board.put(4, 0, s);

        const response1 = board.isGameEnd(40);
        expect(response1).toBe(true);

        const response2 = board.isGameEnd(4);
        expect(response2).toBe(true);
    });
});
