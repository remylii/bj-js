import { config } from '#/config/app';

describe(`Config`, (): void => {
    test(`app`, (): void => {
        expect(config.BOARD_LENGTH).toBe(10);
        expect(config.WIN_COUNT).toBe(5);
    });
});
