import { User } from '#/User';

describe(`User`, (): void => {
    test(`constructor`, (): void => {
        const u = new User(`●`);
    });

    test(`get stone`, (): void => {
        const u = new User(`●`);
        expect(`●`).toBe(u.stone);
    });
});
