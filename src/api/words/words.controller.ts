import { Controller, Get, Query } from '@nestjs/common';
import { WordsService } from './words.service';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsSerice: WordsService) {}

  @Get('lookup')
  async lookupWord(@Query('word') word: string) {
    return await this.wordsSerice.lookup(word);
  }

  @Get('history')
  async getUserHistory() {
    const history = await this.wordsSerice.getHistory();
    return history;
  }
}
