import { User } from '#/User';

describe(`User`, (): void => {
    test(`constructor`, (): void => {
        const u = new User(`●`, `black`);
    });

    test(`get stone`, (): void => {
        const u = new User(`●`, `black`);
        expect(`●`).toBe(u.stone);
    });
});
