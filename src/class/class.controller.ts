import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { ClassService } from './class.service';
import { ClassDto, EditClassDto } from './dto';

@UseGuards(JwtGuard)
@Controller('classes')
export class ClassController {

    constructor(private classService: ClassService) {}

    @Get(':id')
    getClass(@Param('id') id: number) {
        return this.classService.findOne(id);
    }

    @Get('/sports/:name')
    getClassBySport(@Param('name') name: string) {
        return this.classService.findByName(name);
    }

    @Get()
    getAllClasses() {
        return this.classService.findAll();
    }

    @Post()
    createClass(@Body() dto: ClassDto) {
        return this.classService.createClass(dto);
    }

    @Put('/enroll/:email/:name')
    enroll(@Param('email') email: string, @Param('name') name: string) {
        return this.classService.enroll(email, name);
    }

    @Put('/un-enroll/:email/:name')
    unEnroll(@Param('email') email: string, @Param('name') name: string) {
        return this.classService.unEnroll(email, name);
    }

    @Put(':name/:rating/:comment')
    rateAndComment(@Param('name') name: string, @Param('rating') rating: number, @Param('comment') comment: string) {
        return this.classService.rateComment(name, rating, comment);
    }

    @Put(':id')
    editClass(@Param('id') id: number, @Body() dto: EditClassDto) {
        return this.classService.editClass(id, dto);
    }

    @Delete(':id')
    deleteClass(@Param('id') id: number) {
        return this.classService.deleteClass(id);
    }
}
