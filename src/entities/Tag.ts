import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import Product from './Product'

@Entity()
export default class Tag {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany(() => Product, product => product.tags)
  products: Product[]
}
