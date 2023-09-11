import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from '../../users/entities/client.entity';
import { Workout } from '../../workout/entities/workout.entity';
import { TrainingSession } from './training-session.entity';
import { Appointment } from '../../appointment/entity/appointment.entity';
import { EntityHelper } from '../../utils/entity-helper';
import { Equipment } from '../../workout/entities/equipment.entity';
import { Program } from '../../workout/entities/program.entity';
import { GenderType } from '../../users/types/gender.enum';
import { TrainerSpecialization } from '../types/trainer-specialization.enum';
import { Diet } from '../../diet/entity/diet.entity';
import { Review } from '../../review/entities/review.entity';
import { Address } from '../../address/entities/address.entity';

@Entity()
export class Trainer extends EntityHelper {
  @PrimaryGeneratedColumn() id: number;

  @OneToOne(() => User, (user) => user.trainer) @JoinColumn() user: User;

  // Personal Information: ________________________________________________________________

  // The full name of the trainer.
  @Column({ type: String, nullable: true }) name: string;

  // Gender of the trainer. This can be an enum (e.g., Male, Female, Other).
  @Column({ type: 'enum', enum: GenderType }) gender: GenderType;

  // The trainer's date of birth.
  @Column({ type: String, nullable: true }) dateOfBirth: string;

  // A URL to the trainer's profile image.
  @Column({ type: String, nullable: true }) profilePicture: string;

  //A URL link to a short introduction video. This would allow potential clients to get a sense
  // of the trainer's personality, demeanor, and training style.
  @Column({ nullable: true }) introVideoLink: string;

  // A brief bio about the trainer, their philosophy, and background.
  @Column('text', { nullable: true }) biography: string;

  // A brief statement on the trainer's beliefs and approach towards fitness and health.
  @Column({ nullable: true }) fitnessPhilosophy: string;

  // Professional Information: ________________________________________________________________

  // Area of specialization (e.g., strength training, yoga, cardio, pilates).
  @Column({ type: 'enum', enum: TrainerSpecialization, nullable: true })
  specialization: TrainerSpecialization;

  // Number of years the trainer has been professionally training.
  @Column() yearsOfExperience: number;

  // An array or list of certifications the trainer holds.
  @Column({ type: 'simple-array', nullable: true }) certifications: string[];

  // An array or list detailing notable accomplishments. This could be winning a fitness competition,
  // notable clients they've trained, or any other significant milestones in their career.
  @Column({ type: 'simple-array', nullable: true }) achievements: string[];

  // Information about the trainer's formal education, especially if it's relevant to fitness and health.
  // This can give potential clients more confidence in the trainer's expertise.
  @Column({ type: String, nullable: true }) education: string;

  // An array of languages the trainer is fluent in.
  // This would be especially relevant for users who prefer training in a specific language.
  @Column({ type: 'simple-array', nullable: true }) languagesSpoken: string[];

  // Contact & Location: ________________________________________________________________
  // Trainer's professional email address.
  @Column() email: string;

  // Contact number of the trainer.
  @Column() phone: string;

  // Address where the trainer provides training or their affiliated gym's address.
  @OneToOne(() => Address) @JoinColumn() address: Address | undefined;

  // Links to the trainer's professional social media profiles or website.
  @Column('simple-array', { nullable: true }) socialMediaLinks: string[];

  // The gym or fitness center the trainer is affiliated with (if any).
  // @ManyToOne(() => Gym)
  // gymAffiliation: Gym;

  // Work Details: ________________________________________________________________

  // Days and hours when the trainer is available for sessions.
  // This can be a more complex object or even a separate entity depending on your needs.

  // How much the trainer charges per hour/session.
  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  ratePerHour: number;

  @Column({ nullable: true }) clientLimit: number;

  // A boolean to indicate if the trainer is currently active and accepting new clients.
  @Column({ default: true }) isActive: boolean;

  // Group Sessions:
  // A boolean indicating if the trainer offers group training sessions.
  @Column({ default: false }) offersGroupSessions: boolean;

  // If group sessions are offered, how much do they charge for them?
  @Column({ nullable: true }) groupSessionRate: number;

  // Trial Sessions
  // A boolean indicating if the trainer offers a trial or first free session.
  @Column({ default: false }) offersTrialSession: boolean;

  // Special Programs:
  // Any special training programs they offer, like "Bride-to-be" training, "Post-pregnancy" fitness, "Senior citizen" fitness programs, etc.
  @Column('simple-array', { nullable: true }) specialPrograms: string[];

  // Relationships with Other Entities:
  // An array or list of reviews from clients.
  @OneToMany(() => Review, (review) => review.trainer) // Assuming you have a relationship in Review pointing to Trainer
  clientReviews: Review[];

  // Clients that are currently training or have trained with the trainer.
  @OneToMany(() => Client, (client) => client.trainer) clients: Client[];

  //  Workouts or training plans created by the trainer.
  @OneToMany(() => Workout, (workout) => workout.trainer) workouts: Workout[];

  // represents training sessions where the user is the trainer
  @OneToMany(
    () => TrainingSession,
    (trainingSession) => trainingSession.trainer,
  )
  trainingSessionsAsTrainer: TrainingSession[] | null;

  // Nutrition plans designed by the trainer, especially if they have nutrition-related certifications or expertise.
  @OneToMany(() => Diet, (diet) => diet.nutritionist) dietPlans: Diet[];

  // Appointments or sessions booked with the trainer.
  @OneToMany(() => Appointment, (appointment) => appointment.trainer)
  appointments: Appointment[];

  // Cancellations & Rescheduling:
  // Details on the trainer's policy regarding cancelling or rescheduling sessions.
  // For instance, do they require 24 hours notice? Is there a fee associated with late cancellations?
  @Column({ nullable: true }) cancellationPolicy: string;

  // Background Check:
  // A boolean indicating if the trainer has undergone a background check. This can provide added peace of mind for clients, especially if they're training in private settings.
  @Column({ default: false }) backgroundChecked: boolean;

  // A boolean indicating if the trainer has professional liability insurance.
  @Column({ default: false }) hasInsurance: boolean;

  // Equipment & Facilities:

  // A boolean indicating if the trainer has their own training facility or if they operate within a gym.
  @Column({ default: false }) hasOwnFacility: boolean;

  // A list of equipment the trainer typically uses during sessions.
  // This can give clients an idea of the kind of workouts to expect.

  @ManyToMany(() => Equipment, (equipment) => equipment.trainers)
  @JoinTable() // This annotation specifies the owner side of the relation
  equipment: Equipment[];

  @OneToMany(() => Program, (program) => program.trainer) programs: Program[];
}
