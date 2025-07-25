import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('mail.mailHost'),
          secure: false,
          auth: {
            user: configService.get<string>('mail.mailUser'),
            pass: configService.get<string>('mail.mailPassword'),
          },
        },
        defaults: {
          from: `"Brickmate" <${configService.get<string>('mail.mailFrom')}>`,
        },
        template: {
          dir: join(__dirname, '..', '..', 'mail', 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ ConfigService ],
    }),
  ],
  providers: [ MailService ],
  exports: [ MailService ],
})
export class MailModule {
}
