/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { hash } from 'argon2';

dotenv.config();
const prisma = new PrismaClient();

const uuidGen = function generateUUID() {
  let d = new Date().getTime(),
    d2 =
      (typeof performance !== 'undefined' &&
        performance.now &&
        performance.now() * 1000) ||
      0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c == 'x' ? r : (r & 0x7) | 0x8).toString(16);
  });
};

async function createUser() {
  const user = await prisma.user.create({
    data: {
      uuid: uuidGen(),
      email: '',
      password: await hash(''),
      role: 'ADMIN',
      first_name: 'Имя',
      second_name: 'Фамилия',
      birth_day: '2000-01-01',
      phone_number: '+7(862)-847-36-48',
      verified: true,
      verifyToken: null,
    },
  });
  return user;
}

async function main() {
  await createUser();
  console.log('Start seeding...');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });