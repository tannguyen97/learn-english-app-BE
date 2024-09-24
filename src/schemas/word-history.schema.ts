// src/schemas/word-history.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WordHistoryDocument = HydratedDocument<WordHistory>;

@Schema({ timestamps: true })
export class WordHistory {
  @Prop()
  word: string;

  @Prop()
  definition?: string;

  @Prop()
  pronunciationUK?: string;

  @Prop()
  pronunciationUS?: string;

  @Prop()
  examples?: string[];
}

export const WordHistorySchema = SchemaFactory.createForClass(WordHistory);
