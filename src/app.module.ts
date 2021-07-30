import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from './authentication/authentication.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { MedicationsModule } from './medications/medications.module';
import { UsersDetailsModule } from './users-details/users-details.module';
import { AlergiesModule } from './alergies/alergies.module';
import { UsersDetailAlergiesAlergyModule } from './users-detail-alergies-alergy/users-detail-alergies-alergy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    AuthenticationModule,
    UsersModule,
    MedicationsModule,
    UsersDetailsModule,
    AlergiesModule,
    UsersDetailAlergiesAlergyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
