import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './db/db.module';

import { UsersModule } from './users/users.module';
import { ClassService } from './class/class.service';
import { ClassController } from './class/class.controller';
import { ClassModule } from './class/class.module';
import { RolesGuard } from './auth/guard/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';

@Module({
  imports: [ 
    UsersModule,
    AuthModule, 
    DatabaseModule,
    ClassModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        auth: {
          user: 'apikey',
          pass: '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',
        }
      }
    }),
    ConfigModule.forRoot({isGlobal: true}),
    EmailModule,
  ],
  controllers: [AppController, ClassController],
  providers: [AppService, ClassService, EmailService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
})
export class AppModule {}
