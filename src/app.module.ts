import { PubSubModule } from './pub_sub/pubSub.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './database/database.config';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        playground: Boolean('GRAPHQL__PLAYGROUND'),
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        subscriptions: {
          'graphql-ws': true,
        },
      }),
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.production'],
      load: [databaseConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
    }),
    UsersModule,
    AuthModule,
    ChatModule,
    PubSubModule,
  ],
})
export class AppModule {}
