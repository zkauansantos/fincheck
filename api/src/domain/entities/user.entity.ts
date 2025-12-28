import { Email } from '../value-objects/email.vo';
import { Password } from '../value-objects/password.vo';
import { Entity } from './entity';

export interface UserProps {
  id?: string;
  name: string;
  email: Email;
  password: Password;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends Entity {
  private name: string;
  private email: Email;
  private password: Password;

  private constructor(props: UserProps) {
    super(props.id, props.createdAt, props.updatedAt);

    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
  }

  static create(props: UserProps): User {
    this.validateProps(props);
    return new User(props);
  }

  static reconstitute(props: UserProps): User {
    return new User(props);
  }

  private static validateProps(props: UserProps): void {
    if (props.id && this.isInvalidId(props.id)) {
      throw new Error('Invalid user ID format');
    }

    if (!props.name) {
      throw new Error('User name is required');
    }

    if (this.isEmpty(props.name)) {
      throw new Error('User name cannot be empty');
    }

    if (!props.email) {
      throw new Error('User email is required');
    }

    if (!props.password) {
      throw new Error('User password is required');
    }
  }

  getName(): string {
    return this.name;
  }

  getEmail(): Email {
    return this.email;
  }

  getPassword(): Password {
    return this.password;
  }

  updateName(newName: string): void {
    if (!newName) {
      throw new Error('User name is required');
    }

    if (User.isEmpty(newName)) {
      throw new Error('User name cannot be empty');
    }

    this.name = newName;
    this.touch();
  }
}
