import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  WordHistory,
  WordHistorySchema,
} from '../../schemas/word-history.schema';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';
import { AIModule } from '../../core/ai/ai.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: WordHistorySchema, name: WordHistory.name },
    ]),
    AIModule,
  ],
  controllers: [WordsController],
  providers: [WordsService],
})
export class WordsModule {}
