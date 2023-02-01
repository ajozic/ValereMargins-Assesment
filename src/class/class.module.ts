import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';

@Module({
    providers: [ClassService],
    controllers: [ClassController]
})
export class ClassModule {}
