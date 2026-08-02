import { trimSelectionText } from './trim-selection'

export interface SelectionFrontend {
    getSelection: () => string
    copySelection: () => void
}

export function installCopySelectionTrimmer (frontend: SelectionFrontend): () => void {
    const originalCopySelection = frontend.copySelection

    const wrappedCopySelection = () => {
        const originalGetSelection = frontend.getSelection
        frontend.getSelection = () => trimSelectionText(originalGetSelection.call(frontend))
        try {
            originalCopySelection.call(frontend)
        } finally {
            frontend.getSelection = originalGetSelection
        }
    }

    frontend.copySelection = wrappedCopySelection

    return () => {
        if (frontend.copySelection === wrappedCopySelection) {
            frontend.copySelection = originalCopySelection
        }
    }
}
