import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, urlSchema } from './schemas/url.schema';
import { RedisCacheModule } from 'src/config/app-options.constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Url.name,
        schema: urlSchema
      }
    ]),
    RedisCacheModule
  ],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule { }
