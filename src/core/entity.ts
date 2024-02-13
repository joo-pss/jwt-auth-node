import { randomUUID } from 'node:crypto';

export abstract class Entity<T> {
  protected props: T;
  private readonly identity: string;

  protected constructor(props: T, identity?: string) {
    this.props = props;
    this.identity = identity ?? randomUUID();
  }

  get id() {
    return this.identity;
  }
}
