import EventEmitter from 'events';

class CustomEmitter extends EventEmitter {}

const eventEmitter = new CustomEmitter();

export default eventEmitter;
