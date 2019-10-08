import { Board } from "#/Board";
import { User } from "#/User";

const board = new Board(10);
const items: NodeListOf<Element> = document.querySelectorAll(".item");
const allItems: Array<HTMLElement> = [].slice.call(items);
const element: HTMLElement | null = document.querySelector(".container");

let current_user: User = new User(`●`, 'black');
let stundby_user: User = new User(`○`, 'white');
let gameover: boolean = false;

function changeUser(): void
{
    let temp = current_user;
    current_user = stundby_user;
    stundby_user = temp;

    renderTurn();
}

function renderTurn(): void
{
    const elem = document.querySelector('.turn');
    if (!!elem) {
        elem.innerHTML = `${current_user.stone}のターン`;
    }
}

function renderGameSet(): void
{
    const resultElement: HTMLElement | null = document.querySelector(".result");
    if (!!resultElement) {
        resultElement.innerHTML = current_user.stone + ` の勝利!`;
        gameover = true;
    }
    return;
}

if (!!element) {
    element.addEventListener(
        "click",
        (e: Event): void => {
            if (gameover === true) {
                return;
            }

            const elem = e.target as HTMLElement;
            const idx: number = allItems.indexOf(elem);

            if (board.exists(idx)) {
                return;
            }

            board.setData(idx, current_user.stone);

            elem.innerHTML = idx.toString();
            current_user.paint(elem);

            if (board.isWin(idx) === true) {
                renderGameSet();
            }

            changeUser();
        },
        false
    );
}
