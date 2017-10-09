import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routing }      from './routes';

import { OfferTopic }   from './offer.topic';
import { OfferIndex }   from './offer.index';
import { OfferCategory } from './offer.category';
import { MerchantTopic } from './merchant.topic';
import { MerchantIndex } from './merchant.index';
import { MerchantList }  from './merchant.list';

import { SharedModule }  from '../common/shared.module';


export const COMPONENTS =
        [
            // FIXME: Actually We could use MerchantTopic as OfferTopic!!
            OfferTopic,
            OfferIndex,
            OfferCategory,
            MerchantTopic,
            MerchantIndex,
            MerchantList,
        ];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        routing,
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS,
})
export class ShoppingModule {}
