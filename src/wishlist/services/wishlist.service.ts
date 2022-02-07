import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Wishlist, WishlistDocument } from '../entities/wishlist.entity';
import { firstValueFrom, map, Observable } from 'rxjs';

@Injectable()
export class WishlistService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Wishlist.name) private wishlistModel: Model<WishlistDocument>,
  ) {}

  async addMovie(userId: string, movieName: string) {
    // fetch movie from omdbapi

    const movieInfo = await this.fetchMovie(movieName);

    const data = await firstValueFrom(
      movieInfo.pipe(map((response) => response.data)),
    );

    console.log(data.imdbID);

    const wishlist = await this.wishlistModel.findById(userId);

    if (wishlist.movies.indexOf(data.imdbID) === -1) {
      wishlist.movies.push(data.imdbID);
      wishlist.save();
    }

    return {
      userId,
      data,
    };
  }

  async fetchMovie(movieName: string): Promise<Observable<AxiosResponse<any>>> {
    return this.httpService.get(
      `http://www.omdbapi.com/?apikey=3a6222e&t=${movieName}`,
    );
  }
}
