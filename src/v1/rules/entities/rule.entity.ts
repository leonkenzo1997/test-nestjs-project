import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

export enum PermissionRule {
  ALLOW = 1,
  DENY = 0,
}

@Entity({ name: 'rules' })
export class Rule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  resource: string;

  @ManyToOne((type) => Role, (role) => role.rules)
  role: Role;

  @Column({
    type: 'enum',
    enum: PermissionRule,
    default: PermissionRule.ALLOW,
  })
  permission: PermissionRule;
}
