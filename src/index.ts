import { Board } from '#/Board';

const board = new Board(10);
const elements = document.querySelectorAll('.item');

const resultElement: HTMLElement | null = document.querySelector('.result');

elements.forEach((elem: Element) => {
    elem.addEventListener('click', (): void => {
        const alls: Array<Element> = [].slice.call(elements);
        const idx: number = alls.indexOf(elem);

        if (board.exists(idx)) {
            return;
        }
        const block = `x`;
        board.setData(idx, block);

        elem.innerHTML = idx.toString();
        elem.classList.add('block-first');

        if (board.isGameEnd(idx) === true) {
            if (!!resultElement) {
                resultElement.innerHTML = block + ` の勝利!`;
            }
            return;
        }
    });
});
