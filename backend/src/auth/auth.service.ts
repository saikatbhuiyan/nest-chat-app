import { Injectable } from '@nestjs/common';
import { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { TokenPayload } from './token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User, response: Response): Promise<{ message: string }> {
    const tokenPayload: TokenPayload = {
      _id: user._id.toHexString(),
      email: user.email,
    };

    const expireTime = parseInt(
      this.configService.getOrThrow<string>('JWT_EXPIRATION_TIME'),
      10,
    );

    console.log(this.configService.getOrThrow<string>('JWT_EXPIRATION_TIME'));

    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + expireTime);

    const token = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow<string>('JWT_SECRET'),
      expiresIn: expireTime,
    });

    console.log(token);
    response.cookie('Authentication', token, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      expires,
    });

    return { message: 'Login successfully' };
  }

  verifyWs(request: Request): TokenPayload {
    const cookies: string[] = request.headers.cookie.split('; ');
    console.log('request.headers.cookie', request.headers.cookie);
    const authCookie = cookies.find((cookie) =>
      cookie.includes('Authentication'),
    );
    const jwt = authCookie.split('Authentication=')[1];
    return this.jwtService.verify(jwt);
  }

  logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });

    return { message: 'Logout successfully' };
  }
}
