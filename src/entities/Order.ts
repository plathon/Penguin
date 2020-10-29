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

// eslint-disable-next-line no-unused-vars
export enum OrderStatus {
  // eslint-disable-next-line no-unused-vars
  awaiting,
  // eslint-disable-next-line no-unused-vars
  paid,
  // eslint-disable-next-line no-unused-vars
  sent,
  // eslint-disable-next-line no-unused-vars
  done,
  // eslint-disable-next-line no-unused-vars
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

  @ManyToOne(type => User, user => user.orders)
  user: User

  @ManyToMany(type => Product)
  @JoinTable()
  products: Product[]
}
