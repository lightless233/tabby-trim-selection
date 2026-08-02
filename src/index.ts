import { NgModule } from '@angular/core'
import { TerminalDecorator } from 'tabby-terminal'

import { TrimSelectionDecorator } from './decorator'

@NgModule({
    providers: [
        {
            provide: TerminalDecorator,
            useClass: TrimSelectionDecorator,
            multi: true,
        },
    ],
})
export default class TrimSelectionModule {}
