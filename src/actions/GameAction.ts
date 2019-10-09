import { User } from "#/User";

let current_user: User;
let reserved_user: User;
let is_gameend: boolean = false;

export function entryPlayer(a: User, b: User): void {
    current_user  = a;
    reserved_user = b;
}

export function changePlayer(): void {
    const temp = current_user;
    current_user = reserved_user;
    reserved_user = temp;
}

export function getCurrentUser(): User {
    return current_user;
}

export function getCurrentTurn(): string {
    return `${current_user.stone}のターン`;
}

export function gameSet(): string {
    is_gameend = true;
    return `${current_user.stone}の勝利!`;
}

export function isGameEnd(): boolean {
    return is_gameend;
}
