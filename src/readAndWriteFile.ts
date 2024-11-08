import path from 'path';
import { promises as fs } from 'fs';

const readFileContent = async (filename: string): Promise<string | void> => {
  const filePath = path.join(__dirname, filename);

  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return data;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      console.log('File Not Found');
    } else {
      console.log('Something Went Wrong', error);
    }
  }
};

// readFileContent('sample.txt').then(content => {
//   if (content) {
//     console.log('Content :', content);
//   }
// });

// it takes file path
// it takes content
// if path exists overides it
// if path does not exits create new file and logs

const writeFileContent = async (file: string, content: string) => {
  const baseDirectory = path.join(__dirname);
  const filePath = path.join(baseDirectory, file);

  try {
    await fs.writeFile(filePath, content);
    console.log('File written successfully');
  } catch (error) {
    console.log('something went wrong', error);
  }
};

// writeFileContent('sample1.txt', 'This is the content adding some new');

// parameter: file path
// content
// if file does not exits create one
// if file exits just append to it

const appendToFile = async (file: string, content: string) => {
  try {
    await fs.appendFile(path.join(__dirname, '..', file), content);
    console.log('File appened successfully');
  } catch (error) {
    console.error('Error in appending file', error);
  }
};

// appendToFile('sample1.txt', '\nThis is new line 5');

async function copyFileContent(
  sourcePath: string,
  destinationPath: string
): Promise<void> {
  try {
    const absSourcePath = path.resolve(sourcePath);
    const absDesPath = path.resolve(destinationPath);
    console.log(`Source Path: ${absSourcePath}`);
    console.log(`Destination Path: ${absDesPath}`);

    await fs.copyFile(absSourcePath, absDesPath);
    console.log('File copied successfully.');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      console.error('Source file not found.');
    } else {
      console.error('An error occurred while copying the file:', error);
    }
  }
}

// Usage
copyFileContent('', '../sample2.txt');
