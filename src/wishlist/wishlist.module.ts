import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { WishlistController } from './controllers/wishlist.controller';
import { Wishlist, WishlistSchema } from './entities/wishlist.entity';
import { WishlistService } from './services/wishlist.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Wishlist.name, schema: WishlistSchema },
    ]),
  ],
  controllers: [WishlistController],
  providers: [WishlistService],
})
export class WishlistModule {}
