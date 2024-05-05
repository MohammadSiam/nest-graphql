import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('user')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int, { nullable: true })
  intId: number;

  @Column()
  @Field((type) => String)
  strName: string;

  @Column({ nullable: true })
  @Field((type) => String, { nullable: true })
  strPassword: string;

  @Column()
  @Field((type) => String)
  strEmail: string;

  @Column()
  @Field((type) => String)
  strAddress: string;

  @Column()
  @Field((type) => String)
  strPhone: string;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date, { nullable: true })
  dteCreatedAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date, { nullable: true })
  dteUpdatedAt: Date;
}
