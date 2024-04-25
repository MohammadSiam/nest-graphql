import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('auth')
@ObjectType()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  strName: string;

  @Column()
  strEmail: string;

  @Column()
  strAddress: string;

  @Column()
  strPhone: string;
}
