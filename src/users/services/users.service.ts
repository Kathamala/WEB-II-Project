import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User, UserDocument } from '../entities/user.entity';
import { Model } from 'mongoose';
import {
  Wishlist,
  WishlistDocument,
} from 'src/wishlist/entities/wishlist.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Wishlist.name) private wishlistModel: Model<WishlistDocument>,
  ) {}

  async findOneAuth(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username }).exec();

    return {
      id: user._id.toString(),
      email: user.email,
      username: user.username,
      password: user.password,
    };
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    const createdWishlist = new this.wishlistModel(createdUser);

    createdWishlist.save();

    return createdUser.save();
  }

  findAll() {
    return this.userModel.find().exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel
      .findByIdAndUpdate(
        {
          _id: id,
        },
        {
          $set: updateUserDto,
        },
        {
          new: true,
        },
      )
      .exec();
  }

  remove(id: string) {
    return this.userModel.deleteOne({ _id: id }).exec();
  }
}
