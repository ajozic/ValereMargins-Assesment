import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Query } from '@nestjs/common';

@Injectable()
export class EmailService {

    constructor(private mailService: MailerService) {}

    async emailVerification(email: string) {
        await this.mailService.sendMail({
            to: email,
            from: 'univerzalni123@gmail.com',
            subject: 'Verification Code',
            text: 'You are verified!'
        });
        return 'Email with verification code sent!'
    }
}
