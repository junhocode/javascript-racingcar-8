import InputView from '../view/inputView.js';
import OutputView from '../view/outputView.js';
import Car from '../service/models/Car.js';
import CarParser from '../service/models/CarParser.js';
import Race from '../service/models/Race.js';
import { ERROR_MESSAGES } from '../constants/messages.js';

class RaceController {
  async run() {
    try {
      const carNamesInput = await InputView.getCars();
      const carNames = CarParser.parseNamesByComma(carNamesInput);
      const cars = carNames.map(name => Car.create(name));

      const tryCountInput = await InputView.getTryCount();

      const tryCount = Number(tryCountInput);
      if (Number.isNaN(tryCount)) {
        throw new Error(ERROR_MESSAGES.TRYCOUNT_IS_NAN);
      }

      const race = Race.create(cars, tryCount);

      OutputView.printResultHeader();
      race.startRace();

      const allRoundResults = race.formatResults();
      OutputView.printAllRoundResults(allRoundResults);

      const winners = race.findWinners();
      OutputView.printWinners(winners);
      
    } catch (error) {
      throw error;
    }
  }
}

export default RaceController;