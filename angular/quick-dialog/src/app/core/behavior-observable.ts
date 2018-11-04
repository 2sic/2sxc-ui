import { BehaviorSubject, Observable } from "rxjs";

export class BehaviorObservable<T> extends Observable<T> {
  /** The source subject */
  subject: BehaviorSubject<T>;

  /** will reset back to the initial value */
  reset: () => void;

  /** check if it's the initial object */
  isInitial: () => boolean;

  /** the initial object */
  initialValue: T;

  /** shorthand to push next value */
  next: (value: T) => void;

  static create<T>(initialValue: T): BehaviorObservable<T> {
    const subj = new BehaviorSubject<T>(initialValue);
    const obs = subj.asObservable() as BehaviorObservable<T>;
    obs.initialValue = initialValue;
    obs.subject = subj;
    obs.reset = () => {
      obs.subject.next(obs.initialValue);
    }
    obs.isInitial = () => {
      return obs.subject.value === obs.initialValue;
    }
    obs.next = (value: T) => obs.subject.next(value);
    return obs;
  }
}