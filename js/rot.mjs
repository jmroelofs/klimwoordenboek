class Rot {
    constructor(table) {
        this.#lookupTable = table;
    }

    #lookupTable;

    decode
        = this.encode
        = source => [...source].map(char => this.#lookupTable[char] ?? char).join('')
}

export { Rot };
