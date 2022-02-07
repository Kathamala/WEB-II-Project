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

    if(movieName == null || movieName == '') return;

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

  async listMovies(userId: string, orderby: string, filterby: string, filteroption: string) {
    const wishlist = await this.wishlistModel.findById(userId);
    var movies: string[] = [];
    //var moviesNames: string[] = [];

    for(const movie of wishlist.movies){
      const movieInfo = await this.fetchMovieById(movie);

      const data = await firstValueFrom(
        movieInfo.pipe(map((response) => response.data)),
      );  

      movies.push(data);
    }

    //ORDER BY:
    if(orderby == 'name'){
      movies.sort(function (a, b) {
        if(a['Title'] > b['Title']) return 1;
        if(b['Title'] > a['Title']) return -1;
        return 0;
      }
      );
    }
    else if(orderby == 'critics'){
      movies.sort(function (a, b) {
        if(a['Metascore'] > b['Metascore']) return -1;
        if(b['Metascore'] > a['Metascore']) return 1;
        return 0;
      }
      );
    }
    else if(orderby == 'year'){
      movies.sort(function (a, b) {
        if(a['Year'] > b['Year']) return -1;
        if(b['Year'] > a['Year']) return 1;
        return 0;
      }
      );
    } 
    else if(orderby == 'runtime'){
      movies.sort(function (a, b) {
        if(a['Runtime'] > b['YeRuntimear']) return -1;
        if(b['Runtime'] > a['Runtime']) return 1;
        return 0;
      }
      );
    }   
           
    //FILTER BY:

    if(filterby == 'region'){
      return movies.filter(element => element['Country'].includes(filteroption));
    }
    else if(filterby == 'director'){
      return movies.filter(element => element['Director'].includes(filteroption));
    }

    return movies;
  }

  async deleteMovie(userId: string, movieName: string) {
    // fetch movie from omdbapi
    if(movieName == null || movieName == '') return;
    
    const movieInfo = await this.fetchMovie(movieName);

    const data = await firstValueFrom(
      movieInfo.pipe(map((response) => response.data)),
    );

    console.log(data.imdbID);

    const wishlist = await this.wishlistModel.findById(userId);

    const index = wishlist.movies.indexOf(data.imdbID);

    if (index != -1) {
      wishlist.movies.splice(index, 1);
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

  async fetchMovieById(movieId: string): Promise<Observable<AxiosResponse<any>>> {
    return this.httpService.get(
      `http://www.omdbapi.com/?apikey=3a6222e&i=${movieId}`,
    );
  }
}
