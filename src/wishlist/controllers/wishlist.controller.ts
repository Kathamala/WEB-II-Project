import { Controller, Delete, Get, Patch, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { WishlistService } from '../services/wishlist.service';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  // @UseGuards(JwtAuthGuard)
  @Patch()
  async addMovie(@Request() req) {
    console.log(req.body.movie);
    console.log("ADD MOVIE");

    return this.wishlistService.addMovie(
      '620132c1bc5fcc15e8c0e3c7',
      req.body.movie,
    );
  }

  @Get()
  async listMovies(@Request() req) {
    console.log("LIST MOVIES")

    if(req.body.orderby) console.log("orderby: " + req.body.orderby);
    if(req.body.filterby) console.log("filterby: " + req.body.filterby);
    if(req.body.filteroption) console.log("filterby: " + req.body.filteroption);

    return this.wishlistService.listMovies(
      '620132c1bc5fcc15e8c0e3c7',
      req.body.orderby,
      req.body.filterby,
      req.body.filteroption
    );
  }

  @Delete()
  async deleteMovie(@Request() req) {
    console.log(req.body.movie);
    console.log("DELETE MOVIE");

    return this.wishlistService.deleteMovie(
      '620132c1bc5fcc15e8c0e3c7',
      req.body.movie
    );
  }  
}
