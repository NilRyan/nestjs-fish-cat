import { Column, Entity } from 'typeorm';

@Entity('likes')
export class LikesEntity {
  @Column()
  userId: string;

  @Column()
  judgedUserId: string;

  @Column()
  like: boolean;
}
