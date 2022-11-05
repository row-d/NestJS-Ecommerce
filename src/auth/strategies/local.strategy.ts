import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  ClassSerializerInterceptor,
  Injectable,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return {
      email: user.email,
      id: user._id.toString(),
      role: user.role,
    };
  }
}
