import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';

// Multer upload options
export const multerUploadImageOptions = {
  // Enable file size limits
  limits: {
    fileSize: 30 * 1024 * 1024, //30MB,
  },
  // Check the mimetypes to allow for upload
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      cb(
        new BadRequestException(
          `Unsupported file type ${extname(file.originalname)}`,
        ),
        false,
      );
    }
  },
};

export const multerPdfOptions = {
  // Enable file size limits
  limits: {
    fileSize: 30 * 1024 * 1024, //30MB,
  },
  // Check the mimetypes to allow for upload
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(pdf)$/)) {
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      cb(
        new BadRequestException(
          `Unsupported file type ${extname(file.originalname)}`,
        ),
        false,
      );
    }
  },
};
