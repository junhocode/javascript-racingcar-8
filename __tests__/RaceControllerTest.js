import RaceController from '../src/controller/RaceController.js';
import InputView from '../src/view/InputView.js';
import OutputView from '../src/view/outputView.js';
import CarParser from '../src/service/models/CarParser.js';
import Race from '../src/service/models/Race.js';
import Car from '../src/service/models/Car.js';
import { ERROR_MESSAGES } from '../src/constants/messages.js';

jest.mock('../src/view/inputView.js');
jest.mock('../src/view/outputView.js');
jest.mock('../src/service/models/CarParser.js');
jest.mock('../src/service/models/Race.js');
jest.mock('../src/service/models/Car.js');

describe('RaceController 테스트', () => {
  let controller;

  beforeEach(() => {
    controller = new RaceController();
    jest.clearAllMocks(); 
  });

  test('정상적인 입력이 주어졌을 때, run() 메서드는 전체 경주를 성공적으로 실행시킨다', async () => {
    // given
    const carNamesInput = 'a,b,c';
    const tryCountInput = '5';
    const parsedNames = ['a', 'b', 'c'];
    
    const mockRaceInstance = {
      start: jest.fn(),
      results: ['Round 1 Data'],
      findWinners: jest.fn().mockReturnValue([{ name: 'a', position: 5 }]),
    };
    
    InputView.getCars.mockResolvedValue(carNamesInput);
    InputView.getTryCount.mockResolvedValue(tryCountInput);
    CarParser.parseNamesByComma.mockReturnValue(parsedNames);
    Car.create.mockImplementation(name => ({ name }));
    Race.create.mockReturnValue(mockRaceInstance);
    
    // when
    await controller.run();

    // then
    expect(InputView.getCars).toHaveBeenCalledTimes(1);
    expect(InputView.getTryCount).toHaveBeenCalledTimes(1);
    expect(CarParser.parseNamesByComma).toHaveBeenCalledWith(carNamesInput);
    expect(Car.create).toHaveBeenCalledTimes(parsedNames.length);
    expect(Race.create).toHaveBeenCalledWith(expect.any(Array), Number(tryCountInput));
    expect(mockRaceInstance.start).toHaveBeenCalledTimes(1);
    expect(mockRaceInstance.findWinners).toHaveBeenCalledTimes(1);
    expect(OutputView.printResultsHeader).toHaveBeenCalledTimes(1);
    expect(OutputView.printResults).toHaveBeenCalledWith(mockRaceInstance.results);
    expect(OutputView.printWinners).toHaveBeenCalledWith(expect.any(Array));
  });

  test('시도 횟수에 숫자가 아닌 값을 입력하면 에러를 던진다', async () => {
    // given
    InputView.getCars.mockResolvedValue('a,b');
    InputView.getTryCount.mockResolvedValue('abc');

    // when & then
    await expect(controller.run()).rejects.toThrow(ERROR_MESSAGES.TRYCOUNT_IS_NAN);

    expect(Race.create).not.toHaveBeenCalled();
    expect(OutputView.printResultsHeader).not.toHaveBeenCalled();
  });

  test('자동차 생성 과정에서 에러가 발생하면 그대로 전파한다', async () => {
    // given
    const validationError = new Error(ERROR_MESSAGES.EXCEEDS_MAX_LENGTH);
    InputView.getCars.mockResolvedValue('longlongname');
    CarParser.parseNamesByComma.mockReturnValue(['longlongname']);
    
    Car.create.mockImplementation(() => {
      throw validationError;
    });

    // when & then
    await expect(controller.run()).rejects.toThrow(validationError);
    
    expect(InputView.getTryCount).not.toHaveBeenCalled();
  });
});