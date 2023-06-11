export const currencyFormatter = (number: any) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(number);
};

export function removeVietnameseDiacritics(str) {
  // Map các ký tự có dấu sang ký tự không dấu
  const diacriticsMap = [
    { base: 'A', diacritics: /[\u00C0-\u00C6\u00C8-\u00CF\u1EA0-\u1EF9]/g },
    { base: 'E', diacritics: /[\u00C8-\u00CF]/g },
    { base: 'I', diacritics: /[\u00CC-\u00CF]/g },
    { base: 'O', diacritics: /[\u00D2-\u00D6\u00D8-\u00D9\u00DC-\u00DF]/g },
    { base: 'U', diacritics: /[\u00D9-\u00DC]/g },
    { base: 'Y', diacritics: /[\u00DD\u1EF2-\u1EF9]/g },
    { base: 'a', diacritics: /[\u00E0-\u00E6\u00E8-\u00EF\u1EA0-\u1EF9]/g },
    { base: 'e', diacritics: /[\u00E8-\u00EF]/g },
    { base: 'i', diacritics: /[\u00EC-\u00EF]/g },
    { base: 'o', diacritics: /[\u00F2-\u00F6\u00F8-\u00F9\u00FC-\u00FF]/g },
    { base: 'u', diacritics: /[\u00F9-\u00FC]/g },
    { base: 'y', diacritics: /[\u00FD\u1EF2-\u1EF9]/g },
    { base: 'D', diacritics: /[\u0110]/g },
    { base: 'd', diacritics: /[\u0111]/g },
  ];

  // Thực hiện chuyển đổi
  for (let i = 0; i < diacriticsMap.length; i++) {
    str = str.replace(diacriticsMap[i].diacritics, diacriticsMap[i].base);
  }

  return str;
}
