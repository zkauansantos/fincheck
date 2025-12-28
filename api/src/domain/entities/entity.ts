import { randomUUID } from 'node:crypto';

export abstract class Entity {
  protected constructor(
    private readonly id: string = randomUUID(),
    private readonly createdAt: Date = new Date(),
    private updatedAt: Date = new Date(),
  ) {}

  protected static isInvalidId(id: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return !uuidRegex.test(id);
  }

  protected touch(): void {
    this.updatedAt = new Date();
  }

  protected static isEmpty(string: string): boolean {
    return string.trim().length === 0;
  }

  getId(): string {
    return this.id;
  }

  getCreatedAt(): Date {
    return new Date(this.createdAt);
  }

  getUpdatedAt(): Date {
    return new Date(this.updatedAt);
  }
}
