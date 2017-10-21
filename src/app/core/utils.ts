import { RouterStateSerializer }       from '@ngrx/router-store';
import { RouterStateSnapshot, Params, UrlSegment } from '@angular/router';
import {IMG_SERVER} from "../../../.config";

/**
 * The RouterStateSerializer takes the current RouterStateSnapshot and returns
 * pertinent information needed. The snapshot contains all information about
 * the state of the router at the given point in time. The entire snapshot
 * is complex and not always needed. In this case, we only need the URL and
 * query parameters from the snapshot in the store.
 */

export interface RouterStateUrl {
    //url: UrlSegment[];
    url: string;
    urlseg: UrlSegment[];
    params: Params;
    queryParams: Params;
}

export class CustomRouterStateSerializer
  implements  RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        const url     = routerState.url;
        const urlseg  = [...routerState.root.firstChild.url];
        const params  = routerState.root.firstChild.params;
        const queryParams = routerState.root.queryParams;

        return { url, urlseg, params, queryParams};
    }
}

/***************************************************************************
 * Other helper functions
 ****************************************************************************/

export function imageUrl(uri: string) {
    if (typeof uri === 'undefined' || uri === null || uri === '')
        return 'placeholder image';

    // Url starts from 'http'.
    if (uri[0] === 'h' && uri[1] === 't') return uri;

    // Relative uri, prefix with our base image server
    return IMG_SERVER + '/' + uri;
}