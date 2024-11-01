import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UpdateProjectPhotots } from './dto/update-project-photos.dto';
import { Public } from 'src/user/public.decorator';
import { UserIdentity } from 'src/user/user-identity.decorator';
import { userJwtPayload } from 'src/user/dto/user-jwt-paylaod.dto';
import { Response } from 'express';

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

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.projectService.findOne(+id);
  // }

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
