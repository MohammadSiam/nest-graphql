import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field({ nullable: true })
  strName: string;

  @Field({ nullable: true })
  strPassword: string;

  @Field({ nullable: true })
  strEmail: string;

  @Field({ nullable: true })
  strAddress: string;

  @Field({ nullable: true })
  strPhone: string;

  @Field(() => Date, { nullable: true })
  dteUpdatedAt: Date;
}
