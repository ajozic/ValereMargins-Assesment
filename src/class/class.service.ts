import { Injectable } from '@nestjs/common';
import { Class } from '@prisma/client';
import { DatabaseService } from 'src/db/db.service';
import { ClassDto, EditClassDto } from './dto';

@Injectable()
export class ClassService {

    constructor(private dbService: DatabaseService) {}

    // find class by id
    async findOne(id: number):Promise<Class> {
        const oneClass = await this.dbService.class.findUnique({
            where: {
                id: Number(id),
            }
        });
        return oneClass;
    }

    // find class by name
    async findByName(name: string): Promise<Class> {
        const sportClass = await this.dbService.class.findUnique({
            where: {
                name: name,
            }
        });
        return sportClass;
    }

    // find all classes
    async findAll(): Promise<Class[]> {
        const classArray = await this.dbService.class.findMany();
        return classArray;
    }

    // create new class 
    async createClass(dto: ClassDto) {
        const newClass = await this.dbService.class.create({
            data: {
                ...dto,
            }
        });
        return newClass;
    }

    // enroll user to the class
    async enroll(email: string, className: string): Promise<Class> {
        const enrolledClass = await this.dbService.class.update({
            where: {
                name: className,
            },
            data: {
                users: {
                    connect: {
                        email: email,
                    }
                }
            }
        })

        const enrolledUser = await this.dbService.user.update({
            where: {
                email: email,
            }, 
            data: {
                isEnrolled: true,
            }
        })
        console.log(enrolledUser.isEnrolled);
        return enrolledClass;
    }

    // un-enroll user from the class
    async unEnroll(email: string, className: string): Promise<Class> {
        const unEnrolledClass = await this.dbService.class.update({
            where: {
                name: className,
            },
            data: {
                users: {
                    disconnect: {
                        email: email,
                    }
                }
            }
        });
        const unEnrolledUser = await this.dbService.user.update({
            where: {
                email: email,
            }, 
            data: {
                isEnrolled: false,
            }
        })
        console.log(unEnrolledUser.isEnrolled);
        return unEnrolledClass;
    }

    // edit class
    async editClass(id: number, dto: EditClassDto) {
        const editedClass = await this.dbService.class.update({
            where: {
                id: Number(id),
            },
            data: {
                ...dto,
            }
        });
        return editedClass;
    }

    // rate class 1-5 and add comment
    async rateComment(name: string, rating: number, comment: string) {
        const ratingComment = await this.dbService.class.update({
            where: {
                name: name,
            },
            data: {
                rating: rating,
                comments: comment
            }
        })
        return console.log(`Rating for this class: ${ratingComment.rating}, Comments: ${ratingComment.comments}`);
    }

    // delete class
    async deleteClass(id: number) {
        await this.dbService.class.delete({
            where: {
                id: Number(id),
            }
        });
    }

}

