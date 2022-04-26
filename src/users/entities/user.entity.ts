import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import Role from '../../auth/enums/role.enum';
import Gender from '../enums/gender.enum';
import { BaseModel } from './../../common/base.model';

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
    nullable: true,
  })
  gender?: Gender;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;
}
