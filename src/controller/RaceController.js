import InputView from '../view/inputView.js';
import OutputView from '../view/outputView.js';
import Car from '../service/models/Car.js';
import Race from '../service/models/Race.js';

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
      throw error;
    }
  }
}

export default RaceController;