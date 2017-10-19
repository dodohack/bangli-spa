import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Title }             from '@angular/platform-browser';
import { Observable }        from 'rxjs/Rx';
import { Store }             from '@ngrx/store';

import { ENTITY, Entity }    from './models';
import * as fromEntities     from './reducers';

import * as EntityActions from '../core/actions/entity';

export abstract class EntityBase implements OnInit, OnDestroy
{
    subEntity: any;
    subParams:  any;
    //channel$:    Observable<Channel>;
    //categories$: Observable<Category[]>;
    // TODO: Should we provide a specific type 'Topic[]' or just 'Entity[]'?
    topics$:     Observable<Entity[]>;
    entity$:     Observable<Entity>;
    // In page navigation, hash anchor
    fragment$:   Observable<string>;

    constructor(protected etype: string,
                protected route: ActivatedRoute,
                protected store: Store<fromEntities.AppState>,
                protected title: Title) { }

    ngOnInit() {
        this.fragment$ = this.route.fragment;

        switch (this.etype) {
            case ENTITY.TOPIC:
                this.entity$ = this.store.select(fromEntities.getCurTopic);
                break;
            case ENTITY.OFFER:
                this.entity$ = this.store.select(fromEntities.getCurOffer);
                break;
            case ENTITY.POST:
                this.entity$ = this.store.select(fromEntities.getCurPost);
                break;
            default:
                console.error("ERROR: Unhandled entity type!");
                break;
        }

        this.subEntity = this.entity$.filter(e => e!= null)
            .subscribe(e => { this.setTitle(e); });

        this.dispatchLoadEntity();
    }

    ngOnDestroy() {
        this.subParams.unsubscribe();
        this.subEntity.unsubscribe();
    }

    // FIXME: We should utilize ngrx/router-store as single truth of source.
    // FIXME: So we can listen to url changes in effects and dispatch actions
    // FIXME: from effects as well.
    // REF: https://blog.nrwl.io/using-ngrx-4-to-manage-state-in-angular-applications-64e7a1f84b7b
    dispatchLoadEntity() {
        this.subParams = this.route.params.distinctUntilChanged()
            .filter(params =>
            params.hasOwnProperty('id') || params.hasOwnProperty('guid'))
            .subscribe(params => {
                let id = params['id'] || params['guid'];
                let payload = { etype: this.etype, data: id };
                this.store.dispatch(new EntityActions.LoadEntity(payload));
            });
    }

    /**
     * Set html title
     * @param e
     */
    setTitle(e: Entity) {
        let t: string;
        switch (this.etype) {
            case ENTITY.TOPIC:
                t = '[专题] ' + e.title;
                if (e.title_cn) t += ' - ' + e.title_cn;
                break;

            default:
                t = e.title;
                break;
        }
        
        t  += ' - 英国邦利';

        this.title.setTitle(t);
    }
}
