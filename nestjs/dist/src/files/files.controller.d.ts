/// <reference types="multer" />
import { StreamableFile } from '@nestjs/common';
import { FilesService } from './files.service';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    upload(photos: Express.Multer.File[]): string;
    getFile(id: string): StreamableFile;
}
