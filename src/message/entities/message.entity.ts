import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm';

import { User } from 'src/user/entities/user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn({
    type: 'int'
  })
  id: number;

  @Column({
    type: 'longtext',
    nullable: false
  })
  text: string;

  @ManyToOne(() => User, (user) => user.sentMessage, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  senderUser: User;

  @ManyToOne(() => User, (user) => user.receivedMessage, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  receiverUser: User;

  @CreateDateColumn()
  createdAt: Date;
}
