class CarParser {
    static parseNamesByComma(input) {
         return input.split(",").map(name => name.trim());
    }
}

export default CarParser;