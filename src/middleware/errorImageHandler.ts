// middlewares/errorHandler.ts
import { Request, Response, NextFunction} from 'express';
import multer from 'multer';

export const errorImageHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {


  if (err instanceof multer.MulterError) {
    // 🔥 Cek kode limit
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({
        success: false,
        error: 'File size too large. Max 5MB allowed.',
        code: err.code,
      });
      return
    }

    if (err.code === 'LIMIT_FILE_COUNT') {
     res.status(400).json({
        success: false,
        error: 'Only 1 file is allowed',
        code: err.code,
      });
      return 
    }
  }


  if (err.code === 'INVALID_FILE_TYPE') {
    res.status(400).json({
      success: false,
      error: err.message,
      code: err.code,
    });
    return;
  }

  

};
