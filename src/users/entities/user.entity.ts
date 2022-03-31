import { BaseModel } from './../../common/base.model';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import Role from '../../auth/enums/role.enum';
import Gender from '../enums/gender.enum';

@Entity('users')
export class UserEntity extends BaseModel {
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  aboutMe: string;

  @Column()
  naame: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;
}
