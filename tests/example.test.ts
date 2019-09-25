import { increment, incrementString } from '#/action';

type EachTable = [...[number, number][]];
const table : EachTable = [
    [1, 2],
    [10, 11],
];
describe.each(table)(
    "The func increment(%d)",
    (argv: number, expected: number) => {
        test("should return +1", (): void => {
            const recived = increment(argv);
            expect(recived).toBe(expected);
        });
    }
);

type EachTable2 = [...[number, string][]];
const table2 : EachTable2 = [
    [1, "2"],
    [10, "11"]
];
describe.each(table2)(
    "The func incrementString(%d)",
    (argv: number, expected: number | string): void => {
        test("should return +1 and type string", (): void => {
            const recived : string = incrementString(argv);
            expect(recived).toBe(expected);
        });
    }
);
