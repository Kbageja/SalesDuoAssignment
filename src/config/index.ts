import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  nodeEnv: process.env.NODE_ENV || 'development',
};

export const validateConfig = (): void => {
  if (!config.geminiApiKey) {
    throw new Error('GEMINI_API_KEY is required in environment variables');
  }
};