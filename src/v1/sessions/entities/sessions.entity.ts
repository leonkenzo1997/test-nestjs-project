import { Max, Min } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';

export enum SessionStatus {
  Active = 1,
  Deactivated = 2,
}

@Entity({ name: 'sessions' })
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Min(1)
  @Max(2)
  @Column({ type: 'tinyint', default: SessionStatus.Active })
  status: SessionStatus;

  @Index()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.sessions)
  user: User;
}
