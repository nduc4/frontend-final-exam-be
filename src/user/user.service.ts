import { Injectable, OnModuleInit } from '@nestjs/common';
import { SignInDto } from './dto/signIn.dto';
import { UserRepo } from 'src/user/data/user.repo';
import { SignUpDto } from './dto/signUp.dto';
import { User } from 'src/user/data/user.schema';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/common/enums/role.enum';
import { StringUtil } from 'src/common/utils/string.utils';
import { PageAbleDto } from 'src/common/dto/pageable.dto';
import { ObjectIdDto } from 'src/common/dto/objectId.dto';
import { UserUpdateInfoDto } from './dto/user-update-info.dto';

@Injectable()
export class UserService {
  constructor(
    private _userRepo: UserRepo,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(dto: SignInDto) {
    return this._userRepo.signIn(dto, this.jwtService);
  }

  async signUp(dto: SignUpDto): Promise<User> {
    return this._userRepo.signUp(dto);
  }

  async getAllUser(dto: PageAbleDto) {
    return await this._userRepo.getAllUser(dto);
  }

  async getOneUser(req): Promise<User> {
    return await this._userRepo.getOne({ email: req.user.email });
  }

  async updateUserInfo(dto: UserUpdateInfoDto, req): Promise<User> {
    if (dto.password) {
      dto.password = await this._userRepo.changePassword(dto.password);
    }
    await this._userRepo.updateById(req.user.sub, dto);
    return await this.getOneUser(req);
  }

  async deleteOneUser(dto: ObjectIdDto) {
    return await this._userRepo.deleteById(dto.id);
  }
}

@Injectable()
export class UserSeedService implements OnModuleInit {
  constructor(private readonly _userRepo: UserRepo) {}

  async onModuleInit() {
    await this.seedUser();
  }

  private async seedUser() {
    const userCount = await this._userRepo.count();
    if (userCount === 0) {
      const admin: User = {
        fullName: 'Trần Đình Phúc Đức',
        email: 'admin@example.com',
        role: UserRole.ADMIN,
        password: StringUtil.hashPassword(process.env.ADMIN_PASSWORD),
      };
      await this._userRepo.create(admin);
      const librarian: User = {
        fullName: 'Trần Đình Phúc Đức',
        email: 'librarian@example.com',
        role: UserRole.LIBRARIAN,
        password: StringUtil.hashPassword(process.env.ADMIN_PASSWORD),
      };
      await this._userRepo.create(librarian);
      const user: User = {
        fullName: 'Trần Đình Phúc Đức',
        email: 'user@example.com',
        role: UserRole.READER,
        password: StringUtil.hashPassword(process.env.ADMIN_PASSWORD),
      };
      await this._userRepo.create(user);
    }
  }
}
