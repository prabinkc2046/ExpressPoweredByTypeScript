import { EventEmitter } from 'events';
import { CustomError } from '../interface/error.interface';
import { writeErrorLog } from './errorLogger.utils';

const eventEmiiter = new EventEmitter();

class Logger extends EventEmitter {
  log(message: string) {
    const timeStamp = new Date().toISOString();
    const log = `${timeStamp}\t${message}`;
    this.emit('log', log);
  }

  logError(error: CustomError) {
    const timeStamp = new Date().toISOString();
    const errorMessage = `${timeStamp}\t${error.name}\t${error.statusCode}\t${error.message}\n`;
    this.emit('error', errorMessage);
  }
}

const logger = new Logger();

logger.on('log', message => {
  console.log(message);
});

logger.on('error', errorMessage => {
  writeErrorLog(errorMessage);
});

export default logger;
