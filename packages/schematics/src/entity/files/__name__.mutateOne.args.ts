import { <%= classify(name) %>Input } from './<%= name %>.input';
import { ID, ArgsType, Field } from 'type-graphql';

@ArgsType()
export class <%= classify(name) %>MutateOneArgs {
  @Field(of => <%= classify(name) %>Input)
  <%= camelize(name) %>: <%= classify(name) %>Input;

  @Field(of => ID, { nullable: true })
  id: string;
}
