import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: true }) // Also Enable timestamps
export class AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  // Optional, as Mongoose will handle this
  @Prop({ type: Date })
  createdAt: Date;

  // Optional, as Mongoose will handle this
  @Prop({ type: Date })
  updatedAt: Date;
}
