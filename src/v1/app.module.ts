import { Module } from '@nestjs/common';
import { AppRoute } from './app.route';
import { AuthModule } from './auth/auth.module';
import { S3Module } from './s3/s3.module';
import { SessionsModule } from './sessions/sessions.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // RulesModule,
    // RolesModule,
    AppRoute,
    AuthModule,
    UsersModule,
    SessionsModule,
    S3Module,
  ],
})
export class AppModule {
  // empty
}
