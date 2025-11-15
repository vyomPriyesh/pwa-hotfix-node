// import path from 'path';
// import { fileURLToPath } from 'url';
// import "dotenv/config"; 
// const __filename = fileURLToPath(import.meta.url);
// export const __dirname = path.dirname(__filename);
// export const view = path.join(__dirname, 'Views');
// export const assetsUrl = path.join(__dirname, 'assets');
// export const baseUrl = process.env['BASE_URL']
// export const folderName = 'assets';



import path from 'path';
import { fileURLToPath } from 'url';
import "dotenv/config";
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export const view = path.join(__dirname, 'Views');
export const assetsUrl = path.join(__dirname, 'assets');
// export  const uploadPath = path.resolve(assetsUrl, '../', folderName);
export const folderName = 'assets';
export const baseUrl = process.env['BASE_URL']
export const uploadPath = path.join(os.tmpdir(), folderName);


