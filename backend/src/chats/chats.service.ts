import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { ChatsRepository } from './chats.repository';
import { PipelineStage, Types } from 'mongoose';
import { PaginationArgs } from '../common/dto/pagination-args.dto';

@Injectable()
export class ChatsService {
  constructor(private readonly chatsRepository: ChatsRepository) {}

  async create(createChatInput: CreateChatInput, userId: string) {
    return this.chatsRepository.create({
      ...createChatInput,
      userId,
      messages: [],
    });
  }

  async findMany(
    prePipelineStages: PipelineStage[] = [],
    paginationArgs?: PaginationArgs,
  ) {
    const chats = await this.chatsRepository.model.aggregate([
      ...prePipelineStages,
      {
        $set: {
          latestMessage: {
            $cond: [
              '$messages',
              { $arrayElemAt: ['$messages', -1] },
              {
                createdAt: new Date(),
              },
            ],
          },
        },
      },
      { $sort: { 'latestMessage.createdAt': -1 } },
      { $skip: paginationArgs.skip },
      { $limit: paginationArgs.limit },
      { $unset: 'messages' },
      {
        $lookup: {
          from: 'users',
          localField: 'latestMessage.userId',
          foreignField: '_id',
          as: 'latestMessage.user',
        },
      },
    ]);
    chats.forEach((chat) => {
      if (!chat.latestMessage?._id) {
        delete chat.latestMessage;
        return;
      }
      chat.latestMessage.user = chat.latestMessage.user[0];
      delete chat.latestMessage.userId;
      chat.latestMessage.chatId = chat._id;
    });
    return chats;
  }

  async countChats() {
    return this.chatsRepository.model.countDocuments({});
  }

  async findOne(_id: string) {
    const chats = await this.findMany([
      { $match: { chatId: new Types.ObjectId(_id) } },
    ]);
    if (!chats[0]) {
      throw new NotFoundException(`No chat was found with ID ${_id}`);
    }
    return chats[0];
  }

  update(_id: string, updateChatInput: UpdateChatInput) {
    return this.chatsRepository.findOneAndUpdate(
      { _id },
      { ...updateChatInput },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
