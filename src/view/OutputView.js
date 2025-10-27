import { Console } from "@woowacourse/mission-utils";
import CONSTANTS from "../constants/constants.js";
import { UI_MESSAGES } from "../constants/messages.js";

class OutputView {
  static printResultsHeader() {
    Console.print(UI_MESSAGES.RESULTS_HEADER);
  }

  static printResults(allRoundResults) {
    const formatRound = (roundResult) =>
      roundResult
        .map((carState) => {
          const positionDisplay = CONSTANTS.POSITION_MARK.repeat(carState.position);
          return `${carState.name} : ${positionDisplay}`;
        })
        .join("\n");
        
    const resultString = allRoundResults.map(formatRound).join("\n\n");
    Console.print(resultString);
  }

  static printWinners(winners) {
    const winnerNames = winners.map((winnerState) => winnerState.name).join(", ");
    Console.print(UI_MESSAGES.WINNERS(winnerNames));
  }
}

export default OutputView;