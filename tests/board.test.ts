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
});
