import { NgModule }       from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdFormFieldModule } from '@angular/material';
import { OfferRoutes }    from './routes';

import { OfferTopic }   from './offer.topic';
import { OfferIndex }   from './offer.index';
import { OfferCard }    from "./widgets/card";

export const COMPONENTS = [
    OfferCard,
    OfferTopic,
    OfferIndex,
];

@NgModule({
    imports: [FormsModule, ReactiveFormsModule, MdFormFieldModule, OfferRoutes],
    declarations: COMPONENTS,
    exports: COMPONENTS,
})
export class OfferModule {}
