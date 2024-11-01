import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class DatabaseModule {
    private config;
    constructor(config: ConfigService);
    static register(option: string): DynamicModule;
}
