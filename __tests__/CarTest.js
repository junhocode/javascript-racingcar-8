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
    test('정상적인 이름으로 Car를 생성하면, 이름과 초기 위치(0)를 가진다', () => {
      // given
      const name = 'a';
      
      // when
      const car = Car.create(name);
      
      // then
      expect(car.name).toBe(name);
      expect(car.position).toBe(0);
    });

    // test.each를 사용한 이름 유효성 검사
    const invalidNameCases = [
      { name: 'longname', expectedError: ERROR_MESSAGES.EXCEEDS_MAX_LENGTH },
      { name: '', expectedError: ERROR_MESSAGES.MIN_NAME_LENGTH },
    ];

    test.each(invalidNameCases)(
      '유효하지 않은 이름($name)으로 Car를 생성하면 에러를 던진다',
      ({ name, expectedError }) => {
        // then
        expect(() => {
          // when
          Car.create(name);
        }).toThrow(expectedError);
      }
    );
  });

  describe('move()', () => {
    const moveTestCases = [
      { randomNumber: 4, expectedPosition: 1, description: '전진하는 경우' },
      { randomNumber: 9, expectedPosition: 1, description: '전진하는 경우' },
      { randomNumber: 3, expectedPosition: 0, description: '정지하는 경우' },
      { randomNumber: 0, expectedPosition: 0, description: '정지하는 경우' },
    ];

    test.each(moveTestCases)(
      '무작위 값이 $randomNumber일 때 $description: 위치가 $expectedPosition이 되어야 한다',
      ({ randomNumber, expectedPosition }) => {
        // given
        const car = Car.create('a');
        mockRandoms([randomNumber]);
        
        // when
        car.move();

        // then
        expect(car.position).toBe(expectedPosition);
      }
    );

    test('move()를 여러 번 호출하면 위치가 누적되어야 한다', () => {
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