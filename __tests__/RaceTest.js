import Race from "../src/service/models/Race.js";
import { ERROR_MESSAGES } from "../src/constants/messages.js";

const createMockCars = (names) => {
  return names.map(name => ({
    _name: name,
    _position: 0,
    get name() {
      return this._name;
    },
    get position() {
      return this._position;
    },
    move: jest.fn().mockImplementation(function() {
      this._position += 1;
    }),
  }));
};

describe('Race 클래스 테스트', () => {
  describe('Race 생성 및 유효성 검사', () => {
    test('자동차가 2대 미만일 경우 에러를 발생시킨다', () => {
      // given
      const cars = createMockCars(['a']);
      
      // when & then
      expect(() => {
        Race.create(cars, 5);
      }).toThrow(ERROR_MESSAGES.NOT_ENOUGH_CARS);
    });

    test('중복된 이름의 자동차가 있을 경우 에러를 발생시킨다', () => {
      // given
      const cars = createMockCars(['a', 'b', 'a']);

      // when & then
      expect(() => {
        Race.create(cars, 5);
      }).toThrow(ERROR_MESSAGES.DUPLICATE_CAR);
    });

    test('시도 횟수가 0 이하일 경우 에러를 발생시킨다', () => {
      // given
      const cars = createMockCars(['a', 'b']);
      
      // when & then
      expect(() => {
        Race.create(cars, 0);
      }).toThrow(ERROR_MESSAGES.TRYCOUNT_IS_INVALID);
    });

    test('올바른 입력값으로 Race 인스턴스를 생성할 수 있다', () => {
      // given
      const cars = createMockCars(['a', 'b']);
      const tryCount = 3;
      
      // when
      const race = Race.create(cars, tryCount);

      // then
      expect(race).toBeInstanceOf(Race);
    });
  });

  describe('경주 진행 및 결과 확인', () => {
    let mockCars;
    let race;
    const tryCount = 3;

    beforeEach(() => {
      mockCars = createMockCars(['a', 'b']);
      race = Race.create(mockCars, tryCount);
    });

    test('start()는 시도 횟수만큼 각 자동차의 move() 메서드를 호출한다', () => {
      // when
      race.start();
      
      // then
      mockCars.forEach(car => {
        expect(car.move).toHaveBeenCalledTimes(tryCount);
      });
    });

    test('results getter는 각 라운드별 결과를 배열로 올바르게 반환한다', () => {
      // when
      race.start();
      const results = race.results;

      // then
      expect(results).toHaveLength(tryCount);
      const finalRound = results[results.length - 1];
      expect(finalRound).toEqual([
        { name: 'a', position: tryCount },
        { name: 'b', position: tryCount },
      ]);
    });
  });

  describe('우승자 결정 (findWinners)', () => {
    test('start()가 실행되지 않았을 때 findWinners()를 호출하면 에러가 발생한다', () => {
      // given
      const cars = createMockCars(['a', 'b']);
      const race = Race.create(cars, 3);
      
      // when & then
      expect(() => race.findWinners()).toThrow();
    });

    test('단독 우승자가 있는 경우 해당 우승자 객체 배열을 반환한다', () => {
      // given
      const carA = { name: 'a', position: 5, move: jest.fn() };
      const carB = { name: 'b', position: 3, move: jest.fn() };
      const cars = [carA, carB];
      const race = Race.create(cars, 1);

      // when
      race.start();
      const winners = race.findWinners();

      // then
      expect(winners).toEqual([{ name: 'a', position: 5 }]);
    });

    test('공동 우승자가 있는 경우 모든 우승자 객체 배열을 반환한다', () => {
      // given
      const carA = { name: 'a', position: 5, move: jest.fn() };
      const carB = { name: 'b', position: 5, move: jest.fn() };
      const carC = { name: 'c', position: 2, move: jest.fn() };
      const cars = [carA, carB, carC];
      const race = Race.create(cars, 1);
      
      // when
      race.start();
      const winners = race.findWinners();
      
      // then
      expect(winners).toEqual([
        { name: 'a', position: 5 },
        { name: 'b', position: 5 },
      ]);
    });
  });
});