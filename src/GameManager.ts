import { User } from "./User";

export class GameManager {
    private _current_user: User;
    private _reserve_user: User;
    private _is_gameend: boolean;

    constructor(a: User, b: User) {
        if (a.stone === b.stone) {
            throw Error;
        }

        this._current_user = a;
        this._reserve_user = b;
        this._is_gameend = false;
    }

    changePlayer(): void {
        const temp = this._current_user;
        this._current_user = this._reserve_user;
        this._reserve_user = temp;
    }

    getCurrentUser(): User {
        return this._current_user;
    }

    currentUserToString(): string {
        return `${this._current_user.stone}`;
    }

    gameEnd(): void {
        this._is_gameend = true;
    }

    isGameEnd(): boolean {
        return this._is_gameend;
    }
}
