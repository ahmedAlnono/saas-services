import { Module } from '@nestjs/common';
import { ServiceProviderService } from './service-provider.service';
import { ServiceProviderController } from './service-provider.controller';
import { ModelsProviders } from 'src/user/user.provider';

@Module({
  controllers: [ServiceProviderController],
  providers: [ServiceProviderService, ...ModelsProviders],
})
export class ServiceProviderModule {}
