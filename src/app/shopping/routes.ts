import { Routes, RouterModule } from '@angular/router';

import { MerchantTopic }        from './merchant.topic';
import { MerchantIndex }        from './merchant.index';
import { OfferTopic }           from './offer.topic';
import { OfferIndex }           from './offer.index';
import { OfferCategory }        from './offer.category';

const routes: Routes = [
    // FIXME: Actually We could use MerchantTopic as OfferTopic!!
    { path: 'merchant',       component: MerchantIndex },
    { path: 'merchant/:guid', component: MerchantTopic },
    { path: 'deal',           component: OfferIndex },
    { path: 'deal/cat/:guid', component: OfferCategory },
    //{ path: 'deal/:guid',     component: OfferTopic },
];

export const routing = RouterModule.forChild(routes);
