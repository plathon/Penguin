import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import Product from './Product'
import User from './User'

export enum OrderStatus {
  awaiting,
  paid,
  sent,
  done,
  returned
}

@Entity()
export default class Order {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  status: OrderStatus

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date

  @ManyToOne(() => User, user => user.orders)
  user: User

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[]
}
