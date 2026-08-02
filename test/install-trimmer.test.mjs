import assert from 'node:assert/strict'
import test from 'node:test'

import { installCopySelectionTrimmer } from '../src/install-trimmer.ts'

test('passes trimmed selection text to the existing copy implementation', () => {
    let copied = ''
    const frontend = {
        getSelection () {
            return 'first     \r\nsecond\t\r\nthird'
        },
        copySelection () {
            copied = this.getSelection()
        },
    }

    installCopySelectionTrimmer(frontend)
    frontend.copySelection()

    assert.equal(copied, 'first\r\nsecond\r\nthird')
})

test('restores getSelection immediately after each copy', () => {
    const originalGetSelection = function () {
        return 'value   '
    }
    const frontend = {
        getSelection: originalGetSelection,
        copySelection () {
            this.getSelection()
        },
    }

    installCopySelectionTrimmer(frontend)
    frontend.copySelection()

    assert.equal(frontend.getSelection, originalGetSelection)
    assert.equal(frontend.getSelection(), 'value   ')
})

test('returned cleanup restores the original copy implementation', () => {
    const originalCopySelection = function () {}
    const frontend = {
        getSelection () {
            return 'value   '
        },
        copySelection: originalCopySelection,
    }

    const cleanup = installCopySelectionTrimmer(frontend)
    cleanup()

    assert.equal(frontend.copySelection, originalCopySelection)
})
