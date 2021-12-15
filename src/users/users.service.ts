import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
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

  async findOne(username: string): Promise<TUser | undefined> {
    return this.users.find(user => user.username === username);
  }

  //findOneId(id: string){
  //  return this.userModel.findOne(id);
  //}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
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

  remove(id: number) {
    return this.userModel.deleteOne({ _id: id }).exec();
  }
}