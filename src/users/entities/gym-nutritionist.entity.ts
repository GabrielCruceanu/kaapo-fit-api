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
// export class GymNutritionist {
//   @PrimaryGeneratedColumn()
//   id: number;
//
//   @ManyToOne(() => User, (user) => user.gymNutritionistSessions)
//   @JoinColumn({ name: 'gym_id' })
//   gym: User;
//
//   @ManyToOne(() => User, (user) => user.nutritionistGymSessions)
//   @JoinColumn({ name: 'nutritionist_id' })
//   nutritionist: User;
//
//   @Column()
//   startDate: Date;
// }
