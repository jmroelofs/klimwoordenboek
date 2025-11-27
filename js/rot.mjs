class Rot {
    #lookupTable;

    constructor(table) {
        this.#lookupTable = table;
    }

    decode 
        = this.encode 
        = source => source.replaceAll(
            /[^]/g,
            char => this.#lookupTable[char] ?? char
        );
}

export { Rot };
