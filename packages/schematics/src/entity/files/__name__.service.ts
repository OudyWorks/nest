import {
  UnprocessableEntityException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { <%= classify(name) %> } from './<%= name %>.entity';
import { <%= classify(name) %>Input } from './<%= name %>.input';
import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ObjectID } from 'mongodb';

@Injectable()
export class <%= classify(name) %>Service {
  @InjectRepository(<%= classify(name) %>)
  private readonly repository: Repository<<%= classify(name) %>>;

  async load(id: string, key?: string): Promise<<%= classify(name) %> | void> {
    if (!id) {
      return;
    }
    if (key) {
      return this.repository.findOne({
        [key]: id,
      });
    } else {
      return this.repository.findOne(ObjectID(id));
    }
  }

  async save(<%= camelize(name) %>: <%= classify(name) %>Input, id?: string): Promise<<%= classify(name) %> | void> {
    const $<%= camelize(name) %> = await this.load(id).then(instance => {
      if (id && !instance) {
        throw new NotFoundException(id);
      } else {
        return instance || new <%= classify(name) %>();
      }
    });
    const state = plainToClass(<%= classify(name) %>Input, <%= camelize(name) %>);
    await validateOrReject(state, {
      skipUndefinedProperties: !!$<%= camelize(name) %>.id,
      skipMissingProperties: !!$<%= camelize(name) %>.id,
    })
      .then(() => {
        Object.assign($<%= camelize(name) %>, state);
      })
      .catch(errors => {
        throw new UnprocessableEntityException(errors);
      });
    await this.repository.save($<%= camelize(name) %>).catch(error => {
      throw new InternalServerErrorException(error);
    });
    return $<%= camelize(name) %>;
  }

  loadAll() {
    return this.repository.find()
  }
}
