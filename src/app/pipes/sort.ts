/**
 * Sort an array of object by given object property
 */

import { Pipe } from "@angular/core";

@Pipe({
    name: "sort"
})
export class ArraySortPipe {
    transform(array: any[], field: string): any {
        let newAry = [...array];
        newAry.sort((a: any, b: any) => {

            // Special case: null
            if (a[field] == null)
                return 1; // Put a to the rear of array

            if (b[field] == null)
                return -1; // Put b to the rear of array

            if (a[field] < b[field]) {
                return 1;  // Put b to the front of array
            } else if (a[field] > b[field]) {
                return -1; // Put a to the front of array
            }

            return 0;
        });

        return newAry;
    }
}
