import { Injectable } from '@nestjs/common';
import { Cache } from '@nestjs/cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(private readonly cacheManager: Cache) {}

  async setCache(key: string, value: any): Promise<void> {
    await this.cacheManager.set(key, value); 
  }

  async getCache(key: string): Promise<any> {
    return await this.cacheManager.get(key);
  }

  async deleteCache(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }
}
