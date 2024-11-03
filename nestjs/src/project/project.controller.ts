import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UpdateProjectPhotots } from './dto/update-project-photos.dto';
import { Public } from 'src/user/public.decorator';
import { UserIdentity } from 'src/user/user-identity.decorator';
import { userJwtPayload } from 'src/user/dto/user-jwt-paylaod.dto';
import { Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(
    @Body() createProjectDto: CreateProjectDto,
    @UserIdentity() user: userJwtPayload,
  ) {
    return this.projectService.create(createProjectDto, user);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @UseInterceptors(FilesInterceptor('photos', 5))
  @Post('photos')
  uploadPhotos(
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
    return photos;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }

  @Public()
  @Post('test')
  test(@Body() body: UpdateProjectPhotots) {
    return body;
  }

  @Public()
  @Post('pay')
  payForProject(@Res() res: Response) {
    return this.projectService.payForProject(res);
  }
  @Public()
  @Get('pay')
  getpayForProject(@Res() res: Response) {
    return this.projectService.payForProject(res);
  }

  @Get('sucsess-payment/:project/:user')
  sucess(@Param('project') project: number, @Param('user') user: number) {
    return this.projectService.sucsessPay(project, user);
  }

  @Public()
  @Get('cancel-payment')
  cancel() {
    return 'payment canceled';
  }
}
