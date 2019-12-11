import { EntityInterface } from '../common/interfaces';
import { Entity } from '../common/entities';
import { Entity as TypeORMEntity, ObjectIdColumn, Column } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@TypeORMEntity()
@ObjectType({ implements: EntityInterface })
export class <%= classify(name) %> extends Entity implements EntityInterface {
  @Column()
  @Field()
  property: string;
}
