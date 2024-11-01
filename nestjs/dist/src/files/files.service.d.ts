import { StreamableFile } from '@nestjs/common';
import { User } from 'src/models/user.model';
export declare class FilesService {
    private user;
    constructor(user: typeof User);
    getUserPhoto(id: number): Promise<StreamableFile>;
}
