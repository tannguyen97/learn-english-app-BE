// src/word-history/word-history.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WordHistory } from '../../schemas/word-history.schema';
import { AIService } from '../../core/ai/ai.service';

@Injectable()
export class WordsService {
  constructor(
    @InjectModel('WordHistory') private wordHistoryModel: Model<WordHistory>,
    private readonly aiService: AIService,
  ) {}

  async lookup(word: string) {
    try {
      const wordInfo = await this.wordHistoryModel.findOne({ word: word });

      if (!wordInfo) {
        const aiResponse = await this.aiService.process(word);
        const { definition, pronunciationUK, pronunciationUS, examples } =
          JSON.parse(aiResponse);
        const newSearch = new this.wordHistoryModel({
          word,
          definition: definition,
          pronunciationUK: pronunciationUK,
          pronunciationUS: pronunciationUS,
          examples: examples,
        });
        return await newSearch.save();
      }
      return wordInfo;
    } catch (error) {
      throw error;
    }
  }

  // Retrieve search history for a user
  async getHistory(): Promise<WordHistory[]> {
    return this.wordHistoryModel.find({}).sort({ createdAt: -1 }).exec();
  }

  async findByWord(word: string): Promise<WordHistory> {
    return this.wordHistoryModel.findOne({ word: word }).lean();
  }
}
