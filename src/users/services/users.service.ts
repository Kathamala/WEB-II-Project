import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User, UserDocument } from '../entities/user.entity';
import { Model } from 'mongoose';

export type TUser = any;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){

  }

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      email: 'john@email.com',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      email: 'maria@email.com',
      password: 'guess',
    },
  ];

  
  async findOneAuth(username: string): Promise<TUser | undefined> {
    return this.users.find(user => user.username === username);
  }

  findOne(id: string){
    return this.userModel.findById(id);
  }

  create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find().exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateUserDto,
      },
      {
        new: true,
      }
    ).exec();
  }

  remove(id: string) {
    return this.userModel.deleteOne({ _id: id }).exec();
  }
}