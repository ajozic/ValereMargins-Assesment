import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto, LoginDto } from "./dto/auth.dto"; 
import * as argon from "argon2";

import { DatabaseService } from "src/db/db.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { EmailService } from "src/email/email.service";

@Injectable()
export class AuthService {
    constructor(
      private dbService: DatabaseService, 
      private jwt: JwtService,
      private config: ConfigService,
      private emailService: EmailService,
      ) {}

    // signup the user, hash the password and sign the jwt token
    async signup(dto: AuthDto) {
        // generate the hash
        const hash = await argon.hash(dto.password);

        // save the user to db
        try {
          const user = await this.dbService.user.create({
            data: {
              email: dto.email,
              hash,
              firstName: dto.firstName,
              lastName: dto.lastName,
              age: dto.age,
            }
          });

          // failed email verification attempt
          // await this.emailService.emailVerification(dto.email);

        return this.signToken(user.id, user.email, user.role);
  
        } catch (error) {
          if ( error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
              throw new ForbiddenException(
                'Credentials taken!'
              );
            }
            throw error;
          }
        }
    }

    // login the user, check if the passwords match, return signed jwt token
    async login(dto: LoginDto) {
      // find user by email 
      const user = await this.dbService.user.findUnique({
        where: {
          email: dto.email,
        }
      })

      //if !user throw error
      if(!user) {
        throw new ForbiddenException(
          'Credentials incorrect!'
        );
      }
      //compare password
      const passwordMatch = await argon.verify(user.hash, dto.password);

      //if !password throw error
      if(!passwordMatch) {
        throw new ForbiddenException(
          'Credentials incorrect!'
        );
      }

      //send back 
      console.log('You are logged in!')
      return this.signToken(user.id, user.email, user.role);
    }

    // sign jwt token secret and add expiration which creates the user on the req object 
    // with the added role for authorization check
    async signToken(userId: number, email: string, role: string): Promise<{access_token: string}> {
      const payload = {
        sub: userId,
        email: email,
        role: role
      }
      const secret = this.config.get('JWT_SECRET');

      const token = await this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret: secret
      });

      return {
        access_token: token
      }
    }
}