import { randomBytes } from 'crypto';
import fs from 'fs';
import dotenv from 'dotenv';

export const generateJwtSecret = async () => {
    const jwtSecret = randomBytes(32).toString('hex');
    dotenv.config();

    const envContent = `\nJWT_SECRET="${jwtSecret}"`;
    fs.appendFileSync('.env', envContent);
    process.env.JWT_SECRET = jwtSecret;
}; 