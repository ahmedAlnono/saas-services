import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UpdateProjectPhotots } from './dto/update-project-photos.dto';
import { userJwtPayload } from 'src/user/dto/user-jwt-paylaod.dto';
import { Response } from 'express';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    create(createProjectDto: CreateProjectDto, user: userJwtPayload): Promise<import("../models/project.model").Project>;
    findAll(): Promise<import("../models/project.model").Project[]>;
    update(id: string, updateProjectDto: UpdateProjectDto): string;
    remove(id: string): string;
    test(body: UpdateProjectPhotots): UpdateProjectPhotots;
    payForProject(res: Response): Promise<void>;
    getpayForProject(res: Response): Promise<void>;
    sucess(project: number, user: number): Promise<string>;
    cancel(): string;
}
