import { Field, InputType } from '@nestjs/graphql';

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

  @Field(() => Date, { nullable: true })
  dteCreatedAt: Date;

  @Field(() => Date, { nullable: true })
  dteUpdatedAt: Date;
}
