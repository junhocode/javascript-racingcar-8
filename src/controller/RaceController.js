import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import Car from '../../models/Car.js';
import Race from '../../models/Race.js';

class RaceController {
  async run() {
    try {
      const carNamesInput = await InputView.getCars();
      const carNames = carNamesInput.split(',');
      const cars = carNames.map(name => Car.create(name.trim()));

      const tryCountInput = await InputView.getTryCount();
      const tryCount = Number(tryCountInput);

      const race = Race.create(cars, tryCount);

      race.startRace();

      const allRoundResults = race.getResults();
      OutputView.printRaceResult(allRoundResults);

      const winners = race.getWinners();
      OutputView.printWinners(winners);
      
    } catch (error) {
      OutputView.printError(error);
    }
  }
}

export default RaceController;