import { Board } from "#/Board";

const board = new Board(10);
const items: NodeListOf<Element> = document.querySelectorAll(".item");
const allItems: Array<HTMLElement> = [].slice.call(items);
const element: HTMLElement | null = document.querySelector(".container");
const resultElement: HTMLElement | null = document.querySelector(".result");

if (!!element) {
    element.addEventListener(
        "click",
        (e: Event): void => {
            const elem = e.target as HTMLElement;
            const idx: number = allItems.indexOf(elem);

            if (board.exists(idx)) {
                return;
            }
            const block = `x`;
            board.setData(idx, block);

            elem.innerHTML = idx.toString();
            elem.classList.add("block-first");

            if (board.isGameEnd(idx) === true) {
                if (!!resultElement) {
                    resultElement.innerHTML = block + ` の勝利!`;
                }
                return;
            }
        },
        false
    );
}
