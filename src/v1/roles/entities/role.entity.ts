import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Rule } from '../../rules/entities/rule.entity';

export enum RoleName {
  default = 'DEFAULT',
  user = 'USER',
  pharmacist = 'PHARMACIST',
  admin = 'ADMIN',
}

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    type: 'enum',
    enum: RoleName,
  })
  name: RoleName;

  @OneToMany((type) => Rule, (rule) => rule.role)
  rules: Rule[];

  // @OneToMany((type) => User, (user) => user.role)
  // users: User[];
}
