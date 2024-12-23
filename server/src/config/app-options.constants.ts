import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { RedisCacheService } from '../redis/redis-cache.service';


@Module({
    imports: [
        CacheModule.registerAsync({
            useFactory: () => ({
                store: redisStore as any,
                host: 'localhost',  
                port: 6379,        
            }),
        }),
    ],
    providers: [RedisCacheService],
    exports: [RedisCacheService],
})
export class RedisCacheModule { }
