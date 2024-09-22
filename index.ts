const prices: { [key: number]: string } = {
    0: "",
    1: "jeden",
    2: "dwa",
    3: "trzy",
    4: "cztery",
    5: "pięć",
    6: "sześć",
    7: "siedem",
    8: "osiem",
    9: "dziewięć",
    10: "dziesięć",
    11: "jedenaście",
    12: "dwanaście",
    13: "trzynaście",
    14: "czternaście",
    15: "piętnaście",
    16: "szesnaście",
    17: "siedemnaście",
    18: "osiemnaście",
    19: "dziewiętnaście",
    20: "dwadzieścia",
    30: "trzydzieści",
    40: "czterdzieści",
    50: "pięćdziesiąt",
    60: "sześćdziesiąt",
    70: "siedemdziesiąt",
    80: "osiemdziesiąt",
    90: "dziewięćdziesiąt",
    100: "sto",
    200: "dwieście",
    300: "trzysta",
    400: "czterysta",
    500: "pięćset",
    600: "sześćset",
    700: "siedemset",
    800: "osiemset",
    900: "dziewięćset"
}

const thousands = ["tysięcy", "milionów", "miliardów", "bilionów", "biliardów"];

const exact_thousands = ["tysiąc", "milion", "miliard", "bilion", "biliard"];

const thousands_2_3_4 = ["tysiące", "miliony", "miliardy", "biliony", "biliardy"];

function up_to_three_chars_to_text(chars: string): string {
    if (chars === "0") return "zero";
    if (chars.length > 3 || chars.length < 1) throw new TypeError("The argument 'chars' must be at least 1 and up to 3 characters long.");
    let text = "";
    let length = chars.length;
    for (let i = length; i != 0; i--) {
        switch(length) {
            case 1:
                text += prices[parseInt(chars)];
            break;
            case 2:
                if (chars.startsWith("1")) {
                    text += prices[parseInt(chars)] + (prices[parseInt(chars)] != "" ? " " : "");
                    chars = "";
                    length = 0;
                }
                else {
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

function price_to_text(price: number): string {

    let text: string[] = [];

    //? Convert price to locale string price to make checking the numbers easier
    let localPrice = price.toLocaleString("en-US");

    //? Add ".00" if price doesn't have polish cents 
    if(localPrice.charAt(localPrice.length - 3) != ".") localPrice += ".00";

    //? Get just polish cents
    const cents = localPrice.slice(-2) + "/100 gr";
    
    //? Remove polish cents
    const numbers = localPrice.slice(0, -3).split(",");

    //? Add 1000's
    let j = numbers.length;
    for (let i = 0; i < numbers.length; i++) {
        j--;
        if (numbers[i] != "0") {
            if (parseInt(numbers[i]).toString() === "1") {
                text.push((" " + (exact_thousands[j-1] || "")).trim());
            }
            else {
                text.push((up_to_three_chars_to_text(parseInt(numbers[i]).toString()) + " " + ((parseInt(numbers[i]).toString().endsWith("2") || parseInt(numbers[i]).toString().endsWith("3") || parseInt(numbers[i]).toString().endsWith("4")) ? (thousands_2_3_4[j-1] || "") : (thousands[j-1] || ""))).trim());
            }
        }
    }

    //? Print out ready text price
    return text.join(" ").trim() + " zł " + cents;
}

export { price_to_text }