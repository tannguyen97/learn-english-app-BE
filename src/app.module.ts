import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WordsModule } from './api/words/words.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (configSerive: ConfigService) => ({
        uri: configSerive.get('MONGO_URL'),
      }),
    }),
    WordsModule,
  ],
})
export class AppModule {}
