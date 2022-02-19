import express from 'express';
import { prisma } from '../prisma/client';

const app = express();
const port = process.env.PORT || 8080;

app.get('/', async (_, res) => {
  const users = await prisma.user.findMany();
  await prisma.user.findMany();
  await prisma.user.findMany();
  await prisma.user.findMany();
  await prisma.user.findMany();
  await prisma.user.findMany();
  await prisma.user.findMany();
  await prisma.user.findMany();
  await prisma.user.findMany();
  await prisma.user.findMany();
  await prisma.user.findMany();
  await prisma.user.findMany();
  await prisma.user.findMany();
  await prisma.user.findMany();
  await prisma.user.findMany();
  res.send({
    message:
      'here are all the users, go to /create-user to create a random user and refresh this page',
    users,
  });
});

app.get('/create-user', async (_, res) => {
  const rand = Math.floor(Math.random() * 100);
  await prisma.user.create({
    data: {
      createdAt: new Date(),
      updatedAt: new Date(),
      email: `user-${rand}@example.com`,
      name: `User ${rand}`,
      password: '123456',
    },
  });
  res.send('Success! Go back to the root url to see the list of users!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
