import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, AfterLoad } from 'typeorm'
import Bcrypt from '@providers/Bcrypt'

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
}
