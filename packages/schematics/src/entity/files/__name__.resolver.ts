import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { <%= classify(name) %> } from './<%= name %>.entity';
import { <%= classify(name) %>Service } from './<%= name %>.service';
import { GetOneArgs } from '../common/args';
import { <%= classify(name) %>MutateOneArgs } from './<%= name %>.mutateOne.args';

@Resolver(of => <%= classify(name) %>)
export class <%= classify(name) %>Resolver {
  constructor(private readonly <%= name %>Service: <%= classify(name) %>Service) {}

  @Query(type => <%= classify(name) %>, {
    name: '<%= name %>',
  })
  async _<%= name %>(@Args() { id, key }: GetOneArgs): Promise<<%= classify(name) %>> {
    const <%= name %> = await this.<%= name %>Service.load(id, key);
    if (!<%= name %>) {
      throw new NotFoundException(id);
    }
    return <%= name %>;
  }

  @Query(type => [<%= classify(name) %>], {
    name: '<%= name %>s',
  })
  async _<%= name %>s(): Promise<<%= classify(name) %>[]> {
    return this.<%= name %>Service.loadAll();
  }

  @Mutation(returns => <%= classify(name) %>, {
    name: '<%= name %>',
  })
  async __<%= name %>(@Args() { <%= name %>, id }: <%= classify(name) %>MutateOneArgs) {
    const $<%= name %> = await this.<%= name %>Service.save(<%= name %>, id);
    if (!$<%= name %>) {
      throw new NotFoundException(id);
    }
    return $<%= name %>;
  }
}
