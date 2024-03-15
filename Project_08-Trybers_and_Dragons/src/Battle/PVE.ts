import Fighter, { SimpleFighter } from '../Fighter';
import Monster from '../Monster';
import Battle from './Battle';

export default class PVE extends Battle {
  constructor(
    player: Fighter,
    private _environment: (Monster | Fighter | SimpleFighter)[],
  ) {
    super(player);
    this.environment = _environment;
  }

  private set environment(environment: (Monster | Fighter | SimpleFighter)[]) {
    this._environment = environment;
  }

  fight(): number {
    while (this.player.lifePoints !== -1) {
      this._environment.forEach((enemy) => this.player.attack(enemy));
      if (this._environment.every((enemy) => enemy.lifePoints === -1)) return 1;
      this._environment.forEach((enemy) => enemy.attack(this.player));
    }
    return -1;
  }
}
