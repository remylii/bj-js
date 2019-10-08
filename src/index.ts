import { Board } from "#/Board";

const board = new Board(10);
const items: NodeListOf<Element> = document.querySelectorAll(".item");
const allItems: Array<HTMLElement> = [].slice.call(items);
const element: HTMLElement | null = document.querySelector(".container");

if (!!element) {
    element.addEventListener(
        "click",
        (e: Event): void => {
            const elem = e.target as HTMLElement;
            const idx: number = allItems.indexOf(elem);
            const resultElement: HTMLElement | null = document.querySelector(".result");

            if (board.exists(idx)) {
                return;
            }
            const block = `x`;
            board.setData(idx, block);

            elem.innerHTML = idx.toString();
            elem.classList.add("block-first");

            if (board.isWin(idx) === true) {
                if (!!resultElement) {
                    resultElement.innerHTML = block + ` の勝利!`;
                }
                return;
            }
        },
        false
    );
}
