import { Module } from '@nestjs/common';
import { <%= classify(name) %>Service } from './<%= name %>.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { <%= classify(name) %> } from './<%= name %>.entity';
import { <%= classify(name) %>Resolver } from './<%= name %>.resolver';

@Module({
  providers: [<%= classify(name) %>Service, <%= classify(name) %>Resolver],
  imports: [TypeOrmModule.forFeature([<%= classify(name) %>])],
  exports: [<%= classify(name) %>Service],
})
export class <%= classify(name) %>Module {}
