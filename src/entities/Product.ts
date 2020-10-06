import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm'
import Tag from './Tag'
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

  @ManyToMany(type => Tag, tag => tag.products)
  @JoinTable()
  tags: Tag[]
}
