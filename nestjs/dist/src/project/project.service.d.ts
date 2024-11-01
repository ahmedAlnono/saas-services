import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from 'src/models/project.model';
import { User } from 'src/models/user.model';
import { userJwtPayload } from 'src/user/dto/user-jwt-paylaod.dto';
import { Response } from 'express';
export declare class ProjectService {
    private project;
    private user;
    private stripe;
    constructor(project: typeof Project, user: typeof User);
    create(createProjectDto: CreateProjectDto, user: userJwtPayload): Promise<Project>;
    findAll(): Promise<Project[]>;
    findOne(id: number): string;
    update(id: number, updateProjectDto: UpdateProjectDto): string;
    remove(id: number): string;
    payForProject(res: Response): Promise<void>;
    sucsessPay(project: number, user: number): Promise<string>;
}
