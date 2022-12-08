import dotenv from 'dotenv';
import { prisma } from './prismaInit';

dotenv.config();

const connection = async () => {
  await prisma.$connect().then(() => {
    console.log(`DB connected successfully`);
  });
};

export default connection;
