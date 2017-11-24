import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { BangliSpaModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// Skip ngZone completely as we don't need to run stuff outside angular space.
platformBrowserDynamic().bootstrapModule(BangliSpaModule, {ngZone: 'noop'})
  .catch(err => console.log(err));
