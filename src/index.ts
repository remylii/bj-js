function hello(): string {
    return `Hello`;
}

const elem = document.querySelector(".app");
if (!!elem) {
    elem.innerHTML = hello();
}
