import dotenv from 'dotenv';

dotenv.config();

const requiredEnv = ['PORT', 'MONGO_URI', 'JWT_SECRET'];

const checkEnv = () => {
  requiredEnv.forEach((key) => {
    if (!process.env[key]) {
      console.error(`Missing required environment variable: ${key}`);
      process.exit(1);
    }
  });
};

export default checkEnv;
