import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  node_env:process.env.NODE_ENV,
  database_url: process.env.DATABASE_URL,
  bcrypt_round_number: process.env.BCRYPT_ROUND_NUMBER,
  default_password: process.env.DEFAULT_PASSWORD,
  otp_secret: process.env.OTP_SECRET_TOKEN,
  app_user_name: process.env.APP_USER_NAME,
  app_pass_key: process.env.APP_PASS_KEY,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};
