import { Body, Controller, Delete, Get, Param, ParseIntPipe, Put, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Role, User } from "@prisma/client";
import { GetUser } from "src/auth/decorator";
import { Roles } from "src/auth/decorator/role.decorator";
import { JwtGuard } from "src/auth/guard";
import { EditUserDto } from "./dto";


@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get('me')
    // using the custom decorator for the get method
    getMe(@GetUser() user: User) {
        console.log({
            user: user
        })
        return user;
    }
    
    @Get(':id')
    getUser(@Param('id') userId: number) {
        return this.usersService.findOne(userId);
    }

    // @Roles(Role.ADMIN) 
    // custom roles decorator not working
    @Get()
    getAllUsers() {
        return this.usersService.findAll();
    }
    
    @Put(':id')
    editUser(@Param('id') userId: number, @Body() dto: EditUserDto) {
        return this.usersService.editUser(userId, dto);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) userId: number) {
        return this.usersService.deleteUser(userId);
    }

}