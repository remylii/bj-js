import { Board } from '#/Board';

const board = new Board(10);
const elements = document.querySelectorAll('.item');

elements.forEach((elem: Element) => {
    elem.addEventListener('click', () => {
        const alls: Array<Element> = [].slice.call(elements);
        console.log(alls);
        elem.innerHTML = `` + alls.indexOf(elem);
    });
});
