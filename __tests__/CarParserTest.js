import CarParser from "../src/service/models/CarParser";

describe('CarParser', () => {
  describe('parseNamesByComma', () => {
    const testCases = [
      { input: 'a,b,c', expected: ['a', 'b', 'c'] },
      { input: 'a, b, c', expected: ['a', 'b', 'c'] },
      { input: 'a,a', expected: ['a', 'a'] }, 
      { input: '  a ,  b,c  ', expected: ['a', 'b', 'c'] },
      { input: 'a', expected: ['a'] }, 
      { input: '', expected: [''] }, 
    ];

    test.each(testCases)(
      'input은 expected 배열로 파싱되어야 한다',
        // given: 
      ({ input, expected }) => {

        // when
        const result = CarParser.parseNamesByComma(input);

        // then
        expect(result).toEqual(expected);
      }
    );
  });
});