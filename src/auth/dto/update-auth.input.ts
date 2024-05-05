import { CreateAuthInput } from './create-auth.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthInput extends PartialType(CreateAuthInput) {
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
