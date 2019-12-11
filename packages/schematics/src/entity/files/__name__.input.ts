import { Field, InputType } from 'type-graphql';
import { MinLength, IsString } from 'class-validator';

@InputType()
export class <%= classify(name) %>Input {
  @Field({ nullable: true })
  @IsString()
  property: string;
}
