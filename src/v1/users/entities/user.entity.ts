import { Wholesale } from './../../wholesales/entities/wholesale.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';

import { instanceToPlain } from 'class-transformer';
import { Session } from '../../sessions/entities/sessions.entity';
import { File } from '../../files/entities/file.entity';
import { Max, Min } from 'class-validator';

export enum UserStatus {
  Pending = 1,
  Active = 2,
  Deactivated = 3,
  Blocked = 4,
}

export enum UserGender {
  Male = 1,
  Female = 2,
}

export enum UserRole {
  Any = 0,
  User = 1,
  Pharmacist = 2,
  Admin = 3,
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Min(1)
  @Max(3)
  @Column({ type: 'tinyint' })
  role: UserRole;

  @Index()
  @Min(1)
  @Max(4)
  @Column({ type: 'tinyint', default: UserStatus.Active })
  status: UserStatus;

  @Column('varchar', { length: 320 })
  email: string;

  @Column('varchar', { length: 255 })
  password: string;

  // @OneToOne(() => File)
  // @JoinColumn()
  // avatar: File;

  // @Index({ unique: true })
  // @Column('varchar', { length: 255 })
  // username: string;

  // @Column('varchar', { length: 255 })
  // fullName: string;

  // @Index()
  // @Column('varchar', { length: 65 })
  // phoneNumber: string;

  // @Index()
  // @Column({ type: 'enum', enum: UserGender })
  // gender: UserGender;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  
  @OneToMany((session) => Session, (session) => session.user)
  sessions: Session[];

  @OneToMany(type => Wholesale, wholesale => wholesale.user)
  wholesales: Wholesale[];
  
  @OneToMany((file) => File, (file) => file.createdBy)
  files: Session[];

  // @ManyToOne((type) => Role, (role) => role.users, { nullable: false })
  // role: Role;

  toJSON() {
    const result = instanceToPlain(this);
    delete result.password;

    return result;
  }
}
