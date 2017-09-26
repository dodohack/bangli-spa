import { Component }         from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Store }             from '@ngrx/store';

import { AppState }          from '../core/reducers';

@Component({ templateUrl: './travel.channel.html' })
export class TravelChannel implements OnInit, OnDestroy
{
    // hard coded slides
    slides = [
        { active: false, title: '旅游景点1', image: 'http://placehold.it/1120x300?text=全屏景点大图' },
        { active: false, title: '旅游景点2', image: 'http://placehold.it/1120x300?text=全屏景点大图' },
        { active: false, title: '旅游景点3', image: 'http://placehold.it/1120x300?text=全屏景点大图' },
    ];


    ngOnInit() {}
    ngOnDestroy() {}
}
