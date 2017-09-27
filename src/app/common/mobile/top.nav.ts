/**
 * Top optional-fixed nav bar for mobile website
 */

import {
    Component,
    Input,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
} from '@angular/core';

import { NgSwitch } from '@angular/common';

@Component({
    selector: 'top-nav',
    templateUrl: './top.nav.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopNav
{
    // The type of navbar to show on different pages.
    @Input() navType: string;

    constructor(private cd: ChangeDetectorRef) {}
}
