import { Request, Response, NextFunction } from 'express';
import { GeminiService } from '../services/geminiService';
import { Logger } from '../utils/logger';
import { ApiResponse, MeetingMinutes } from '../types';

export class MeetingController {
  private geminiService: GeminiService;

  constructor() {
    this.geminiService = new GeminiService();
  }

  processMeeting = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      let meetingText: string;

      // Check if file was uploaded
      if (req.file) {
        meetingText = req.file.buffer.toString('utf-8');
        Logger.info('Processing meeting notes from uploaded file');
      } 
      // Check if text was sent in body
      else if (req.body.text) {
        meetingText = req.body.text;
        Logger.info('Processing meeting notes from request body');
      } 
      else {
        res.status(400).json({
          success: false,
          error: 'No meeting notes provided. Send either a .txt file or "text" in request body.',
        } as ApiResponse<null>);
        return;
      }

      // Validate input
      if (!meetingText || meetingText.trim().length === 0) {
        res.status(400).json({
          success: false,
          error: 'Meeting notes cannot be empty.',
        } as ApiResponse<null>);
        return;
      }

      // Process with Gemini
      const result = await this.geminiService.extractMeetingMinutes(meetingText);

      Logger.info('Successfully processed meeting notes');

      const response: ApiResponse<MeetingMinutes> = {
        success: true,
        data: result,
      };

      res.status(200).json(response);
    } catch (error: any) {
      Logger.error('Error in processMeeting controller', error);
      next(error);
    }
  };

  healthCheck = (req: Request, res: Response): void => {
    res.status(200).json({
      success: true,
      message: 'Meeting Minutes Extractor API is running',
      timestamp: new Date().toISOString(),
    });
  };
}