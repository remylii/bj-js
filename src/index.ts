import { Board } from "#/Board";
import { User } from "#/User";

import { entryPlayer, changePlayer, getCurrentUser, getCurrentTurn, gameSet, isGameEnd } from "#/actions/GameAction";

const board = new Board(10);
const items: NodeListOf<Element> = document.querySelectorAll(".item");
const allItems: Array<HTMLElement> = [].slice.call(items);
const element: HTMLElement | null = document.querySelector(".container");
const turnElement: HTMLElement | null = document.querySelector('.turn')

function init(): void {
    const firstPlayer = new User(`●`, 'black');
    const seconedPlayer = new User(`○`, 'white');
    entryPlayer(firstPlayer, seconedPlayer);
    renderHTML(turnElement, getCurrentTurn());
}

function renderHTML(elem: HTMLElement | null, s: string): void {
    if (!!elem) {
        elem.innerHTML = s;
    }
}

init();

if (!!element) {
    element.addEventListener(
        "click",
        (e: Event): void => {
            if (isGameEnd() === true) {
                return;
            }

            const elem = e.target as HTMLElement;
            const idx: number = allItems.indexOf(elem);
            const player = getCurrentUser();

            if (board.exists(idx)) {
                return;
            }

            board.setData(idx, player.stone);

            elem.innerHTML = idx.toString();
            player.paint(elem);

            if (board.isWin(idx) === true) {
                const resultElement: HTMLElement | null = document.querySelector(".result");
                renderHTML(resultElement, gameSet());
                return;
            }

            changePlayer();
            renderHTML(turnElement, getCurrentTurn());
        },
        false
    );
}
