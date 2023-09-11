import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Trainer } from '../../trainer/entities/trainer.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: 'text' }) content: string;

  @Column({ type: 'int', default: 0 }) rating: number; // Assuming a scale of 1-5, adjust as needed

  @CreateDateColumn() date: Date;

  @ManyToOne(() => User, (user) => user.id) reviewer: User; // This represents the user who wrote the review

  @ManyToOne(() => Trainer, (trainer) => trainer.clientReviews, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  trainer: Trainer | null; // The trainer being reviewed, if applicable

  // @ManyToOne(() => Nutritionist, (nutritionist) => nutritionist.clientReviews, {
  // onDelete: 'CASCADE', nullable: true
  // })
  // nutritionist: Nutritionist | null; // The nutritionist being reviewed, if applicable

  // @ManyToOne(() => Gym, (gym) => gym.reviews, {  onDelete: 'CASCADE', nullable: true })
  // gym: Gym | null; // The gym being reviewed, if applicable
}
