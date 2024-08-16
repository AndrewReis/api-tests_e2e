import 'dotenv/config';

import { unlink }      from 'node:fs/promises';
import crypto          from 'node:crypto';
import { join }        from 'node:path';
import { execSync }    from 'node:child_process';
import { Environment } from 'vitest/environments'

const __dirname     = process.cwd();
const directoryPath = join(__dirname, 'prisma');

function generateTestDatabase() {
  if(!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL does not exist!');
  }

  return `file:${directoryPath}/test-${crypto.randomUUID()}.db`;
}

export default <Environment> {
  name: 'prisma',
  transformMode: 'web',
  async setup() {
    const databaseFile = generateTestDatabase();
    process.env.DATABASE_URL = databaseFile;
    execSync('npx prisma migrate deploy');

    return {
      async teardown() {
        const [_, filename] = databaseFile.split(':');

        await unlink(filename);
        await unlink(`${filename}-journal`);
      }
    }
  }
}