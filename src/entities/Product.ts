import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import User from './User'

@Entity()
export default class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @ManyToOne(type => User, user => user.products)
  user: User
}
