import { ChatsEntity } from './../../chat/entities/chats.entity';
import { BaseModel } from './../../common/base.model';
import { Column, Entity, ManyToOne } from 'typeorm';
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
  name: string;

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
