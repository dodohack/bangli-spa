/**
 * This is the header(below global channel menu), it shows different logo and
 * banners for different channels
 * NOTE: We name it site-header to avoid naming conflict with <header>
 */

import { Component }               from '@angular/core';
import { Input, Output }           from '@angular/core';
import { OnInit, OnDestroy }       from '@angular/core';
import { SimpleChanges, OnChanges }from '@angular/core';
import { ActivatedRoute }          from '@angular/router';
import { Router }                  from '@angular/router';
import { NavigationEnd }           from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef }       from '@angular/core';
import { Store }                   from '@ngrx/store';
import { Observable }              from 'rxjs/Observable';

import {
    AppState,/*
    getTopMenus,
    getMainMenus,
    getSubMenus,
    getSubMenuGids,
    getMainMenuRootId,
    getRootMenuIds,
    getMenus */}     from '../core/reducers';

@Component({
    selector: 'site-header',
    templateUrl: './site.header.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteHeader implements OnInit, OnDestroy
{
    // Variables used in template only
    menuidx: number;

    // Menu data retrieved from API server
    topMenus$:    Observable<any>;
    mainMenus$:   Observable<any>;

    rootMenuIds$: Observable<number[]>;
    menus$:       Observable<any>;

    subRootMenuIds: any;
    subMenuIds: any;
    subTypes: any;
    subMenus: any;
    subMenuUpdate: any;

    // Phase 1 menu: deal menu
    menus = [
        {url: '/deal', name: '优惠首页'},
        {url: '/deal/cat/beauty', name: '美妆优惠'},
        {url: '/deal/cat/healthcare', name: '医药保健'},
        {url: '/deal/list', name: '优惠导航'}
    ];

    constructor(private route: ActivatedRoute,
                private store: Store<AppState>,
                private cd: ChangeDetectorRef) {}

    ngOnInit() {/*
        this.topMenus$    = this.store.let(getTopMenus());
        this.mainMenus$   = this.store.let(getMainMenus());
        this.rootMenuIds$ = this.store.let(getRootMenuIds());
        this.menus$       = this.store.let(getMenus());*/
    }

    ngOnDestroy() {
        //this.subMenuUpdate.unsubscribe();
    }

    /*
    subMenus$(pid: number): Observable<any> {
        return this.store.let(getSubMenus(pid));

    }

    subMenuGids$(pid: number): Observable<number[]> {
        return this.store.let(getSubMenuGids(pid));
    }
    */
}
