import { ServiceProviderService } from './service-provider.service';
import { CreateServiceProviderDto } from './dto/create-service-provider.dto';
import { UpdateServiceProviderDto } from './dto/update-service-provider.dto';
export declare class ServiceProviderController {
    private readonly serviceProviderService;
    constructor(serviceProviderService: ServiceProviderService);
    create(createServiceProviderDto: CreateServiceProviderDto): Promise<void>;
    findAll(): Promise<import("../models/server-provider.model").ServiceProvider[]>;
    findOne(id: string): string;
    update(id: string, updateServiceProviderDto: UpdateServiceProviderDto): string;
    remove(id: string): string;
}
