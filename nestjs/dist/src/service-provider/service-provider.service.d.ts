import { CreateServiceProviderDto } from './dto/create-service-provider.dto';
import { UpdateServiceProviderDto } from './dto/update-service-provider.dto';
import { ServiceProvider } from 'src/models/server-provider.model';
export declare class ServiceProviderService {
    private serviceProvider;
    constructor(serviceProvider: typeof ServiceProvider);
    create(createServiceProviderDto: CreateServiceProviderDto): Promise<void>;
    findAll(): Promise<ServiceProvider[]>;
    findOne(id: number): string;
    update(id: number, updateServiceProviderDto: UpdateServiceProviderDto): string;
    remove(id: number): string;
}
