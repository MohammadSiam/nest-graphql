import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  strName: string;

  @Field()
  strPassword: string;

  @Field()
  strEmail: string;

  @Field()
  strAddress: string;

  @Field()
  strPhone: string;
}
