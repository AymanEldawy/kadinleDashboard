import { en, getWordEn } from './en';
import { ar, getWordAr } from './ar';
export function fetchWord(key, local) {
  if (local === 'ar') {
    let word = getWordAr(key);
    if (word) return word;
    else return getWordEn(key);
  } else if (local === 'en') return getWordEn(key);
}
function checkFallBack(key) {
  return getWordEn(key);
}
