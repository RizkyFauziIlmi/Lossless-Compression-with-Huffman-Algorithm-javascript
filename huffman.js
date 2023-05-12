// Fungsi untuk menghitung frekuensi kemunculan setiap karakter dalam sebuah string
function getCharacterFrequencies(input) {
  const frequencies = {};
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (frequencies[char]) {
      frequencies[char]++;
    } else {
      frequencies[char] = 1;
    }
  }
  
  return frequencies;
}

// Node untuk membangun pohon Huffman
class HuffmanNode {
  constructor(char, frequency) {
    this.char = char;
    this.frequency = frequency;
    this.left = null;
    this.right = null;
  }
}

// Fungsi untuk membangun pohon Huffman
function buildHuffmanTree(frequencies) {
  const nodes = [];
  for (let char in frequencies) {
    nodes.push(new HuffmanNode(char, frequencies[char]));
  }
  while (nodes.length > 1) {
    nodes.sort((a, b) => a.frequency - b.frequency);
    const left = nodes.shift();
    const right = nodes.shift();
    const parent = new HuffmanNode(null, left.frequency + right.frequency);
    parent.left = left;
    parent.right = right;
    nodes.push(parent);
  }
  return nodes[0];
}

// Fungsi rekursif untuk membangun tabel kode Huffman
function buildHuffmanTable(node, code, table) {
  if (node.char) {
    table[node.char] = code;
  } else {
    buildHuffmanTable(node.left, code + "0", table);
    buildHuffmanTable(node.right, code + "1", table);
  }
}

// Fungsi untuk mengompresi string menggunakan algoritma Huffman
function compress(input) {
  const frequencies = getCharacterFrequencies(input);
  const huffmanTree = buildHuffmanTree(frequencies);
  const huffmanTable = {};
  buildHuffmanTable(huffmanTree, "", huffmanTable);
  let compressed = "";
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    compressed += huffmanTable[char];
  }
  return compressed;
}

// Fungsi untuk mendekompresi string yang telah dikompresi menggunakan algoritma Huffman
function decompress(compressed, huffmanTree) {
  let decompressed = "";
  let currentNode = huffmanTree;
  for (let i = 0; i < compressed.length; i++) {
    const bit = compressed[i];
    if (bit === "0") {
      currentNode = currentNode.left;
    } else {
      currentNode = currentNode.right;
    }
    if (currentNode.char) {
      decompressed += currentNode.char;
      currentNode = huffmanTree;
    }
  }
  return decompressed;
}