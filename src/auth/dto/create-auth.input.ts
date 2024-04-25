import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthInput {
  @Field()
  strName: string;

  @Field()
  strEmail: string;

  @Field()
  strAddress: string;

  @Field()
  strPhone: string;
}
