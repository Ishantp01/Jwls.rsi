import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from '../user/dto/login.dto';
import { JwtPayload } from '../../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    const payload: JwtPayload = {
      sub: user._id.toString(),
      email: user.email,
      shopId: user.shopId?.toString(),
      roles: user.roles,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        roles: user.roles,
      },
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    
    // TODO: Add proper password hashing comparison (bcrypt)
    if (user && user.password === password) {
      return user;
    }
    
    throw new UnauthorizedException('Invalid credentials');
  }

  async register(createUserDto: any) {
    // TODO: Hash password before saving
    return this.userService.create(createUserDto);
  }
}

