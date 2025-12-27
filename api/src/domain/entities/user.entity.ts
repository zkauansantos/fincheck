import { Email } from '../value-objects/email.vo';
import { Password } from '../value-objects/password.vo';

export interface UserProps {
  id: string;
  name: string;
  email: Email;
  password: Password;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  private readonly id: string;
  private name: string;
  private email: Email;
  private password: Password;
  private readonly createdAt: Date;
  private updatedAt: Date;

  private constructor(props: UserProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  static create(props: UserProps): User {
    this.validateProps(props);
    return new User(props);
  }

  static register(
    id: string,
    name: string,
    email: string,
    password: string,
  ): User {
    return this.create({
      id,
      name,
      email: Email.create(email),
      password: Password.create(password),
    });
  }

  static reconstitute(props: UserProps): User {
    return new User(props);
  }

  private static validateProps(props: UserProps): void {
    if (!props.id) {
      throw new Error('User ID is required');
    }

    if (this.isInvalidId(props.id)) {
      throw new Error('Invalid user ID format');
    }

    if (!props.name) {
      throw new Error('User name is required');
    }

    if (this.isNameEmpty(props.name)) {
      throw new Error('User name cannot be empty');
    }

    if (this.isNameTooShort(props.name)) {
      throw new Error('User name must be at least 2 characters long');
    }

    if (this.isNameTooLong(props.name)) {
      throw new Error('User name is too long (max 100 characters)');
    }

    if (!props.email) {
      throw new Error('User email is required');
    }

    if (!props.password) {
      throw new Error('User password is required');
    }
  }

  private static isInvalidId(id: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return !uuidRegex.test(id);
  }

  private static isNameEmpty(name: string): boolean {
    return name.trim().length === 0;
  }

  private static isNameTooShort(name: string): boolean {
    return name.trim().length < 2;
  }

  private static isNameTooLong(name: string): boolean {
    return name.length > 100;
  }

  getId(): string {
    return this.id;
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

  getCreatedAt(): Date {
    return new Date(this.createdAt);
  }

  getUpdatedAt(): Date {
    return new Date(this.updatedAt);
  }

  updateName(newName: string): void {
    if (!newName) {
      throw new Error('User name is required');
    }

    if (User.isNameEmpty(newName)) {
      throw new Error('User name cannot be empty');
    }

    if (User.isNameTooShort(newName)) {
      throw new Error('User name must be at least 2 characters long');
    }

    if (User.isNameTooLong(newName)) {
      throw new Error('User name is too long (max 100 characters)');
    }

    this.name = newName;
    this.touch();
  }

  updateEmail(newEmail: string): void {
    const emailVO = Email.create(newEmail);
    this.email = emailVO;
    this.touch();
  }

  updatePassword(newPassword: string): void {
    const passwordVO = Password.create(newPassword);
    this.password = passwordVO;
    this.touch();
  }

  updatePasswordHashed(hashedPassword: string): void {
    this.password = Password.createHashed(hashedPassword);
    this.touch();
  }

  hasEmail(emailToCompare: string): boolean {
    const emailVO = Email.create(emailToCompare);
    return this.email.equals(emailVO);
  }

  private touch(): void {
    this.updatedAt = new Date();
  }
}
