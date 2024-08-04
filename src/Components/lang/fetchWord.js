import { getWordAr } from "./ar";
import { getWordEn } from "./en";
import { getWordTr } from "./tr";

export function fetchWord(key, local) {
  if (local === "ar") {
    let word = getWordAr(key);
    if (word) return word;
    else return getWordEn(key);
  } else if (local === "en" || local === "eng") return getWordEn(key);
  else if (local === "tr" || local === "tur") {
    let word = getWordTr(key);
    if (word) return word;
    else return getWordEn(key);
  }
}
