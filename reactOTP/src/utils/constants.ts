// Reads constant expressions as Studio Pro passes them to the preview and editorConfig (the expression text).
// No RegExp: editorConfig runs in Studio Pro's Jint engine, where some RegExp use throws uncatchable errors.

// "6" -> 6; anything that is not a whole number (an attribute, a calculation, empty) -> undefined.
export function constantInteger(expression: string | undefined): number | undefined {
    const text = (expression ?? "").trim();
    if (text === "") {
        return undefined;
    }
    let start = 0;
    if (text.charAt(0) === "-") {
        start = 1;
    }
    if (start === text.length) {
        return undefined;
    }
    for (let i = start; i < text.length; i++) {
        const c = text.charAt(i);
        if (c < "0" || c > "9") {
            return undefined;
        }
    }
    return parseInt(text, 10);
}

// "'abc'" -> "abc", "'it''s'" -> "it's"; anything that is not a single string literal -> undefined.
export function constantString(expression: string | undefined): string | undefined {
    const text = (expression ?? "").trim();
    if (text.length < 2 || text.charAt(0) !== "'" || text.charAt(text.length - 1) !== "'") {
        return undefined;
    }
    let result = "";
    for (let i = 1; i < text.length - 1; i++) {
        const c = text.charAt(i);
        if (c === "'") {
            if (text.charAt(i + 1) !== "'" || i + 1 === text.length - 1) {
                return undefined;
            }
            i++;
        }
        result += c;
    }
    return result;
}
