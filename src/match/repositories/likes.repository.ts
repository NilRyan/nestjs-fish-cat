import { LikesEntity } from '../entities/like.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(LikesEntity)
export class LikesRepository extends Repository<LikesEntity> {}
