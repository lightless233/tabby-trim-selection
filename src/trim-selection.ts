export function trimSelectionText (text: string): string {
    return text.replace(/[ \t]+(?=\r?$)/gm, '')
}
