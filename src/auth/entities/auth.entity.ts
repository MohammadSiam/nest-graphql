import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('auth')
@ObjectType()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', width: 50, nullable: true })
  intUserId: number;

  @Column()
  strName: string;

  @Column()
  strEmail: string;

  @Column()
  strAddress: string;

  @Column()
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
