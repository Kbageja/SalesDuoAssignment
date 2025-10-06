import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config';
import { MeetingMinutes } from '../types';
import { Logger } from '../utils/logger';
import {Validator} from '../utils/validator';

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    this.genAI = new GoogleGenerativeAI(config.geminiApiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }

  async extractMeetingMinutes(meetingText: string): Promise<MeetingMinutes> {
    try {
      const prompt = this.buildPrompt(meetingText);
      
      Logger.info('Sending request to Gemini API');
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      Logger.debug('Received response from Gemini API');

      return this.parseResponse(text);
    } catch (error: any) {
      Logger.error('Gemini API error', error);
      
      if (error.message?.includes('timeout')) {
        throw new Error('AI service timeout. Please try again.');
      }
      
      if (error.message?.includes('quota') || error.message?.includes('limit')) {
        throw new Error('API quota exceeded. Please try again later.');
      }
      
      throw new Error('Failed to process meeting notes with AI service.');
    }
  }

  private buildPrompt(meetingText: string): string {
    return `You are a meeting minutes extraction assistant. Analyze the following meeting notes and extract structured information.

Meeting Notes:
${meetingText}

IMPORTANT: You must respond ONLY with valid JSON. Do not include any explanations, markdown formatting, or extra text.

Extract the following and return as JSON:
1. A summary (2-3 sentences describing the main points discussed)
2. A list of key decisions made
3. A structured list of action items with:
   - task (required): the action to be taken
   - owner (optional): person responsible
   - due (optional): deadline or date

Return ONLY this JSON structure:
{
  "summary": "2-3 sentence summary here",
  "decisions": [
    "Decision 1",
    "Decision 2"
  ],
  "actionItems": [
    {
      "task": "Task description",
      "owner": "Person name",
      "due": "Date"
    }
  ]
}

If there are no decisions or action items, use empty arrays. Ensure all JSON is properly formatted and valid.`;
  }

  private parseResponse(text: string): MeetingMinutes {
    try {
      const cleanedText = Validator.sanitizeJSON(text);
      const parsed = JSON.parse(cleanedText);

      if (!Validator.isValidMeetingMinutes(parsed)) {
        throw new Error('Invalid response structure from AI');
      }

      return parsed;
    } catch (error: any) {
      Logger.error('Failed to parse AI response', error);
      
      if (error instanceof SyntaxError) {
        throw new Error('AI returned invalid JSON format. Please try again.');
      }
      
      throw new Error('Failed to parse AI response.');
    }
  }
}