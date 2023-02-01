import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { DatabaseService } from "src/db/db.service";
import { EditUserDto } from "./dto";

@Injectable()
export class UsersService {

    constructor(private dbService: DatabaseService) {}

    // find user by id
    async findOne(userId: number): Promise<User> {
        const user = await this.dbService.user.findUnique({
            where: {
                id: Number(userId),
            }
        });
        delete user.hash;
        return user;
    }

    // find all users
    async findAll(): Promise<User[]> {
        const users = await this.dbService.user.findMany();
        users.forEach(user => {
            delete user.hash;
        });
        return users;   
    }

    // edit user
    async editUser(userId: number, dto: EditUserDto): Promise<User> {
        const user = await this.dbService.user.update({
            where: {
                id: Number(userId),
            },
            data: {
                ...dto,
            }
        });
        delete user.hash;
        return user;
    }

    // delete user
    async deleteUser(userId: number) {
        const user = await this.dbService.user.delete({
            where: {
                id: Number(userId),
            }
        })
    }

}
