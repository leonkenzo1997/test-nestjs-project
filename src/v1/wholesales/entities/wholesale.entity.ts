import { Product } from 'src/v1/products/entities/product.entity';
import { User } from './../../users/entities/user.entity';
import { Max } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";

export enum WholeSaleStatus {
    Active = 1,
    Deleted = 0,
  }
@Entity('wholesales')
export class Wholesale {
    @PrimaryGeneratedColumn('increment',{type: 'bigint'})
    id: number;

    @Column({type: 'date'})
    date: Date;

    @Column({type: 'varchar', length: 255})
    @Max(255)
    address: string;

    @Column({type: 'float'})
    price: number;

    @Column({default: 1, type: 'tinyint'})
    status: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @ManyToOne(type => User, user => user.wholesales)
    user: User;

    @ManyToOne(type => Product, product => product.wholesales)
    product: Product;
}
