import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { WishlistModule } from './wishlist/wishlist.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017'),
    WishlistModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
