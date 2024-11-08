import { EventEmitter } from 'events';

const eventEmiiter = new EventEmitter();

class Logger extends EventEmitter {
  log(message: string) {
    const timeStamp = new Date().toISOString();
    const log = `${timeStamp}\t${message}`;
    this.emit('log', log);
  }
}

const logger = new Logger();

logger.on('log', message => {
  console.log(message);
});

export default logger;
