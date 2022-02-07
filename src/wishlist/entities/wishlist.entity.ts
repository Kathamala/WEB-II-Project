import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type WishlistDocument = Wishlist & Document;

@Schema()
export class Wishlist {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: string;

  @Prop()
  movies: string[];
}

export const WishlistSchema = SchemaFactory.createForClass(Wishlist);
