import { Injectable } from '@angular/core'
import { BaseTerminalTabComponent, TerminalDecorator } from 'tabby-terminal'

import { installCopySelectionTrimmer } from './install-trimmer'

@Injectable()
export class TrimSelectionDecorator extends TerminalDecorator {
    private readonly cleanups = new Map<BaseTerminalTabComponent<any>, () => void>()

    attach (terminal: BaseTerminalTabComponent<any>): void {
        const frontend = terminal.frontend
        if (!frontend) {
            return
        }

        this.cleanups.get(terminal)?.()
        this.cleanups.set(terminal, installCopySelectionTrimmer(frontend))
    }

    detach (terminal: BaseTerminalTabComponent<any>): void {
        this.cleanups.get(terminal)?.()
        this.cleanups.delete(terminal)
        super.detach(terminal)
    }
}
