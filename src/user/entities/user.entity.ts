import { Entity, Column, OneToMany, BeforeInsert, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

import { Contact } from 'src/contact/entities/contact.entity';
import { Message } from 'src/message/entities/message.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'int'
  })
  id: number;

  @Column({
    nullable: false,
    type: 'varchar',
    length: '64',
    unique: true
  })
  username: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: '10',
    unique: true
  })
  phoneNumber: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: '255'
  })
  @Exclude()
  password: string;

  @OneToMany(() => Contact, (contact) => contact.user1, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  contact1: Contact;

  @OneToMany(() => Contact, (contact) => contact.user2, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  contact2: Contact;

  @OneToMany(() => Message, (message) => message.senderUser, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  sentMessage: Message;

  @OneToMany(() => Message, (message) => message.receiverUser, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  receivedMessage: Message;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  validatePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
}
