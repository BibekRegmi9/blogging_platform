export class ImageUploadDto {
    post_id: number;

    fileObj: Express.Multer.File;
}

export interface UploadFileObject {
    originalname: string;
    buffer: Buffer;
    mimetype: string;
    size: string;
    path?: string;
  }
  