import CONSTANTS from "../../constants/constants.js";

class CarParser {
    static parseNamesByComma(input) {
         return input.split(CONSTANTS.DELIMITER_MARK).map(name => name.trim());
    }
}

export default CarParser;