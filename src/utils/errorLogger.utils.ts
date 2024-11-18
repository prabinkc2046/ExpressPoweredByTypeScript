import { join } from 'path';
import { appendFileSync, existsSync, mkdirSync } from 'fs';

const logDirectory = join(__dirname, '../logs');
console.log(logDirectory);

const errorLogPath = join(logDirectory, 'errors.log');

const ensureLogFileExists = () => {
  if (!existsSync(logDirectory)) {
    mkdirSync(logDirectory, { recursive: true });
  }

  if (!existsSync(errorLogPath)) {
    appendFileSync(errorLogPath, '', 'utf8');
  }
};

export const writeErrorLog = (errorMessage: string) => {
  try {
    appendFileSync(errorLogPath, errorMessage, 'utf8');
  } catch (fileError) {
    console.error('Failed to write to error log file', fileError);
  }
};
