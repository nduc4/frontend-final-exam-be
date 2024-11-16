import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepo } from 'src/common/base/repo';
import { SignUpDto } from 'src/user/dto/signUp.dto';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { StringUtil } from 'src/common/utils/string.utils';
import { SignInDto } from 'src/user/dto/signIn.dto';
import { PageAbleDto } from 'src/common/dto/pageable.dto';
import { User } from './user.schema';
import { FilterUserDto } from '../dto/filter-user.dto';

export class UserRepo extends BaseRepo<User> {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {
    super(userModel);
  }

  async signUp(dto: SignUpDto): Promise<User> {
    const userIsExist = await this.findUser(dto);

    if (userIsExist) {
      throw new ConflictException('Email đã tồn tại');
    }

    const hashedPassword = StringUtil.hashPassword(dto.password);
    dto.password = hashedPassword;
    return await this.create(dto);
  }

  async signIn(dto: SignInDto, jwtService) {
    const user = await this.findUser(dto);

    if (!user || !StringUtil.comparePassword(dto.password, user.password)) {
      throw new UnauthorizedException('Sai email hoặc mật khẩu');
    }

    const payload = {
      sub: user._id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    };

    return {
      access_token: await jwtService.signAsync(payload),
    };
  }

  async findUser(dto): Promise<User> {
    return await this.getOne({ email: dto.email });
  }

  async getAllUser(dto: FilterUserDto) {
    const query = {};

    if (dto.email) {
      query['email'] = StringUtil.queryLike(dto.email);
    }
    if (dto.fullname) {
      query['fullname'] = StringUtil.queryLike(dto.fullname);
    }
    if (dto.address) {
      query['address'] = StringUtil.queryLike(dto.address);
    }

    const totalDocuments = await this.count(query);
    const totalPages = Math.ceil(totalDocuments / dto.limit);
    const data = await this.getPage(dto, query);

    return {
      totalPages,
      totalDocuments,
      data,
    };
  }

  async changePassword(newPassword: string) {
    return StringUtil.hashPassword(newPassword);
  }
}
