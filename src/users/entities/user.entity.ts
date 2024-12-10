import { Chat } from 'src/chat/entities/chat.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'simple-array' })
  @ManyToMany(() => Chat, (chats) => chats.id)
  chats: number[];
}
