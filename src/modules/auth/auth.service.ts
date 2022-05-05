import { JwtService } from '@nestjs/jwt';
import { UserModel } from '../users/users.model';
import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { compare } from '../../resources/lib/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getOne({ email });
    const isMatch = user && compare(password, user.password);

    if (isMatch) return user;
  }

  async login(user: UserModel) {
    const payload = { ...user };

    return {
      user: { ...user, password: null },
      access_token: this.jwtService.sign({ item: payload }),
    };
  }

  verifyJwt(jwt: string): Promise<{ item: UserModel }> {
    return this.jwtService.verifyAsync(jwt);
  }
}
