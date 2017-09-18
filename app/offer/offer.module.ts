import { NgModule }     from '@angular/core';

import { OfferRoutes }  from './routes';

import { OfferTopic }   from './offer.topic';
import { OfferIndex }   from './offer.index';

export const COMPONENTS = [
    OfferTopic,
    OfferIndex,
];

@NgModule({
    imports: [OfferRoutes],
    declarations: COMPONENTS,
    exports: COMPONENTS,
})
export class OfferModule {}
