import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UrlModule } from './url/url.module';
import config from './config/config';
import { CacheModule } from '@nestjs/cache-manager';


@Module({
  imports: [
    CacheModule.register({
      isGlobal:true
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config]
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config) => ({
        secret: config.get('jwt.secret'),
        signOptions: { expiresIn: '1d' },
      }),
      global: true,
      inject: [ConfigService]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config) => ({
        uri: config.get('database.connectionString')
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UrlModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
