class CarParser {
    static parseNamesByComma(input) {
        const splitted = input.split(",")
        const trimmedNames = splitted.map(name => name.trim());
        return trimmedNames;
    }
}

export default CarParser;