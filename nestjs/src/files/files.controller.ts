import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  StreamableFile,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Public } from 'src/user/public.decorator';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Public()
  @Post('upload')
  @UseInterceptors(FilesInterceptor('photos', 5))
  upload(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'image' }),
        ],
      }),
    )
    photos: Express.Multer.File[],
  ) {
    return `you uploaded ${photos.length} phtotos`;
  }
  @Public()
  @Post('upload-one')
  @UseInterceptors(FileInterceptor('photo'))
  uploadOne(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'image' }),
        ],
      }),
    )
    photo: Express.Multer.File,
  ) {
    return `you uploaded ${photo.filename}`;
  }

  @Public()
  @Get('get/:id')
  getFile(@Param('id') id: string) {
    const file = createReadStream(
      join(process.cwd(), `src/files/uploads/${id}`),
    );
    return new StreamableFile(file);
  }
}
