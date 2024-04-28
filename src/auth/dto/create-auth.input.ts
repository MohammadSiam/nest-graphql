import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAuthInput {
  @Field()
  intUserId: number;

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

  @Field(() => Date, { nullable: true })
  dteCreatedAt: Date;

  @Field(() => Date, { nullable: true })
  dteUpdatedAt: Date;
}
