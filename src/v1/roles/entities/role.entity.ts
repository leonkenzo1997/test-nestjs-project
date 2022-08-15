import { User } from './../../users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Rule } from '../../rules/entities/rule.entity';

export enum RoleName {
  user = 'USER',
  admin = 'ADMIN',
}

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @OneToMany((type) => Rule, (rule) => rule.role)
  rules: Rule[];

  @OneToMany((type) => User, (user) => user.role)
  users: User[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
