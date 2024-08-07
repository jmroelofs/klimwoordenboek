class Rot13 {
    lookupTable = new Map([
        ['a', 'n'], ['b', 'o'], ['c', 'p'], ['d', 'q'], ['e', 'r'], ['f', 's'], ['g', 't'], ['h', 'u'], ['i', 'v'], ['j', 'w'], ['k', 'x'], ['l', 'y'], ['m', 'z'],
        ['n', 'a'], ['o', 'b'], ['p', 'c'], ['q', 'd'], ['r', 'e'], ['s', 'f'], ['t', 'g'], ['u', 'h'], ['v', 'i'], ['w', 'j'], ['x', 'k'], ['y', 'l'], ['z', 'm'],
        ['A', 'N'], ['B', 'O'], ['C', 'P'], ['D', 'Q'], ['E', 'R'], ['F', 'S'], ['G', 'T'], ['H', 'U'], ['I', 'V'], ['J', 'W'], ['K', 'X'], ['L', 'Y'], ['M', 'Z'],
        ['N', 'A'], ['O', 'B'], ['P', 'C'], ['Q', 'D'], ['R', 'E'], ['S', 'F'], ['T', 'G'], ['U', 'H'], ['V', 'I'], ['W', 'J'], ['X', 'K'], ['Y', 'L'], ['Z', 'M'],
    ]);

    encode = source => source.replace(/[a-zA-Z]/g, char => this.lookupTable.get(char));

    decode = this.encode;
}

export { Rot13 };
