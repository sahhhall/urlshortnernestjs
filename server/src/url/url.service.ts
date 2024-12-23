import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Url } from './schemas/url.schema';
import { Model } from 'mongoose';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CreateUrlDTO } from './dto/create.dto';
import ShortUniqueId from 'short-unique-id';
import { RedisCacheService } from 'src/redis/redis-cache.service';

@Injectable()
export class UrlService {
    private uid: ShortUniqueId;
    constructor(@InjectModel(Url.name) private urlModel: Model<Url>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly redisCacheService: RedisCacheService
    ) {
        this.uid = new ShortUniqueId({ length: 6 })
    }

    async create(createUrlDto: CreateUrlDTO, userId: string) {
        const { url } = createUrlDto;
        const shortId = await this.generateUniqueShortId();

        await this.redisCacheService.setCache(shortId, url);

        await this.urlModel.create({
            shortId,
            url,
            userId,
        });

        const domain = process.env.DOMAIN || 'http://localhost:3000';

        return {
            shortUrl: `${domain}/${shortId}`,
        };
    }

    async get(shortId: string): Promise<string> {
        console.log(shortId, "shortId");

        const cachedUrl = await this.redisCacheService.getCache(shortId);
        console.log(cachedUrl,);

        if (cachedUrl) {
            await this.urlModel.updateOne({ shortId }, { $inc: { clicks: 1 } })
            return cachedUrl
        } else {
            throw new NotFoundException('URL not found');
        }
    }

    private async generateUniqueShortId(): Promise<string> {
        let shortId: string;
        let existInRedis: boolean;

        do {
            shortId = this.uid.randomUUID();
            existInRedis = await this.cacheManager.get(shortId)
        } while (existInRedis);

        return shortId;

    }
}
