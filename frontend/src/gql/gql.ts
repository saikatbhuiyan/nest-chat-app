/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment ChatFragment on Chat {\n    _id\n    name\n    latestMessage {\n      ...MessageFragment\n    }\n  }\n": typeof types.ChatFragmentFragmentDoc,
    "\n  fragment MessageFragment on Message {\n    _id\n    content\n    createdAt\n    chatId\n    user {\n      _id\n      username\n      email\n    }\n  }\n": typeof types.MessageFragmentFragmentDoc,
    "\n  mutation CreateChat($createChatInput: CreateChatInput!) {\n    createChat(createChatInput: $createChatInput) {\n      ...ChatFragment\n    }\n  }\n": typeof types.CreateChatDocument,
    "\n  mutation CreateMessage($createMessageInput: CreateMessageInput!) {\n    createMessage(createMessageInput: $createMessageInput) {\n      ...MessageFragment\n    }\n  }\n": typeof types.CreateMessageDocument,
    "\n  mutation CreateUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n    }\n  }\n": typeof types.CreateUserDocument,
    "\n  query Chat($_id: String!) {\n    chat(_id: $_id) {\n      ...ChatFragment\n    }\n  }\n": typeof types.ChatDocument,
    "\n  query Chats($skip: Int!, $limit: Int!) {\n    chats(skip: $skip, limit: $limit) {\n      ...ChatFragment\n    }\n  }\n": typeof types.ChatsDocument,
    "\n  query Me {\n    me {\n      _id\n      email\n    }\n  }\n": typeof types.MeDocument,
    "\n  query Messages($chatId: String!, $skip: Int!, $limit: Int!) {\n    messages(chatId: $chatId, skip: $skip, limit: $limit) {\n      ...MessageFragment\n    }\n  }\n": typeof types.MessagesDocument,
    "\n  subscription messageCreated($chatIds: [String!]!) {\n    messageCreated(chatIds: $chatIds) {\n      ...MessageFragment\n    }\n  }\n": typeof types.MessageCreatedDocument,
};
const documents: Documents = {
    "\n  fragment ChatFragment on Chat {\n    _id\n    name\n    latestMessage {\n      ...MessageFragment\n    }\n  }\n": types.ChatFragmentFragmentDoc,
    "\n  fragment MessageFragment on Message {\n    _id\n    content\n    createdAt\n    chatId\n    user {\n      _id\n      username\n      email\n    }\n  }\n": types.MessageFragmentFragmentDoc,
    "\n  mutation CreateChat($createChatInput: CreateChatInput!) {\n    createChat(createChatInput: $createChatInput) {\n      ...ChatFragment\n    }\n  }\n": types.CreateChatDocument,
    "\n  mutation CreateMessage($createMessageInput: CreateMessageInput!) {\n    createMessage(createMessageInput: $createMessageInput) {\n      ...MessageFragment\n    }\n  }\n": types.CreateMessageDocument,
    "\n  mutation CreateUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n    }\n  }\n": types.CreateUserDocument,
    "\n  query Chat($_id: String!) {\n    chat(_id: $_id) {\n      ...ChatFragment\n    }\n  }\n": types.ChatDocument,
    "\n  query Chats($skip: Int!, $limit: Int!) {\n    chats(skip: $skip, limit: $limit) {\n      ...ChatFragment\n    }\n  }\n": types.ChatsDocument,
    "\n  query Me {\n    me {\n      _id\n      email\n    }\n  }\n": types.MeDocument,
    "\n  query Messages($chatId: String!, $skip: Int!, $limit: Int!) {\n    messages(chatId: $chatId, skip: $skip, limit: $limit) {\n      ...MessageFragment\n    }\n  }\n": types.MessagesDocument,
    "\n  subscription messageCreated($chatIds: [String!]!) {\n    messageCreated(chatIds: $chatIds) {\n      ...MessageFragment\n    }\n  }\n": types.MessageCreatedDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ChatFragment on Chat {\n    _id\n    name\n    latestMessage {\n      ...MessageFragment\n    }\n  }\n"): (typeof documents)["\n  fragment ChatFragment on Chat {\n    _id\n    name\n    latestMessage {\n      ...MessageFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MessageFragment on Message {\n    _id\n    content\n    createdAt\n    chatId\n    user {\n      _id\n      username\n      email\n    }\n  }\n"): (typeof documents)["\n  fragment MessageFragment on Message {\n    _id\n    content\n    createdAt\n    chatId\n    user {\n      _id\n      username\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateChat($createChatInput: CreateChatInput!) {\n    createChat(createChatInput: $createChatInput) {\n      ...ChatFragment\n    }\n  }\n"): (typeof documents)["\n  mutation CreateChat($createChatInput: CreateChatInput!) {\n    createChat(createChatInput: $createChatInput) {\n      ...ChatFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateMessage($createMessageInput: CreateMessageInput!) {\n    createMessage(createMessageInput: $createMessageInput) {\n      ...MessageFragment\n    }\n  }\n"): (typeof documents)["\n  mutation CreateMessage($createMessageInput: CreateMessageInput!) {\n    createMessage(createMessageInput: $createMessageInput) {\n      ...MessageFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Chat($_id: String!) {\n    chat(_id: $_id) {\n      ...ChatFragment\n    }\n  }\n"): (typeof documents)["\n  query Chat($_id: String!) {\n    chat(_id: $_id) {\n      ...ChatFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Chats($skip: Int!, $limit: Int!) {\n    chats(skip: $skip, limit: $limit) {\n      ...ChatFragment\n    }\n  }\n"): (typeof documents)["\n  query Chats($skip: Int!, $limit: Int!) {\n    chats(skip: $skip, limit: $limit) {\n      ...ChatFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      _id\n      email\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      _id\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Messages($chatId: String!, $skip: Int!, $limit: Int!) {\n    messages(chatId: $chatId, skip: $skip, limit: $limit) {\n      ...MessageFragment\n    }\n  }\n"): (typeof documents)["\n  query Messages($chatId: String!, $skip: Int!, $limit: Int!) {\n    messages(chatId: $chatId, skip: $skip, limit: $limit) {\n      ...MessageFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription messageCreated($chatIds: [String!]!) {\n    messageCreated(chatIds: $chatIds) {\n      ...MessageFragment\n    }\n  }\n"): (typeof documents)["\n  subscription messageCreated($chatIds: [String!]!) {\n    messageCreated(chatIds: $chatIds) {\n      ...MessageFragment\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;