import { Product } from 'src/v1/products/entities/product.entity';
import { ProductIngredient} from './../../product-ingredient/entities/product-ingredient.entity';
import { JoinTable, ManyToMany, OneToMany, ManyToOne } from 'typeorm';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index, PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
@Entity({ name: 'ingredients' })
export class Ingredient extends BaseEntity {
  @PrimaryGeneratedColumn('increment',{type: 'bigint'})
  id: number;

  @Index()
  @Column('varchar', { length: 255, nullable: false })
  name: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('float', { nullable: false })
  recommendedAmount: number;

  @Column('boolean', { default: true })
  status: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(type => ProductIngredient, productIngredient => productIngredient.ingredient)
  productIngredients: ProductIngredient[];

}
