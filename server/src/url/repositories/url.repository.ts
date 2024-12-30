import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url } from '../schemas/url.schema';
import { IUrlRepository } from '../interfaces/url.repository.interface';

@Injectable()
export class UrlRepository implements IUrlRepository {
    constructor(@InjectModel(Url.name) private readonly urlModel: Model<Url>) { }

    async create(data: { shortId: string; url: string; userId: string }): Promise<Url> {
        return this.urlModel.create(data);
    }

    async findByShortId(shortId: string): Promise<Url | null> {
        return this.urlModel.findOne({ shortId });
    }

    async incrementClicks(shortId: string): Promise<void> {
        await this.urlModel.updateOne({ shortId }, { $inc: { clicks: 1 } });
    }
}