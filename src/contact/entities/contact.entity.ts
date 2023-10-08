import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { User } from 'src/user/entities/user.entity';

@Entity()
@Unique(['user1', 'user2'])
export class Contact {
  @PrimaryGeneratedColumn({
    type: 'int'
  })
  id: number;

  @ManyToOne(() => User, (user) => user.contact1, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  user1: User;

  @ManyToOne(() => User, (user) => user.contact2, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  user2: User;
}
