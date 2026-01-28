class Rot {
    constructor(table) {
        this.#lookupTable = table;
    }

    #lookupTable;

    decode
        = this.encode
        = source => source.replaceAll(
            /[^]/g,
            char => this.#lookupTable[char] ?? char
        );
}

export { Rot };
