import fastify from "fastify";

import { connection } from "@/services/prisma";

export const app = fastify();

app.post('/users', async (req, res) => {
  const { name, email } = req.body;

  const user = await connection.users.create({
    data: {
      name: name,
      email: email
    }
  });

  return { user };
});