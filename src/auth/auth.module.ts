import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { PasswordService } from './utils.password-hash';
@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    PassportModule,
    JwtModule.register({
      secret: 'adcaerasdcasefr',
      signOptions: { expiresIn: '1h' },
    }),
    forwardRef(() => UsersModule),
  ],
  providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy, PasswordService],
  exports: [AuthService]
})
export class AuthModule { }
