import { Module } from '@nestjs/common';
import { AIService } from './ai.service';
import { GeminiService } from './gemini-ai.service';

@Module({
  providers: [
    {
      provide: AIService,
      useClass: GeminiService,
    },
  ],
  exports: [AIService],
})
export class AIModule {}
