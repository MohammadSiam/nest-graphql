import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  title: string;

  @Column({ nullable: true, default: '' })
  @Field({ nullable: true })
  content: string;

  @Column({ nullable: true, default: '' })
  @Field()
  category: string;

  @Column({ type: 'simple-array', nullable: true, default: '{}' })
  @Field(() => [String])
  tags: string[];

  @Column({ default: false })
  @Field()
  published: boolean;
}
