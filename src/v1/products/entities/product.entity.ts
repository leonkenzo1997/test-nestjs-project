import { Category } from 'src/v1/categories/entities/category.entity';
import { File } from 'src/v1/files/entities/file.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductIngredient } from './../../product-ingredient/entities/product-ingredient.entity';
import { Seller } from './../../sellers/entities/seller.entity';
import { Wholesale } from './../../wholesales/entities/wholesale.entity';

export enum ProductStatus {
    Active = 1,
    Deleted = 0,
  }

export enum ProductType {
  Medicine = 1,
  Nutritional = 2,
} 
@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('increment',{type: 'bigint'})
    id: number;

    @Column('varchar', { length: 255, nullable: false })
    name: string;

    @Column('tinyint', {nullable: false})
    type:number

    @Column({length:255})
    manufacture: string

    @Column({length:255})
    effect: string

    @Column({length:255})
    recommendedDosage: string

    @Column('tinyint', {default: 1})
    status: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @ManyToOne(type => Category, category => category.products, {nullable: true})
    category: Category;

    @OneToMany((type) => ProductIngredient, productIngredient => productIngredient.product, {cascade: ['insert']})
    productIngredients: ProductIngredient[];

    @OneToMany(type => Seller, seller => seller.product, {cascade: ['insert']})
    sellers: Seller[];

    @OneToMany(type => Wholesale, wholesale => wholesale.product, {cascade: ['insert']})
    wholesales: Wholesale[];

    @OneToOne(type => File, {cascade: ['insert']})
    @JoinColumn()
    image: File;

    @OneToOne(type => File, {cascade: ['insert']})
    @JoinColumn()
    pdf: File;

}