import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUrlDTO } from './dto/create.dto';
import ShortUniqueId from 'short-unique-id';
import { RedisCacheService } from 'src/redis/redis-cache.service';
import { IUrlRepository } from './interfaces/url.repository.interface';

@Injectable()
export class UrlService {
    private uid: ShortUniqueId;
    constructor(@Inject('IUrlRepository') private readonly urlRepository: IUrlRepository,
        private readonly redisCacheService: RedisCacheService
    ) {
        this.uid = new ShortUniqueId({ length: 6 })
    }

    async create(createUrlDto: CreateUrlDTO, userId: string) {
        const { url } = createUrlDto;
        const shortId = await this.generateUniqueShortId();

        await this.redisCacheService.setCache(shortId, url);

        await this.urlRepository.create({
            shortId,
            url,
            userId,
        });

        const domain = process.env.DOMAIN;

        return {
            shortUrl: `${domain}/${shortId}`,
        };
    }

    async get(shortId: string): Promise<string> {
        console.log(shortId, "shortId");

        const cachedUrl = await this.redisCacheService.getCache(shortId);
        console.log(cachedUrl,);

        if (cachedUrl) {
            await this.urlRepository.incrementClicks(shortId);
            return cachedUrl;
        }

        throw new NotFoundException('URL not found');
    }

    private async generateUniqueShortId(): Promise<string> {
        let shortId: string;
        let existInRedis: boolean;

        do {
            shortId = this.uid.randomUUID();
            existInRedis = await this.redisCacheService.getCache(shortId)
        } while (existInRedis);

        return shortId;

    }
}
