import { Board } from "#/Board";
import { User } from "#/User";
import { GameManager } from "#/GameManager";

const board = new Board(10);
const items: NodeListOf<Element> = document.querySelectorAll(".item");
const allItems: Array<HTMLElement> = [].slice.call(items);
const element: HTMLElement | null = document.querySelector(".container");
const turnElement: HTMLElement | null = document.querySelector('.turn')

const firstPlayer = new User(`●`, 'black');
const seconedPlayer = new User(`○`, 'white');
const GM = new GameManager(firstPlayer, seconedPlayer);

function renderHTML(elem: HTMLElement | null, s: string): void {
    if (!!elem) {
        elem.innerHTML = s;
    }
}

renderHTML(turnElement, `${GM.currentUserToString()}のターン`);

if (!!element) {
    element.addEventListener(
        "click",
        (e: Event): void => {
            if (GM.isGameEnd() === true) {
                return;
            }

            const elem = e.target as HTMLElement;
            const idx: number = allItems.indexOf(elem);
            const player = GM.getCurrentUser();

            if (board.exists(idx)) {
                return;
            }

            board.setData(idx, player.stone);

            elem.innerHTML = idx.toString();
            player.paint(elem);

            if (board.isWin(idx) === true) {
                GM.gameEnd();
                const resultElement: HTMLElement | null = document.querySelector(".result");
                renderHTML(resultElement, `${GM.currentUserToString()}の勝利！`);
                return;
            }

            GM.changePlayer();
            renderHTML(turnElement, `${GM.currentUserToString()}のターン`);
        },
        false
    );
}
