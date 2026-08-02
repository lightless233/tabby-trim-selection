import assert from 'node:assert/strict'
import test from 'node:test'

import { trimSelectionText } from '../src/trim-selection.ts'

test('removes spaces and tabs at the end of every selected line', () => {
    const selection = 'docker-claude \\     \r\n  --profile deepseek\t\r\nfinished'

    assert.equal(
        trimSelectionText(selection),
        'docker-claude \\\r\n  --profile deepseek\r\nfinished',
    )
})

test('preserves leading whitespace, blank lines, line endings, and final newline', () => {
    const selection = '  first  \n\tsecond\t\n   \n'

    assert.equal(trimSelectionText(selection), '  first\n\tsecond\n\n')
})

test('leaves text without trailing horizontal whitespace unchanged', () => {
    const selection = 'first\r\nsecond\nthird'

    assert.equal(trimSelectionText(selection), selection)
})
