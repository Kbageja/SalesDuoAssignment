import app from './app';
import { config, validateConfig } from './config';
import { Logger } from './utils/logger';

const startServer = async (): Promise<void> => {
  try {
    // Validate configuration
    validateConfig();

    // Start server
    app.listen(config.port, () => {
      Logger.info(`🚀 Server running on port ${config.port}`);
      Logger.info(`📝 Environment: ${config.nodeEnv}`);
      Logger.info(`🔗 API Base URL: http://localhost:${config.port}/api`);
      Logger.info(`💡 Health Check: http://localhost:${config.port}/api/health`);
      Logger.info(`📮 Process Meeting: POST http://localhost:${config.port}/api/process-meeting`);
    });
  } catch (error) {
    Logger.error('Failed to start server', error);
    process.exit(1);
  }
};

startServer();