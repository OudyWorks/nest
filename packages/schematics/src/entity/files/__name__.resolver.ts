import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { <%= classify(name) %> } from './<%= name %>.entity';
import { <%= classify(name) %>Service } from './<%= name %>.service';
import { GetOneArgs } from '../common/args';
import { <%= classify(name) %>MutateOneArgs } from './<%= name %>.mutateOne.args';

@Resolver(of => <%= classify(name) %>)
export class <%= classify(name) %>Resolver {
  constructor(private readonly <%= camelize(name) %>Service: <%= classify(name) %>Service) {}

  @Query(type => <%= classify(name) %>, {
    name: '<%= camelize(name) %>',
  })
  async _<%= camelize(name) %>(@Args() { id, key }: GetOneArgs): Promise<<%= classify(name) %>> {
    const <%= camelize(name) %> = await this.<%= camelize(name) %>Service.load(id, key);
    if (!<%= camelize(name) %>) {
      throw new NotFoundException(id);
    }
    return <%= camelize(name) %>;
  }

  @Query(type => [<%= classify(name) %>], {
    name: '<%= camelize(name) %>s',
  })
  async _<%= camelize(name) %>s(): Promise<<%= classify(name) %>[]> {
    return this.<%= camelize(name) %>Service.loadAll();
  }

  @Mutation(returns => <%= classify(name) %>, {
    name: '<%= camelize(name) %>',
  })
  async __<%= camelize(name) %>(@Args() { <%= camelize(name) %>, id }: <%= classify(name) %>MutateOneArgs) {
    const $<%= camelize(name) %> = await this.<%= camelize(name) %>Service.save(<%= camelize(name) %>, id);
    if (!$<%= camelize(name) %>) {
      throw new NotFoundException(id);
    }
    return $<%= camelize(name) %>;
  }
}
