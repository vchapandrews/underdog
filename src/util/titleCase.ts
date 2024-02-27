export function toTitleCase(string: string | undefined) {
    if (!string) {
        return string;
    } else {
        return string[0].toUpperCase() + string.slice(1);
    }
}