import { Console } from "@woowacourse/mission-utils";
import { UI_MESSAGES, ERROR_MESSAGES } from "../constants/messages.js";

class OutputView {
  static printRaceResult(allRoundResults) {
    const formatRound = (roundResult) =>
      roundResult
        .map((car) => {
          const distanceDisplay = "-".repeat(car.currentDistance);
          return `${car.name} : ${distanceDisplay}`;
        })
        .join("\n");

    const totalResultString = allRoundResults.map(formatRound).join("\n\n");
    
    Console.print(UI_MESSAGES.RESULTS(totalResultString));
  }

  static printWinners(winners) {
    const winnerNames = winners.map((winner) => winner.name).join(", ");
    Console.print(UI_MESSAGES.WINNERS(winnerNames));
  }

  static printError(error) {
    Console.print(ERROR_MESSAGES.GLOBAL_ERROR(error));
  }
}

export default OutputView;