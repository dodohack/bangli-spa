/**
 * Load menu configurations
 */
import { Injectable }                    from '@angular/core';
import { HttpClient }                    from '@angular/common/http';
import { Effect, Actions }               from '@ngrx/effects';
import { Observable }                    from 'rxjs/Observable';

import { API }           from '../api';
import * as menu         from '../actions/menu';

@Injectable()
export class MenuEffects {
    constructor(private actions$: Actions,
                private http: HttpClient) { }

    @Effect() loadAll$ = this.actions$.ofType(menu.LOAD_MENU)
        .switchMap(() => this.getAll()
            .map(menus => new menu.LoadMenuSuccess(menus))
            .catch(() => Observable.of(new menu.LoadMenuFail(null)))
        );

    //////////////////////////////////////////////////////////////////////////
    // Private helper functions

    private getAll() {
        return this.http.get(API('desktop_menus'));
    }
}
