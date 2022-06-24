import { Product } from "src/v1/products/entities/product.entity";
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum SellerStatus {
    Active = 1,
    Deleted = 0,
  }
@Entity({ name: 'sellers' })
export class Seller {
    @PrimaryGeneratedColumn('increment',{type: 'bigint'})
    id: number;

    @Index()
    @Column('varchar', { length: 255, nullable: false })
    name: string;
    
    @Column('varchar', { length: 255, nullable: true })
    link: string;

    @Column('integer', { nullable: true })
    price: number;

    @Column({default: 1, type: 'tinyint'})
    status: number;

    @ManyToOne( type => Product, product => product.sellers)
    product: Product;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
    
    

}
