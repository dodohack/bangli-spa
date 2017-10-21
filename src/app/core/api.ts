/**
 * API endpoint where all the data comes from.
 */

import { API_SERVER } from '../../../.config';

const ENDPOINT = {

    // Batch(group) entities
    batch:    '/batch',

    // Cms topics
    topics:   '/topics',

    // Cms posts
    posts:    '/posts',

    // Affiliate advertisers' offers
    offers:   '/offers',

    pages:    '/pages',

    comments: '/comments',

    advertises: '/advertises',
};

export function API(ep: string) {
    // FIXME: hardcode endpoint
    return API_SERVER + ENDPOINT[ep];
}
