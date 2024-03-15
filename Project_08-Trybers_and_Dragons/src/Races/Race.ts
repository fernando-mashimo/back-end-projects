export default abstract class Race {
  constructor(private _name: string, private _dexterity: number) {
    this.name = _name;
    this.dexterity = _dexterity;
  }

  public get name(): string {
    return this._name;
  }

  private set name(newName: string) {
    this._name = newName;
  }

  public get dexterity(): number {
    return this._dexterity;
  }

  private set dexterity(newDexterity: number) {
    this._dexterity = newDexterity;
  }

  abstract get maxLifePoints(): number;

  static createdRacesInstances(): number {
    throw new Error('Not implemented');
  }
}
