import winston from 'winston';
import expressWinston from 'express-winston';
import { Request, Response } from 'express';


// Configure Winston logger
export const logger: any = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console()
  ]
});

// Define the custom ignore route function
const ignoreSwaggerDocsRoute = (req: Request, res: Response) => {
    return req.path.startsWith('/docs');
};

// Configure Express Winston middleware
export const expressLogger = expressWinston.logger({
  transports: [
      new winston.transports.Console()
  ],
  format: winston.format.combine(
      winston.format.json(),
      winston.format.timestamp(),
      winston.format.simple(),
  ),
  ignoreRoute: ignoreSwaggerDocsRoute,
  // Include all metadata
  meta: true,
  expressFormat: true,
  colorize: true,
  // Add the json response to the log
  responseWhitelist: [...expressWinston.responseWhitelist, 'body']
});
