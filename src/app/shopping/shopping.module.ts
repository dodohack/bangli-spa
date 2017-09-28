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

import { SharedModule }  from '../common/shared.module';
import { MatTabsModule }           from '@angular/material';

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
        SharedModule,
        MatTabsModule,
        routing,
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS,
})
export class ShoppingModule {}
