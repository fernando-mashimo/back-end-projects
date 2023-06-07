import { EnergyType } from '../Energy';

export default abstract class Archetype {
  private _special: number;
  private _cost: number;

  constructor(private _name: string) {
    this.name = _name;
    this._special = 0;
    this._cost = 0;
  }

  public get name(): string {
    return this._name;
  }

  private set name(newName: string) {
    this._name = newName;
  }

  public get special(): number {
    return this._special;
  }

  private set special(newValue: number) {
    this._special = newValue;
  }

  public get cost(): number {
    return this._cost;
  }

  private set cost(newValue: number) {
    this._cost = newValue;
  }

  abstract get energyType(): EnergyType;

  static createdArchetypeInstances(): number {
    throw new Error('Not implemented');
  }
}
