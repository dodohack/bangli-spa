import { Component }   from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
    selector: '',
    templateUrl: './offer.index.html'
})
export class OfferIndex
{
    offerFormControl = new FormControl('', []);
}
