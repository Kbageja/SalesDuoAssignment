import { MeetingMinutes } from '../types';

export class Validator {
  static isValidMeetingMinutes(data: any): data is MeetingMinutes {
    if (!data || typeof data !== 'object') {
      return false;
    }

    const hasSummary = typeof data.summary === 'string' && data.summary.trim().length > 0;
    const hasDecisions = Array.isArray(data.decisions) && 
      data.decisions.every((d: any) => typeof d === 'string');
    const hasActionItems = Array.isArray(data.actionItems) &&
      data.actionItems.every((item: any) => 
        typeof item === 'object' && 
        typeof item.task === 'string' &&
        (item.owner === undefined || typeof item.owner === 'string') &&
        (item.due === undefined || typeof item.due === 'string')
      );

    return hasSummary && hasDecisions && hasActionItems;
  }

  static sanitizeJSON(text: string): string {
    // Remove markdown code blocks if present
    let cleaned = text.trim();
    
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json\s*/, '').replace(/```\s*$/, '');
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```\s*/, '').replace(/```\s*$/, '');
    }
    
    return cleaned.trim();
  }
}