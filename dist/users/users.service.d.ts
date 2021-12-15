import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
export declare type TUser = any;
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    private readonly users;
    findOne(username: string): Promise<TUser | undefined>;
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    remove(id: number): Promise<import("mongodb").DeleteResult>;
}
