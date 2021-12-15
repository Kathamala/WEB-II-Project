import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
export declare type TUser = any;
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    private readonly users;
    findOneAuth(username: string): Promise<TUser | undefined>;
    findOne(id: string): import("mongoose").Query<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }, User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }, {}, UserDocument>;
    create(createUserDto: CreateUserDto): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    findAll(): Promise<(User & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    remove(id: string): Promise<import("mongodb").DeleteResult>;
}
