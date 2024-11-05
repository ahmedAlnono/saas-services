import { Inject, Injectable } from '@nestjs/common';
import { CreateServiceProviderDto } from './dto/create-service-provider.dto';
import { UpdateServiceProviderDto } from './dto/update-service-provider.dto';
import { SERVICEPROVIDER_MODEL } from 'constants/constants';
import { ServiceProvider } from 'src/models/server-provider.model';

@Injectable()
export class ServiceProviderService {
  constructor(
    @Inject(SERVICEPROVIDER_MODEL)
    private serviceProvider: typeof ServiceProvider,
  ) {}
  async create(createServiceProviderDto: CreateServiceProviderDto) {
    const addProvider = await this.serviceProvider.create({
      ...createServiceProviderDto,
    });
    return `you'r id is ${addProvider.id}`;
  }

  async findAll() {
    const providers = await this.serviceProvider.findAll();
    return providers;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceProvider`;
  }

  update(id: number, updateServiceProviderDto: UpdateServiceProviderDto) {
    return `This action updates a #${id} serviceProvider`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceProvider`;
  }
}
