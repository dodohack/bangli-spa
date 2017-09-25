import { NgModule } from '@angular/core';
import { SharedModule } from '../directives/shared.module';

import { routing }         from './routing';
import { TravelChannel }   from './travel.channel';

@NgModule({
    imports: [ SharedModule, routing ],
    declarations: [
        TravelChannel
    ]
})
export class TravelModule {}
