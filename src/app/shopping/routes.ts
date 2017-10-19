import { Routes, RouterModule } from '@angular/router';

import { MerchantTopic }        from './merchant.topic';
import { MerchantIndex }        from './merchant.index';
import { MerchantList }         from './merchant.list';
import { OfferIndex }           from './offer.index';
import { OfferCategory }        from './offer.category';

const routes: Routes = [
    { path: 'merchant',       component: MerchantIndex },
    { path: 'merchant/:guid', component: MerchantTopic },
    { path: 'deal',           component: OfferIndex },
    { path: 'deal/list',      redirectTo: 'deal/list/all/1'},
    { path: 'deal/list/:filter/:page', component: MerchantList },
    { path: 'deal/cat/:slug',       component: OfferCategory },
    { path: 'deal/cat/:slug/:page', component: OfferCategory },

];

export const routing = RouterModule.forChild(routes);
