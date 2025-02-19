import { Logger, NotFoundException } from '@nestjs/common';
import { AbstractDocument } from './abstract.schema';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const newDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await newDocument.save()).toJSON() as unknown as TDocument;
  }

  async findAll(): Promise<TDocument[]> {
    return this.model.find().exec();
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model
      .findOne(filterQuery, {}, { lean: true })
      .exec();

    if (!document) {
      this.logger.warn(
        `Document not found with filterQuery: ${JSON.stringify(filterQuery)}`,
      );
      throw new NotFoundException(`Document not found`);
    }

    return document as TDocument;
  }

  async findById(id: Types.ObjectId): Promise<TDocument> {
    const document = await this.model.findById(id, {}, { lean: true }).exec();
    if (!document) {
      this.logger.warn(`Document not found with id: ${id}`);
      throw new NotFoundException(`Document not found`);
    }

    return document as TDocument;
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    const document = await this.model
      .find(filterQuery, {}, { lean: true })
      .exec();

    if (!document) {
      this.logger.warn(
        `Document not found with filterQuery: ${JSON.stringify(filterQuery)}`,
      );
      throw new NotFoundException(`Document not found`);
    }

    return document as TDocument[];
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const updatedDocument = await this.model
      .findOneAndUpdate(
        filterQuery,
        { ...update, updatedAt: new Date() },
        { lean: true, new: true },
      )
      .exec();

    if (!updatedDocument) {
      this.logger.warn(
        `Document not found with filterQuery: ${JSON.stringify(filterQuery)}`,
      );
      throw new NotFoundException(`Document not found`);
    }

    return updatedDocument as TDocument;
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    const deletedDocument = await this.model
      .findOneAndDelete(filterQuery, { lean: true })
      .exec();

    if (!deletedDocument) {
      this.logger.warn(
        `Document not found with filterQuery: ${JSON.stringify(filterQuery)}`,
      );
      throw new NotFoundException(`Document not found`);
    }

    return deletedDocument as TDocument;
  }
}
