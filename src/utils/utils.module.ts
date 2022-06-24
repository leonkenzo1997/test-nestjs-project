import { Global, Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { ResponseService } from './response.service';
import { PaginateService } from './paginate.service';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [JwtModule],
  providers: [PasswordService, TokenService, ResponseService, PaginateService],
  exports: [PasswordService, TokenService, ResponseService, PaginateService],
})
export class UtilsModule {}
