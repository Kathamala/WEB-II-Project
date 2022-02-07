import { Controller, Patch, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { WishlistService } from '../services/wishlist.service';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  // @UseGuards(JwtAuthGuard)
  @Patch()
  async addMovie(@Request() req) {
    console.log(req.body.movie);

    return this.wishlistService.addMovie(
      '620008a80e0ab7f5e57b2255',
      req.body.movie,
    );
  }
}
