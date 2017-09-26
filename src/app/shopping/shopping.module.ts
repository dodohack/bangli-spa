import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { MdFormFieldModule } from '@angular/material';

import { routing }      from './routes';
import { OfferTopic }   from './offer.topic';
import { OfferIndex }   from './offer.index';
import { MerchantTopic } from './merchant.topic';
import { MerchantIndex } from './merchant.index';
import { OfferCard }    from "./widgets/card";

export const COMPONENTS = [
    OfferCard,
    // FIXME: Actually We could use MerchantTopic as OfferTopic!!
    OfferTopic,
    OfferIndex,
    MerchantTopic,
    MerchantIndex,
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        //MdFormFieldModule,
        routing,
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS,
})
export class ShoppingModule {}
