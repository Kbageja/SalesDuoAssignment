export interface ActionItem {
  task: string;
  owner?: string;
  due?: string;
}

export interface MeetingMinutes {
  summary: string;
  decisions: string[];
  actionItems: ActionItem[];
}

export interface ProcessMeetingRequest {
  text?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}