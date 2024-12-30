import { Url } from '../schemas/url.schema';

export interface IUrlRepository {
    create(data: { shortId: string; url: string; userId: string }): Promise<Url>;
    findByShortId(shortId: string): Promise<Url | null>;
    incrementClicks(shortId: string): Promise<void>;
}
