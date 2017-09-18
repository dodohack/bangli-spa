/**
 * This is popup full screen search modal like vouchercodes.co.uk, but we
 * support more includes offers, merchants, articles etc.
 */

import { Component }               from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

@Component ({
    selector: 'search-modal',
    templateUrl: './search.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchModal
{

}
