export function increment(n: number): number {
    return ++n;
}

export function incrementString(n: number): string {
    const result = ++n;
    return n.toString();
}
