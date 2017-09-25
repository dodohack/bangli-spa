import { Routes, RouterModule } from '@angular/router';

import { OfferTopic }           from './offer.topic';
import { OfferIndex }           from './offer.index';

const routes: Routes = [
    { path: 'deal',        component: OfferIndex },
    { path: 'deal/:guid',  component: OfferTopic },
];

export const OfferRoutes = RouterModule.forChild(routes);
