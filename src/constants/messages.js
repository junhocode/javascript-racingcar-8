import CONSTANTS from "./constants.js";

export const UI_MESSAGES = {
  GET_CARS: "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분) \n",
  GET_TRY_COUNTS: "시도할 회수는 몇회인가요? \n",
  RESULTS_HEADER: "\n실행 결과",
  RESULTS:(results) => `${results}`,
  WINNERS: (winners) => `최종 우승자 : ${winners}`
};

export const ERROR_MESSAGES = {
  NOT_ENOUGH_CARS: "[ERROR] 참가자는 두명 이상이여야 합니다.",
  DUPLICATE_CAR: "[ERROR] 참가자는 동일한 이름을 가질 수 없습니다.",
  EXCEEDS_MAX_LENGTH: `[ERROR] 참가자의 이름은 최대 ${CONSTANTS.MAX_NAME_LENGTH}자까지 입력할 수 있습니다.`,
  NTE_MIN_LENGTH: `[ERROR] 참가자의 이름은 최소 ${CONSTANTS.MIN_NAME_LENGTH}자 이상이여야 합니다.`,
  TRYCOUNT_IS_NAN: "[ERROR] 시도 횟수는 숫자여야 합니다.",
  TRYCOUNT_IS_INVALID: "[ERROR] 시도 횟수는 1회 이상이어야 합니다.",
  GLOBAL_ERROR: (error) => `[ERROR] ${error.message}`
};