/**
 * Bottom fixed nav bar for mobile website
 */

import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
} from '@angular/core';

import { MatRipple } from '@angular/material';

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

    @Output() menuToggle = new EventEmitter<boolean>();

    constructor(private cd: ChangeDetectorRef) {}

    openMenu() { this.menuToggle.emit(true); }
}