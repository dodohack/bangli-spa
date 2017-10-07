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

@Component({
    selector: 'top-nav',
    templateUrl: './top.nav.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopNav
{
    // The type of navbar to show on different pages.
    @Input() navType: string;
    @Output() menuToggle = new EventEmitter<boolean>();

    constructor(private cd: ChangeDetectorRef) {}

    openMenu() { this.menuToggle.emit(true); }
}
