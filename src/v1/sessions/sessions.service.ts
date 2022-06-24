import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session, SessionStatus } from './entities/sessions.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionsRepository: Repository<Session>,
  ) {}

  async createSession(user: User): Promise<Session> {
    return await this.sessionsRepository.save({ user });
  }

  async findActiveSessionById(id: number): Promise<Session> {
    return await this.sessionsRepository.findOne({
      where: { id, status: SessionStatus.Active },
    });
  }
}
