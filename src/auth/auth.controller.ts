import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthDto, LoginDto } from "./dto/auth.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('signup')
    signup (@Body() dto: AuthDto) {
        return this.authService.signup(dto);
    }

    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }
}