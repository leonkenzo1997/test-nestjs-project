import { Product } from 'src/v1/products/entities/product.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index, OneToMany, PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

export enum CategoryStatus {
  Active = 1,
  Deleted = 0,
}
@Entity({ name: 'categories' })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('increment',{type: 'bigint'})
  id: number;

  @Index()
  @Column('varchar', { length: 255, nullable: false })
  name: string;

  @Column('tinyint', { default: 1 })
  status: number;

  @OneToMany(type => Product, product => product.category)
  products: Product[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  
}
