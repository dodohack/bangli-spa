import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { routing }      from './routes';

import { OfferIndex }   from './offer.index';
import { OfferCategory } from './offer.category';
import { MerchantTopic } from './merchant.topic';
import { MerchantIndex } from './merchant.index';
import { MerchantList }  from './merchant.list';

import { SharedModule }  from '../common/shared.module';


export const COMPONENTS = [
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
    providers: [{
        provide: HAMMER_GESTURE_CONFIG,
        useClass: HammerGestureConfig
    }],
    declarations: COMPONENTS,
    exports: COMPONENTS,
})
export class ShoppingModule {}
