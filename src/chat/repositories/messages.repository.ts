import { MessagesEntity } from './../entities/messages.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(MessagesEntity)
export class MessagesRepository extends Repository<MessagesEntity> {}
