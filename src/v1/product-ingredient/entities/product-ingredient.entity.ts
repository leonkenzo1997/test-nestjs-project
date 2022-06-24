import { Ingredient } from 'src/v1/ingredients/entities/ingredient.entity';
import { Product } from 'src/v1/products/entities/product.entity';
import {
  BaseEntity,
  Column, Entity, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
@Entity({})
export class ProductIngredient extends BaseEntity {
  @PrimaryGeneratedColumn('increment',{type: 'bigint'})
  id: number;

  @ManyToOne(type => Product, product => product.productIngredients)
  product: Product;

  @ManyToOne(type => Ingredient, ingredient => ingredient.productIngredients)
  ingredient: Ingredient;

  @Column({type:'float'})
  amount: number;  

}
