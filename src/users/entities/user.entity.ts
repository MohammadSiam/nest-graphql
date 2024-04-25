import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('user')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  intId: number;

  @Column()
  @Field((type) => String)
  strName: string;

  @Column()
  @Field((type) => String)
  strEmail: string;

  @Column()
  @Field((type) => String)
  strAddress: string;

  @Column()
  @Field((type) => String)
  strPhone: string;
}
