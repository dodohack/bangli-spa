/**
 * Data model of affiliates' offers
 * FIXME: Should be deprecated and use entity.ts instead. Probably not, cause
 * we only define the wanted entries of entity Offer here, we do not need to
 * define the full entries which matches what is in database.
 */

export interface OfferParams {

}

export interface Offer {
    id: number;
    channel_id: number;
    title: string;
    featured: boolean;
    display_url: string;
    tracking_url: string;
    vouchers: string;
    created_at: string;
    starts: string;
    ends: string;
}
