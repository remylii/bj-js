import { User } from "#/User";
import { GameManager } from "#/GameManager";

describe(`GameManager`, (): void => {
    test(`initialize`, (): void => {
        const b = new User(`b`, 'black');
        const w = new User(`w`, `white`);
        const GM = new GameManager(b, w);

        const current = GM.getCurrentUser();
        expect(current.stone).toEqual(b.stone);
        expect(current.stone).toEqual(GM.currentUserToString());
    });

    test(`reject duplicate user entry`, (): void => {
        const b = new User(`b`, 'black');
        const w = new User(`b`, `black`);

        expect((): void => {
            const GM = new GameManager(b, w);
        }).toThrow();
    });

    test(`changePlayer`, (): void => {
        const player1 = new User(`b`, 'black');
        const player2 = new User(`w`, `white`);
        const GM = new GameManager(player1, player2);

        GM.changePlayer();
        const current = GM.getCurrentUser();

        expect(current.stone).toEqual(player2.stone);
        expect(current.stone).toEqual(GM.currentUserToString());
    });

    test(`game end`, (): void => {
        const player1 = new User(`b`, 'black');
        const player2 = new User(`w`, `white`);
        const GM = new GameManager(player1, player2);

        expect(GM.isGameEnd()).toBe(false);

        GM.gameEnd();
        expect(GM.isGameEnd()).toBe(true);
        expect(player1.stone).toBe(GM.currentUserToString());
    });
});
