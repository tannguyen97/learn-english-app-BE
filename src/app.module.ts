import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WordsModule } from './api/words/words.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/english-learning'), // Replace with your MongoDB URL.
    WordsModule,
  ],
})
export class AppModule {}
