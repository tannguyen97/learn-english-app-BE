import { Injectable } from '@nestjs/common';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { AIService } from './ai.service';

@Injectable()
export class GeminiService implements AIService {
  private model: GenerativeModel;

  constructor() {
    const genAi = new GoogleGenerativeAI(
      'AIzaSyB2Oeal0k8jtA_DrBmmOYzABbphz3Nrps8',
    );
    this.model = genAi.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async process(word: string): Promise<any> {
    const prompt = `
      Provide the definition, pronunciation (both UK and US), and usage examples for the word "${word}" in the following JSON format: {
        "definition": "",
        "pronunciationUK": "",
        "pronunciationUS": "",
        "examples": []
      }`;
    const rs = await this.model.generateContent(prompt);

    return rs.response.text().replace(/```json|```/g, '');
  }
}
