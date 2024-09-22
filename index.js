// index.ts
function up_to_three_chars_to_text(chars) {
  if (chars === "0")
    return "zero";
  if (chars.length > 3 || chars.length < 1)
    throw new TypeError("The argument 'chars' must be at least 1 and up to 3 characters long.");
  let text = "";
  let length = chars.length;
  for (let i = length;i != 0; i--) {
    switch (length) {
      case 1:
        text += prices[parseInt(chars)];
        break;
      case 2:
        if (chars.startsWith("1")) {
          text += prices[parseInt(chars)] + (prices[parseInt(chars)] != "" ? " " : "");
          chars = "";
          length = 0;
        } else {
          text += prices[parseInt(chars.charAt(0)) * 10] + (prices[parseInt(chars.charAt(0)) * 10] != "" ? " " : "");
          chars = chars.slice(1);
          length--;
        }
        break;
      case 3:
        text += prices[parseInt(chars.charAt(0)) * 100] + (prices[parseInt(chars.charAt(0)) * 100] != "" ? " " : "");
        chars = chars.slice(1);
        length--;
        break;
    }
  }
  return text.trim();
}
function price_to_text(price) {
  let text = [];
  let localPrice = price.toLocaleString("en-US");
  if (localPrice.charAt(localPrice.length - 3) != ".")
    localPrice += ".00";
  const cents = localPrice.slice(-2) + "/100 gr";
  const numbers = localPrice.slice(0, -3).split(",");
  let j = numbers.length;
  for (let i = 0;i < numbers.length; i++) {
    j--;
    if (numbers[i] != "0") {
      if (parseInt(numbers[i]).toString() === "1") {
        text.push((" " + (exact_thousands[j - 1] || "")).trim());
      } else {
        text.push((up_to_three_chars_to_text(parseInt(numbers[i]).toString()) + " " + (parseInt(numbers[i]).toString().endsWith("2") || parseInt(numbers[i]).toString().endsWith("3") || parseInt(numbers[i]).toString().endsWith("4") ? thousands_2_3_4[j - 1] || "" : thousands[j - 1] || "")).trim());
      }
    }
  }
  return text.join(" ").trim() + " z\u0142 " + cents;
}
var prices = {
  0: "",
  1: "jeden",
  2: "dwa",
  3: "trzy",
  4: "cztery",
  5: "pi\u0119\u0107",
  6: "sze\u015B\u0107",
  7: "siedem",
  8: "osiem",
  9: "dziewi\u0119\u0107",
  10: "dziesi\u0119\u0107",
  11: "jedena\u015Bcie",
  12: "dwana\u015Bcie",
  13: "trzyna\u015Bcie",
  14: "czterna\u015Bcie",
  15: "pi\u0119tna\u015Bcie",
  16: "szesna\u015Bcie",
  17: "siedemna\u015Bcie",
  18: "osiemna\u015Bcie",
  19: "dziewi\u0119tna\u015Bcie",
  20: "dwadzie\u015Bcia",
  30: "trzydzie\u015Bci",
  40: "czterdzie\u015Bci",
  50: "pi\u0119\u0107dziesi\u0105t",
  60: "sze\u015B\u0107dziesi\u0105t",
  70: "siedemdziesi\u0105t",
  80: "osiemdziesi\u0105t",
  90: "dziewi\u0119\u0107dziesi\u0105t",
  100: "sto",
  200: "dwie\u015Bcie",
  300: "trzysta",
  400: "czterysta",
  500: "pi\u0119\u0107set",
  600: "sze\u015B\u0107set",
  700: "siedemset",
  800: "osiemset",
  900: "dziewi\u0119\u0107set"
};
var thousands = ["tysi\u0119cy", "milion\xF3w", "miliard\xF3w", "bilion\xF3w", "biliard\xF3w"];
var exact_thousands = ["tysi\u0105c", "milion", "miliard", "bilion", "biliard"];
var thousands_2_3_4 = ["tysi\u0105ce", "miliony", "miliardy", "biliony", "biliardy"];
export {
  price_to_text
};
//? ^ A compiled version of index.ts