// --- Caesar cipher logic ----------------------------------------------------
function caesar(text, shift) {
  // normalise shift to [0..25]
  const s = ((Number(shift) % 26) + 26) % 26;
  let out = "";

  for (const ch of text) {
    const code = ch.charCodeAt(0);

    // Uppercase A–Z
    if (code >= 65 && code <= 90) {
      const enc = ((code - 65 + s) % 26) + 65;
      out += String.fromCharCode(enc);
      continue;
    }
    // Lowercase a–z
    if (code >= 97 && code <= 122) {
      const enc = ((code - 97 + s) % 26) + 97;
      out += String.fromCharCode(enc);
      continue;
    }
    // Non-letters unchanged
    out += ch;
  }
  return out;
}

// --- UI wiring --------------------------------------------------------------
const form   = document.getElementById("cipherForm");
const keyEl  = document.getElementById("key");
const textEl = document.getElementById("plain");
const result = document.getElementById("result");
const error  = document.getElementById("error");

// Pre-fill demo like the mock
keyEl.value = 6;
textEl.value = "Hello World!";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  error.hidden = true;
  result.textContent = "";

  const key = Number(keyEl.value);
  if (!Number.isInteger(key) || key < 0 || key > 25) {
    error.textContent = "La clé doit être un entier entre 0 et 25.";
    error.hidden = false;
    keyEl.focus();
    return;
  }

  const plain = textEl.value ?? "";
  const ciphered = caesar(plain, key);
  result.textContent = ciphered;
});

// Optional: live update when typing
[keyEl, textEl].forEach(el => {
  el.addEventListener("input", () => {
    error.hidden = true;
    if (keyEl.value === "" || textEl.value === "") {
      result.textContent = "";
      return;
    }
    const key = Number(keyEl.value);
    if (!Number.isInteger(key) || key < 0 || key > 25) return;
    result.textContent = caesar(textEl.value, key);
  });
});
