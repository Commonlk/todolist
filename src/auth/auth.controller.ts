import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  @Post('signup')
  signup(@Body() dto: AuthDto) {}

  @Post('signin')
  signin(@Body() dto: AuthDto) {}
}
