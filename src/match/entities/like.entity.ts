import { BaseModel } from './../../common/base.model';
import { Column, Entity } from 'typeorm';

@Entity('likes')
export class LikesEntity extends BaseModel {
  @Column()
  userId: string;

  @Column()
  judgedUserId: string;

  @Column()
  like: boolean;
}
