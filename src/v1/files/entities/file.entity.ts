import { Product } from 'src/v1/products/entities/product.entity';
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

export enum FileStatus {
  Pending = 1,
  Active = 2,
  Removed = 3,
}

export enum UserGender {
  Male = 1,
  Female = 2,
}

@Entity({ name: 'files' })
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column('varchar', { length: 255 })
  key: string;

  @Column('varchar', { length: 255 })
  url: string;

  @Index()
  @Column({ type: 'enum', enum: FileStatus, default: FileStatus.Pending })
  status: FileStatus;

  @Column('varchar', { length: 255 })
  fileName: string;

  @Column('varchar', { length: 65 })
  mimeType: string;

  @ManyToOne(() => User, (user) => user.files, { nullable: false })
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
