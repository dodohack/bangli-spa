import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { MdFormFieldModule } from '@angular/material';

import { environment }   from '../../environments/environment';

import { routing }      from './routes';

import { OfferTopic }   from './offer.topic';
import { OfferIndex }   from './offer.index';
import { MerchantTopic } from './merchant.topic';
import { MerchantIndex } from './merchant.index';

import { OfferTopicM }   from './offer.topic.m';

export const COMPONENTS =
        [
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
