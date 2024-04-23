import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => String)
  id: string;

  @Column()
  @Field((type) => String)
  title: string;

  @Column({ nullable: true, default: '' })
  @Field((type) => String)
  content: string;

  @Column({ nullable: true, default: '' })
  @Field((type) => String)
  category: string;

  @Column({ type: 'simple-array', nullable: true, default: '{}' })
  @Field((type) => [String])
  tags: string[];

  @Column()
  @Field((type) => Boolean)
  published: boolean;
}

@ObjectType()
export class DeleteResponse {
  @Field()
  message: string;
}
