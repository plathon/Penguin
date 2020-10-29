import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
  OneToMany
} from 'typeorm'
import Bcrypt from '@providers/Bcrypt'
import { CreateUserResponseDTO } from '@services/users/createUser/createUserDTO'
import Jwt from '@providers/Jwt'
import Product from './Product'
import Order from './Order'

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @OneToMany(type => Order, order => order.user)
  orders: Order[]

  @OneToMany(type => Product, product => product.user)
  products: Product[]

  private tempPassword: string

  @BeforeUpdate()
  @BeforeInsert()
  async HashPassword() {
    if (this.tempPassword !== this.password) {
      const bcrypt = new Bcrypt()
      const salt = await bcrypt.genSalt()
      const password = this.password
      const passwordHash = await bcrypt.hash(password, salt)
      this.password = passwordHash
    }
  }

  @AfterLoad()
  loadTempPassword() {
    this.tempPassword = this.password
  }

  generateAccessToken(): CreateUserResponseDTO {
    const jwt = new Jwt()
    const user = { id: this.id, name: this.name, email: this.email }
    const token = { accessToken: jwt.sign(user, process.env.APP_SECRET) }
    return token
  }

  async comparePassword(password: string): Promise<boolean> {
    const bcrypt = new Bcrypt()
    return await bcrypt.compare(password, this.password)
  }
}
