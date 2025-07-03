import { CurrentUser } from '../auth/current-user.decorator';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ChatsService } from './chats.service';
import { Chat } from './entities/chat.entity';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { TokenPayload } from '../auth/token-payload.interface';

@Resolver(() => Chat)
export class ChatsResolver {
  constructor(private readonly chatsService: ChatsService) {}

  @Mutation(() => Chat)
  async createChat(
    @Args('createChatInput') createChatInput: CreateChatInput,
    @CurrentUser() user: TokenPayload,
  ): Promise<Chat> {
    return await this.chatsService.create(createChatInput, user._id);
  }

  @Query(() => [Chat], { name: 'chats' })
  async findAll(): Promise<Chat[]> {
    return await this.chatsService.findAll();
  }

  @Query(() => [Chat], { name: 'my_chats' })
  async findMyAll(@CurrentUser() user: TokenPayload): Promise<Chat[]> {
    return await this.chatsService.findMyAll(user._id);
  }

  @Query(() => Chat, { name: 'chat' })
  async findOne(
    @Args('_id', { type: () => String }) _id: string,
  ): Promise<Chat> {
    return await this.chatsService.findOne(_id);
  }

  @Mutation(() => Chat)
  async updateChat(
    @Args('updateChatInput') updateChatInput: UpdateChatInput,
    @CurrentUser() user: TokenPayload,
  ): Promise<Chat> {
    return await this.chatsService.update(
      updateChatInput._id,
      updateChatInput,
      user._id,
    );
  }

  @Mutation(() => Chat)
  async removeChat(
    @Args('_id', { type: () => String }) _id: string,
    @CurrentUser() user: TokenPayload,
  ): Promise<Chat> {
    return await this.chatsService.remove(_id, user._id);
  }
}
