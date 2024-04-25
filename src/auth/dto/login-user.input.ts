import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class LoginUserInput {
    @Field()
    strName: string;

    @Field()
    strPassword: string;
}