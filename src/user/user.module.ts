import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { ShareModule } from 'src/share/share.module';
import { UserSeedService, UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepo } from './data/user.repo';

@Module({
  imports: [ShareModule],
  providers: [
    UserService,
    UserRepo,
    UserSeedService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
