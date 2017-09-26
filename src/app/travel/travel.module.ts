import { NgModule } from '@angular/core';
import { SharedModule } from '../common/shared.module';

import { routing }         from './routes';
import { TravelChannel }   from './travel.channel';

@NgModule({
    imports: [ SharedModule, routing ],
    declarations: [
        TravelChannel
    ]
})
export class TravelModule {}
