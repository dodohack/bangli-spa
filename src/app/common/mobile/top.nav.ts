/**
 * Top optional-fixed nav bar for mobile website
 */

import {
    Component,
    Input,
    Output,
    EventEmitter,
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
    @Output() barToggle = new EventEmitter<boolean>();

    constructor(private cd: ChangeDetectorRef) {}

    barOpen() { this.barToggle.emit(true); }
}
