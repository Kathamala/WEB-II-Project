import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UsersModule, AuthModule,
    MongooseModule.forRoot('mongodb+srv://jupaka:Je3ysZzUmC8iyzn@cluster0.b0wav.mongodb.net/Cluster0?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
