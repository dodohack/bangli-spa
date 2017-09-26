import { Routes, RouterModule } from '@angular/router';

import { MerchantTopic }        from './merchant.topic';
import { MerchantIndex }        from './merchant.index';
import { OfferTopic }           from './offer.topic';
import { OfferIndex }           from './offer.index';

const routes: Routes = [
    // FIXME: Actually We could use MerchantTopic as OfferTopic!!
    { path: 'merchant',       component: MerchantIndex },
    { path: 'merchant/:guid', component: MerchantTopic },
    { path: 'deal',           component: OfferIndex },
    { path: 'deal/:guid',     component: OfferTopic },
];

export const routing = RouterModule.forChild(routes);
