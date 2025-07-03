import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { ChatsRepository } from './chats.repository';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatsService {
  constructor(private readonly chatsRepository: ChatsRepository) {}

  async create(
    createChatInput: CreateChatInput,
    userId: string,
  ): Promise<Chat> {
    return this.chatsRepository.create({
      ...createChatInput,
      userId,
      userIds: createChatInput.userIds || [],
    });
  }

  async findAll(): Promise<Chat[]> {
    return this.chatsRepository.find({});
  }

  async findMyAll(userId: string): Promise<Chat[]> {
    return this.chatsRepository.find({ userId });
  }

  async findOne(_id: string): Promise<Chat> {
    const chat = await this.chatsRepository.findOne({ _id });
    if (!chat) throw new NotFoundException('Chat not found');
    return chat;
  }

  async update(
    _id: string,
    updateChatInput: UpdateChatInput,
    userId: string,
  ): Promise<Chat> {
    const chat = await this.chatsRepository.findOneAndUpdate(
      { _id, userId },
      { ...updateChatInput },
    );
    if (!chat) throw new NotFoundException('Chat not found or not authorized');
    return chat;
  }

  async remove(_id: string, userId: string): Promise<Chat> {
    const chat = await this.chatsRepository.findOneAndDelete({ _id, userId });
    if (!chat) throw new NotFoundException('Chat not found or not authorized');
    return chat;
  }
}
