const compressButton = document.getElementById("compress-button");
const decompressButton = document.getElementById("decompress-button");
const clearButton = document.getElementById("clear-button");

// Masukkan kode JavaScript Anda di sini
function compressInput() {
  const input = document.getElementById("input").value;

  if (!input) {
    alert("Please input string!");
    clearInput();
    return;
  }

  if (input.length < 2) {
    alert("Please input string more than 1!");
    return;
  }

  const compressed = compress(input);
  document.getElementById("compressed").value = compressed;
}

function decompressInput() {
  const input = document.getElementById("input").value;
  const compressed = document.getElementById("compressed").value;
  const huffmanTree = buildHuffmanTree(getCharacterFrequencies(input));
  const decompressed = decompress(compressed, huffmanTree);
  document.getElementById("decompressed").value = decompressed;
}

function clearInput() {
  document.getElementById("input").value = "";
  document.getElementById("compressed").value = "";
  document.getElementById("decompressed").value = "";
}

compressButton.addEventListener("click", (e) => {
  e.preventDefault();
  compressInput();
});

decompressButton.addEventListener("click", (e) => {
  e.preventDefault();
  decompressInput();
});

clearButton.addEventListener("click", (e) => {
  e.preventDefault();
  clearInput();
});
