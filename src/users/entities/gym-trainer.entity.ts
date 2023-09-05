// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   JoinColumn,
// } from 'typeorm';
// import { User } from './user.entity';
//
// @Entity()
// export class GymTrainer {
//   @PrimaryGeneratedColumn()
//   id: number;
//
//   @ManyToOne(() => User, (user) => user.gymTrainerSessions)
//   @JoinColumn({ name: 'gym_id' })
//   gym: User;
//
//   @ManyToOne(() => User, (user) => user.trainerGymSessions)
//   @JoinColumn({ name: 'trainer_id' })
//   trainer: User;
//
//   @Column()
//   startDate: Date;
// }
