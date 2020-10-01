import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, AfterLoad } from 'typeorm'
import Bcrypt from '@providers/Bcrypt'
import { AccessToken } from '@server/services/users/createUser/createUserDTO'
import Jwt from '@server/providers/Jwt'

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  private tempPassword: string

  @BeforeUpdate()
  @BeforeInsert()
  async HashPassword () {
    if (this.tempPassword !== this.password) {
      const bcrypt = new Bcrypt()
      const salt = await bcrypt.genSalt()
      const password = this.password
      const passwordHash = await bcrypt.hash(password, salt)
      this.password = passwordHash
    }
  }

  @AfterLoad()
  loadTempPassword () {
    this.tempPassword = this.password
  }

  generateAccessToken (): AccessToken {
    const jwt = new Jwt()
    const user = { id: this.id, name: this.name, email: this.email }
    const token = { accessToken: jwt.sign(user, process.env.APP_SECRET) }
    return token
  }
}
