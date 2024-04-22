import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => String)
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true, default: '' })
  content: string;

  @Column({ nullable: true, default: '' })
  category: string;

  @Column({ type: 'simple-array', nullable: true, default: '{}' })
  tags: string[];

  @Column()
  published: boolean;

}
