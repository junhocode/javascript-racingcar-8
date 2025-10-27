import { Random } from '@woowacourse/mission-utils';
import Car from '../src/service/models/Car.js';
import { ERROR_MESSAGES } from '../src/constants/messages.js';
import CONSTANTS from '../src/constants/constants.js';

jest.mock('@woowacourse/mission-utils', () => ({
  Random: {
    pickNumberInRange: jest.fn(),
  },
}));

const mockRandoms = (numbers) => {
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, Random.pickNumberInRange);
};


describe('Car', () => {
  beforeEach(() => {
    Random.pickNumberInRange.mockClear();
  });

  describe('Car 기능 테스트', () => {
    test('Car 이름 테스트', () => {
      // given
      const name = 'a';
      
      // when
      const car = Car.create(name);
      
      // then
      expect(car.name).toBe(name);
      expect(car.position).toBe(0);
    });

    test(`이름 최대 길이 초과`, () => {
      // given
      const longName = 'longname';
      
      // then
      expect(() => {
        // when
        Car.create(longName);
      }).toThrow(ERROR_MESSAGES.EXCEEDS_MAX_LENGTH);
    });
    
    test(`이름 최소 길이 미만`, () => {
      // given
      const shortName = ''; 
      
      // then
      expect(() => {
        // when
        Car.create(shortName);
      }).toThrow(ERROR_MESSAGES.MIN_NAME_LENGTH);
    });
  });

  describe('move()', () => {
    test('move() true', () => {
      // given
      const car = Car.create('a');
      mockRandoms([4]);
      
      // when
      car.move();

      // then
      expect(car.position).toBe(1);
    });

    test('move() false', () => {
      // given
      const car = Car.create('a');
      mockRandoms([3]);
      
      // when
      car.move();

      // then
      expect(car.position).toBe(0);
    });

    test('move() 누적', () => {
      // given
      const car = Car.create('a');
      mockRandoms([5, 2, 8]);
      
      // when & then
      car.move();
      expect(car.position).toBe(1);

      car.move();
      expect(car.position).toBe(1); 

      car.move();
      expect(car.position).toBe(2); 
    });
  });
});