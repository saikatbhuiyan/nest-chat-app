import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: true })
@ObjectType({ isAbstract: true })
export class AbstractEntity {
  @Prop({ type: SchemaTypes.ObjectId })
  @Field(() => ID)
  _id: Types.ObjectId;

  //   // Optional, as Mongoose will handle this
  //   @Prop({ type: Date })
  //   @Field()
  //   createdAt: Date;

  //   // Optional, as Mongoose will handle this
  //   @Prop({ type: Date })
  //   @Field()
  //   updatedAt: Date;
}
