import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  title: string

  @Field()
  content: string

  @Field()
  category: string

  @Field(() => [String])
  tags: string[]

  @Field()
  published: boolean

  @Field({ nullable: true })
  success: boolean;
}
