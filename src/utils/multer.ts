import * as multer from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import { HttpException, HttpStatus } from '@nestjs/common';

export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};

export const fileUploadStorage = (dir: any = '/upload') => ({
    storage: multer.memoryStorage(),
});

export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return callback(
            new HttpException(
                'Only image files of type jpg, jpeg, and png are allowed!',
                HttpStatus.BAD_REQUEST,
            ),
            false,
        );

    }
    callback(null, true);
};

export const multerDestConfig = (req, file, cb) => (directory = 'default') => {
    const dest = '../images';
    const [month, day, year] = new Date()
        .toLocaleString('en', {
            day: '2-digit',
            year: 'numeric',
            month: '2-digit',
        })
        .split('/');
    const finalDest: string = [dest, directory, year, month, day].join('/');
    if (!fs.existsSync(finalDest)) {
        console.log(finalDest);
        fs.mkdirSync(finalDest, { recursive: true });
    }
    cb(null, finalDest);
};

//filename config for multer
export const multerFileNameConfig = (req, file, cb) => (type: string) => {
    cb(null, Date.now() + '-' + file.originalname);
};

//multer disk storage configuration
export const multerDiskStorageConfig = ({ path, type }: { path: string; type: string }) =>
    multer.diskStorage({
        destination: (req, file, cb) => multerDestConfig(req, file, cb)(path),
        filename: (req, file, cb) => multerFileNameConfig(req, file, cb)(type),
    });

export const deleteDocument = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
};

//supported image formats
export const supportedFiles = ['png', 'jpg', 'jpeg'];
