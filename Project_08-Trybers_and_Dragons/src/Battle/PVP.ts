import Fighter from '../Fighter';
import Battle from './Battle';

export default class PVP extends Battle {
  constructor(player: Fighter, private _player2: Fighter) {
    super(player);
    this.player2 = _player2;
  }

  private set player2(character: Fighter) {
    this._player2 = character;
  }

  fight(): number {
    while (this.player.lifePoints !== -1) {
      this.player.attack(this._player2);
      if (this._player2.lifePoints === -1) return 1;
      this._player2.attack(this.player);
    }
    return -1;
  }
}
