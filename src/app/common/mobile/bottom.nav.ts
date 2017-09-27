/**
 * Bottom fixed nav bar for mobile website
 */

import {
    Component,
    Input,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
} from '@angular/core';

import { NgSwitch } from '@angular/common';

@Component({
    selector: 'bottom-nav',
    templateUrl: './bottom.nav.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottomNav
{
    // The type of navbar to show on different pages.
    @Input() navType: string;

    constructor(private cd: ChangeDetectorRef) {}
}