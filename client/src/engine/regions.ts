// ============================================================
// Continent / Region mapping with CIS exception
// ============================================================

export type Region = 'europe' | 'cis' | 'asia' | 'americas' | 'oceania' | 'africa' | 'middle_east';

const COUNTRY_TO_REGION: Record<string, Region> = {
  // CIS (separate from Europe AND Asia)
  RU: 'cis', BY: 'cis', KZ: 'cis', UZ: 'cis',
  KG: 'cis', TJ: 'cis', TM: 'cis', AZ: 'cis', AM: 'cis',
  GE: 'cis', MD: 'cis',

  // Europe
  GB: 'europe', FR: 'europe', DE: 'europe', DK: 'europe',
  SE: 'europe', NO: 'europe', FI: 'europe', PL: 'europe',
  NL: 'europe', BE: 'europe', ES: 'europe', PT: 'europe',
  IT: 'europe', CH: 'europe', AT: 'europe', CZ: 'europe',
  SK: 'europe', HU: 'europe', RO: 'europe', BG: 'europe',
  UA: 'europe',
  EE: 'europe', LV: 'europe', LT: 'europe', IE: 'europe',
  GR: 'europe', HR: 'europe', SI: 'europe', RS: 'europe',
  BA: 'europe', MK: 'europe', AL: 'europe', ME: 'europe',
  XK: 'europe', LU: 'europe', MC: 'europe', MT: 'europe',
  IS: 'europe', CY: 'europe',

  // Asia
  CN: 'asia', MN: 'asia', KR: 'asia', JP: 'asia',
  VN: 'asia', TH: 'asia', ID: 'asia', PH: 'asia',
  MY: 'asia', SG: 'asia', IN: 'asia', PK: 'asia',
  BD: 'asia', LK: 'asia', NP: 'asia', MM: 'asia',
  KH: 'asia', LA: 'asia', TW: 'asia', HK: 'asia',
  MO: 'asia', KP: 'asia', BT: 'asia', MV: 'asia',

  // Americas
  US: 'americas', CA: 'americas', BR: 'americas',
  AR: 'americas', MX: 'americas', CL: 'americas',
  CO: 'americas', PE: 'americas', VE: 'americas',
  EC: 'americas', BO: 'americas', PY: 'americas',
  UY: 'americas', GT: 'americas', CR: 'americas',
  PA: 'americas', DO: 'americas', CU: 'americas',
  HN: 'americas', SV: 'americas', NI: 'americas',
  JM: 'americas', TT: 'americas', HT: 'americas',
  SR: 'americas', GY: 'americas', BZ: 'americas',
  BS: 'americas', BB: 'americas',

  // Oceania
  AU: 'oceania', NZ: 'oceania', FJ: 'oceania',
  PG: 'oceania', NC: 'oceania', WS: 'oceania',

  // Africa
  ZA: 'africa', EG: 'africa', MA: 'africa', TN: 'africa',
  NG: 'africa', KE: 'africa', GH: 'africa', DZ: 'africa',
  ET: 'africa', SN: 'africa', UG: 'africa', AO: 'africa',
  RW: 'africa', BW: 'africa', MU: 'africa',

  // Middle East
  IL: 'middle_east', TR: 'middle_east', SA: 'middle_east',
  AE: 'middle_east', QA: 'middle_east', JO: 'middle_east',
  LB: 'middle_east', KW: 'middle_east', BH: 'middle_east',
  OM: 'middle_east', IQ: 'middle_east', SY: 'middle_east',
  YE: 'middle_east', IR: 'middle_east', PS: 'middle_east',
};

export function getRegion(countryCode: string): Region {
  const r = COUNTRY_TO_REGION[countryCode.toUpperCase()];
  if (!r) {
    console.warn(`Unknown country code: ${countryCode}, defaulting to europe`);
    return 'europe';
  }
  return r;
}

export function isSameContinentGroup(a: string, b: string): boolean {
  return getRegion(a) === getRegion(b);
}

// ============================================================
// Chinese country name mapping (ISO 3166-1 alpha-2 → 中文)
// ============================================================

const COUNTRY_ZH: Record<string, string> = {
  RU: '俄罗斯', UA: '乌克兰', BY: '白俄罗斯', KZ: '哈萨克斯坦', UZ: '乌兹别克斯坦',
  KG: '吉尔吉斯斯坦', TJ: '塔吉克斯坦', TM: '土库曼斯坦', AZ: '阿塞拜疆', AM: '亚美尼亚',
  GE: '格鲁吉亚', MD: '摩尔多瓦',
  GB: '英国', FR: '法国', DE: '德国', DK: '丹麦',
  SE: '瑞典', NO: '挪威', FI: '芬兰', PL: '波兰',
  NL: '荷兰', BE: '比利时', ES: '西班牙', PT: '葡萄牙',
  IT: '意大利', CH: '瑞士', AT: '奥地利', CZ: '捷克',
  SK: '斯洛伐克', HU: '匈牙利', RO: '罗马尼亚', BG: '保加利亚',
  EE: '爱沙尼亚', LV: '拉脱维亚', LT: '立陶宛', IE: '爱尔兰',
  GR: '希腊', HR: '克罗地亚', SI: '斯洛文尼亚', RS: '塞尔维亚',
  BA: '波黑', MK: '北马其顿', AL: '阿尔巴尼亚', ME: '黑山',
  XK: '科索沃', LU: '卢森堡', IS: '冰岛', CY: '塞浦路斯',
  CN: '中国', MN: '蒙古', KR: '韩国', JP: '日本',
  VN: '越南', TH: '泰国', ID: '印尼', PH: '菲律宾',
  MY: '马来西亚', SG: '新加坡', IN: '印度', PK: '巴基斯坦',
  TW: '台湾', HK: '香港',
  US: '美国', CA: '加拿大', BR: '巴西',
  AR: '阿根廷', MX: '墨西哥', CL: '智利',
  CO: '哥伦比亚', PE: '秘鲁', GT: '危地马拉', DO: '多米尼加',
  AU: '澳大利亚', NZ: '新西兰',
  ZA: '南非', EG: '埃及', MA: '摩洛哥', TN: '突尼斯', NG: '尼日利亚',
  IL: '以色列', TR: '土耳其', SA: '沙特',
  AE: '阿联酋', QA: '卡塔尔', JO: '约旦', LB: '黎巴嫩',
};

export function getChineseCountryName(code: string): string {
  return COUNTRY_ZH[code.toUpperCase()] ?? code.toUpperCase();
}
