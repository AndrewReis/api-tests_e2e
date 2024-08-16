import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

import { app } from '@/app';

describe('Persist', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  })

  it('should be create a new user', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        name: 'Andrew',
        email: 'andrew@obi.tec.br'
      });

    expect(response.statusCode).toEqual(200);
  });
})