import type { Player } from '../types/game';

// ============================================================
// ProGusser Player Database (~200 players)
// CS2 Tier-1 teams + CSGO Major champions + CN players + casters
// Rosters verified against HLTV.org as of July 2026
// ============================================================

// teamNationality: null = international, country string = 3+ same nationality

export const PLAYERS: Player[] = [
  // ==========================================
  // VITALITY [#1 HLTV] — international (2 FR)
  // ==========================================
  { id: 'zywoo',    name: 'ZywOo',     country: 'FR', team: 'Vitality', teamNationality: null, age: 25, majorCount: 3, position: 'AWPer',  topRanking: 1 },
  { id: 'ropz',     name: 'ropz',      country: 'EE', team: 'Vitality', teamNationality: null, age: 26, majorCount: 3, position: 'Rifler', topRanking: 3 },
  { id: 'flamez',   name: 'flameZ',    country: 'IL', team: 'Vitality', teamNationality: null, age: 22, majorCount: 2, position: 'Rifler', topRanking: 7 },
  { id: 'mezii',    name: 'mezii',     country: 'GB', team: 'Vitality', teamNationality: null, age: 27, majorCount: 2, position: 'Rifler', topRanking: 12 },
  { id: 'apex',     name: 'apEX',      country: 'FR', team: 'Vitality', teamNationality: null, age: 33, majorCount: 4, position: 'IGL',    topRanking: 21 },
  { id: 'xtqzzz',   name: 'XTQZZZ',    country: 'FR', team: 'Vitality', teamNationality: null, age: 36, majorCount: 0, position: 'Coach',  topRanking: 21 },

  // ==========================================
  // FURIA [#2 HLTV] — BR (3 BR + LV + RU)
  // ==========================================
  { id: 'kscerato', name: 'KSCERATO',  country: 'BR', team: 'FURIA', teamNationality: 'BR', age: 25, majorCount: 0, position: 'Rifler', topRanking: 9 },
  { id: 'yuurih',   name: 'yuurih',    country: 'BR', team: 'FURIA', teamNationality: 'BR', age: 25, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'fallen',   name: 'FalleN',    country: 'BR', team: 'FURIA', teamNationality: 'BR', age: 34, majorCount: 2, position: 'IGL',    topRanking: 2 },
  { id: 'yekindar', name: 'YEKINDAR',  country: 'LV', team: 'FURIA', teamNationality: 'BR', age: 26, majorCount: 0, position: 'Rifler', topRanking: 8 },
  { id: 'molodoy',  name: 'molodoy',   country: 'RU', team: 'FURIA', teamNationality: 'BR', age: 18, majorCount: 0, position: 'Rifler', topRanking: 6 },

  // ==========================================
  // MOUZ [#3 HLTV] — international (2 IL)
  // ==========================================
  { id: 'xertion',  name: 'xertioN',   country: 'IL', team: 'MOUZ', teamNationality: null, age: 21, majorCount: 0, position: 'IGL',    topRanking: 16 },
  { id: 'torzsi',   name: 'torzsi',    country: 'HU', team: 'MOUZ', teamNationality: null, age: 23, majorCount: 0, position: 'AWPer',  topRanking: 17 },
  { id: 'spinx',    name: 'Spinx',     country: 'IL', team: 'MOUZ', teamNationality: null, age: 25, majorCount: 0, position: 'Rifler', topRanking: 10 },
  { id: 'xelex',    name: 'xelex',     country: 'RO', team: 'MOUZ', teamNationality: null, age: 18, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'pr',       name: 'PR',        country: 'CZ', team: 'MOUZ', teamNationality: null, age: 18, majorCount: 0, position: 'Rifler', topRanking: 21 },

  // ==========================================
  // FALCONS [#4 HLTV] — international
  // kyxsan BENCHED Apr 2026, karrigan IN
  // ==========================================
  { id: 'niko',     name: 'NiKo',      country: 'BA', team: 'Falcons', teamNationality: null, age: 29, majorCount: 1, position: 'Rifler', topRanking: 2 },
  { id: 'monesy',   name: 'm0NESY',    country: 'RU', team: 'Falcons', teamNationality: null, age: 20, majorCount: 1, position: 'AWPer',  topRanking: 4 },
  { id: 'teses',    name: 'TeSeS',     country: 'DK', team: 'Falcons', teamNationality: null, age: 25, majorCount: 1, position: 'Rifler', topRanking: 21 },
  { id: 'karrigan', name: 'karrigan',  country: 'DK', team: 'Falcons', teamNationality: null, age: 36, majorCount: 2, position: 'IGL',    topRanking: 21 },
  { id: 'kyousuke', name: 'kyousuke',  country: 'JP', team: 'Falcons', teamNationality: null, age: 18, majorCount: 1, position: 'Rifler', topRanking: 21 },
  { id: 'zonic',    name: 'zonic',     country: 'DK', team: 'Falcons', teamNationality: null, age: 39, majorCount: 5, position: 'Coach',  topRanking: 21 },

  // ==========================================
  // PARIVISION [#5 HLTV] — RU (all CIS)
  // BELCHONOKK/nota benched Jun 2026
  // ==========================================
  { id: 'jame',        name: 'Jame',        country: 'RU', team: 'PARIVISION', teamNationality: 'RU', age: 27, majorCount: 0, position: 'IGL',    topRanking: 10 },
  { id: 'belchonokk',  name: 'BELCHONOKK',  country: 'RU', team: 'PARIVISION', teamNationality: 'RU', age: 22, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'xielo',       name: 'xiELO',       country: 'RU', team: 'PARIVISION', teamNationality: 'RU', age: 23, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'nota',        name: 'nota',        country: 'RU', team: 'PARIVISION', teamNationality: 'RU', age: 21, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'zweih',       name: 'zweih',       country: 'RU', team: 'PARIVISION', teamNationality: 'RU', age: 18, majorCount: 0, position: 'Rifler', topRanking: 21 },

  // ==========================================
  // SPIRIT [#6 HLTV] — RU (all Russian)
  // chopper OUT, magixx = IGL
  // ==========================================
  { id: 'donk',    name: 'donk',     country: 'RU', team: 'Spirit', teamNationality: 'RU', age: 19, majorCount: 1, position: 'Rifler', topRanking: 2 },
  { id: 'sh1ro',   name: 'sh1ro',    country: 'RU', team: 'Spirit', teamNationality: 'RU', age: 24, majorCount: 1, position: 'AWPer',  topRanking: 5 },
  { id: 'magixx',  name: 'magixx',   country: 'RU', team: 'Spirit', teamNationality: 'RU', age: 22, majorCount: 1, position: 'IGL',    topRanking: 21 },
  { id: 'zont1x',  name: 'zont1x',   country: 'UA', team: 'Spirit', teamNationality: 'RU', age: 20, majorCount: 1, position: 'Rifler', topRanking: 21 },
  { id: 'tn1r',    name: 'tN1R',     country: 'RU', team: 'Spirit', teamNationality: 'RU', age: 25, majorCount: 1, position: 'Rifler', topRanking: 21 },
  { id: 'hally',   name: 'hally',    country: 'RU', team: 'Spirit', teamNationality: 'RU', age: 33, majorCount: 1, position: 'Coach',  topRanking: 21 },

  // ==========================================
  // NAVI — international (2 UA)
  // ==========================================
  { id: 'aleksib',    name: 'Aleksib',    country: 'FI', team: 'NAVI', teamNationality: null, age: 29, majorCount: 1, position: 'IGL',    topRanking: 21 },
  { id: 'im',         name: 'iM',         country: 'RO', team: 'NAVI', teamNationality: null, age: 26, majorCount: 1, position: 'Rifler', topRanking: 19 },
  { id: 'b1t',        name: 'b1t',        country: 'UA', team: 'NAVI', teamNationality: null, age: 23, majorCount: 1, position: 'Rifler', topRanking: 20 },
  { id: 'w0nderful',  name: 'w0nderful',  country: 'UA', team: 'NAVI', teamNationality: null, age: 21, majorCount: 1, position: 'AWPer',  topRanking: 21 },
  { id: 'makazze',    name: 'Makazze',    country: 'XK', team: 'NAVI', teamNationality: null, age: 19, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'blade',      name: 'B1ad3',      country: 'UA', team: 'NAVI', teamNationality: null, age: 38, majorCount: 1, position: 'Coach',  topRanking: 21 },

  // ==========================================
  // FAZE — international
  // karrigan LEFT for Falcons, Twistzz IGL
  // ==========================================
  { id: 'twistzz', name: 'Twistzz',  country: 'CA', team: 'FaZe', teamNationality: null, age: 26, majorCount: 2, position: 'IGL',    topRanking: 11 },
  { id: 'frozen',  name: 'frozen',   country: 'SK', team: 'FaZe', teamNationality: null, age: 23, majorCount: 0, position: 'Rifler', topRanking: 8 },
  { id: 'broky',   name: 'broky',    country: 'LV', team: '(Benched)', teamNationality: null, age: 25, majorCount: 1, position: 'AWPer',  topRanking: 21 },
  { id: 'jcobbb',  name: 'jcobbb',   country: 'PL', team: 'FaZe', teamNationality: null, age: 22, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'neityu',  name: 'Neityu',   country: 'FR', team: 'FaZe', teamNationality: null, age: 20, majorCount: 0, position: 'Rifler', topRanking: 21 },

  // ==========================================
  // G2 [#8 HLTV] — international (2 IL)
  // ==========================================
  { id: 'hunter',   name: 'huNter-',  country: 'BA', team: 'G2', teamNationality: null, age: 30, majorCount: 0, position: 'IGL',    topRanking: 21 },
  { id: 'nertz',    name: 'NertZ',    country: 'IL', team: 'G2', teamNationality: null, age: 26, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'heavygod', name: 'HeavyGod', country: 'IL', team: 'G2', teamNationality: null, age: 23, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'matys',    name: 'MATYS',    country: 'SK', team: 'G2', teamNationality: null, age: 24, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'r1nkle',   name: 'r1nkle',   country: 'UA', team: 'G2', teamNationality: null, age: 21, majorCount: 0, position: 'AWPer',  topRanking: 21 },

  // ==========================================
  // LIQUID — international
  // siuhy/ultimate BENCHED Jul 2026, JT from Complexity
  // ==========================================
  { id: 'jt_liq',  name: 'JT',       country: 'ZA', team: 'Liquid', teamNationality: null, age: 27, majorCount: 0, position: 'IGL',    topRanking: 21 },
  { id: 'elige',   name: 'EliGE',    country: 'US', team: 'Liquid', teamNationality: null, age: 28, majorCount: 0, position: 'Rifler', topRanking: 8 },
  { id: 'naf',     name: 'NAF',      country: 'CA', team: 'Liquid', teamNationality: null, age: 28, majorCount: 0, position: 'Rifler', topRanking: 6 },
  { id: 'malbsmd', name: 'malbsMd',  country: 'GT', team: 'Liquid', teamNationality: null, age: 23, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'jorko',   name: 'Jorko',    country: 'BG', team: 'Liquid', teamNationality: null, age: 17, majorCount: 0, position: 'AWPer',  topRanking: 21 },

  // ==========================================
  // HEROIC — international
  // ==========================================
  { id: 'brollan', name: 'Brollan',  country: 'SE', team: 'HEROIC', teamNationality: null, age: 24, majorCount: 0, position: 'Rifler', topRanking: 11 },
  { id: 'nilo',    name: 'nilo',     country: 'SE', team: 'HEROIC', teamNationality: null, age: 21, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'susp',    name: 'susp',     country: 'SE', team: 'HEROIC', teamNationality: null, age: 22, majorCount: 0, position: 'AWPer',  topRanking: 21 },
  { id: 'chr1zn',  name: 'Chr1zN',   country: 'DK', team: 'HEROIC', teamNationality: null, age: 19, majorCount: 0, position: 'IGL',    topRanking: 21 },
  { id: 'martinezsa', name: 'MartinezSa', country: 'ES', team: 'HEROIC', teamNationality: null, age: 21, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'xfl0ud',  name: 'xfl0ud',   country: 'TR', team: 'FUT Esports', teamNationality: null, age: 23, majorCount: 0, position: 'Rifler', topRanking: 21 },

  // ==========================================
  // 3DMAX — FR (all French)
  // ==========================================
  { id: 'maka',      name: 'Maka',      country: 'FR', team: '3DMAX', teamNationality: 'FR', age: 25, majorCount: 0, position: 'IGL',    topRanking: 21 },
  { id: 'lucky_fr',  name: 'Lucky',     country: 'FR', team: '3DMAX', teamNationality: 'FR', age: 24, majorCount: 0, position: 'AWPer',  topRanking: 21 },
  { id: 'bodyy',     name: 'bodyy',     country: 'FR', team: '3DMAX', teamNationality: 'FR', age: 28, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'ex3rcice',  name: 'Ex3rcice',  country: 'FR', team: '3DMAX', teamNationality: 'FR', age: 22, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'graviti',   name: 'Graviti',   country: 'FR', team: '3DMAX', teamNationality: 'FR', age: 20, majorCount: 0, position: 'Rifler', topRanking: 21 },

  // ==========================================
  // paiN — BR (all Brazilian)
  // ==========================================
  { id: 'biguzera', name: 'biguzera', country: 'BR', team: 'paiN', teamNationality: 'BR', age: 27, majorCount: 0, position: 'IGL',    topRanking: 21 },
  { id: 'nqz',      name: 'nqz',      country: 'BR', team: 'paiN', teamNationality: 'BR', age: 20, majorCount: 0, position: 'AWPer',  topRanking: 21 },
  { id: 'snow_br',  name: 'snow',     country: 'BR', team: 'paiN', teamNationality: 'BR', age: 24, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'piriajr',  name: 'piriajr',  country: 'BR', team: 'paiN', teamNationality: 'BR', age: 20, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'vsm',      name: 'vsm',      country: 'BR', team: 'paiN', teamNationality: 'BR', age: 22, majorCount: 0, position: 'Rifler', topRanking: 21 },

  // ==========================================
  // ASTRALIS — DK (4 DK + 1 SE)
  // device LEFT late 2025
  // ==========================================
  { id: 'hooxi',  name: 'HooXi',  country: 'DK', team: 'Astralis', teamNationality: 'DK', age: 29, majorCount: 0, position: 'IGL',    topRanking: 21 },
  { id: 'jabbi',  name: 'jabbi',  country: 'DK', team: 'Astralis', teamNationality: 'DK', age: 22, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'staehr', name: 'Staehr', country: 'DK', team: 'Astralis', teamNationality: 'DK', age: 22, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'ryu',    name: 'ryu',    country: 'LT', team: 'Astralis', teamNationality: 'DK', age: 19, majorCount: 0, position: 'AWPer',  topRanking: 21 },
  { id: 'phzy',   name: 'phzy',   country: 'SE', team: 'Astralis', teamNationality: 'DK', age: 23, majorCount: 0, position: 'AWPer',  topRanking: 21 },

  // ==========================================
  // VIRTUS.PRO — RU (full rebuild Feb-Mar 2026)
  // fame/FL1T/n0rb3r7 ALL benched
  // ==========================================
  { id: 'mir',     name: 'mir',     country: 'RU', team: 'Virtus.pro', teamNationality: 'RU', age: 29, majorCount: 0, position: 'IGL',    topRanking: 21 },
  { id: 'icy',     name: 'ICY',     country: 'RU', team: 'Virtus.pro', teamNationality: 'RU', age: 20, majorCount: 0, position: 'AWPer',  topRanking: 21 },
  { id: 'fl4mus',  name: 'FL4MUS',  country: 'RU', team: 'Virtus.pro', teamNationality: 'RU', age: 21, majorCount: 0, position: 'Rifler', topRanking: 21 },

  // ==========================================
  // THE MONGOLZ — MN
  // Senzu→BC.Game, mzinho→BC.Game, cobrazera benched
  // ==========================================
  { id: 'blitz',       name: 'bLitz',       country: 'MN', team: 'The MongolZ', teamNationality: 'MN', age: 24, majorCount: 0, position: 'IGL',    topRanking: 21 },
  { id: 'techno4k',    name: 'Techno4K',    country: 'MN', team: 'The MongolZ', teamNationality: 'MN', age: 22, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: '_910',        name: '910',         country: 'MN', team: 'The MongolZ', teamNationality: 'MN', age: 21, majorCount: 0, position: 'AWPer',  topRanking: 21 },
  { id: 'tikuak',      name: 'tikuak',      country: 'MN', team: 'The MongolZ', teamNationality: 'MN', age: 17, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'darkmeister', name: 'DarkMeister', country: 'MN', team: 'The MongolZ', teamNationality: 'MN', age: 18, majorCount: 0, position: 'Rifler', topRanking: 21 },

  // ==========================================
  // BC.GAME ESPORTS [#30 HLTV] — international
  // NEW team: s1mple + electroNic + Senzu + Magisk + mzinho
  // ==========================================
  { id: 's1mple',     name: 's1mple',     country: 'UA', team: 'BC.Game', teamNationality: null, age: 28, majorCount: 1, position: 'AWPer',  topRanking: 1 },
  { id: 'electronic', name: 'electroNic', country: 'RU', team: 'BC.Game', teamNationality: null, age: 27, majorCount: 0, position: 'Rifler', topRanking: 4 },
  { id: 'senzu',      name: 'Senzu',      country: 'MN', team: 'BC.Game', teamNationality: null, age: 21, majorCount: 0, position: 'Rifler', topRanking: 13 },
  { id: 'magisk',     name: 'Magisk',     country: 'DK', team: 'BC.Game', teamNationality: null, age: 27, majorCount: 3, position: 'IGL',    topRanking: 5 },
  { id: 'mzinho',     name: 'mzinho',     country: 'MN', team: 'BC.Game', teamNationality: null, age: 19, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'taz',        name: 'TaZ',        country: 'PL', team: 'BC.Game', teamNationality: null, age: 40, majorCount: 0, position: 'Coach',  topRanking: 21 },

  // ==========================================
  // 100 THIEVES — international (rebuilding)
  // device + rain confirmed, gla1ve coach
  // ==========================================
  { id: 'device', name: 'device', country: 'DK', team: '100 Thieves', teamNationality: null, age: 29, majorCount: 4, position: 'AWPer',  topRanking: 3 },
  { id: 'rain',   name: 'rain',   country: 'NO', team: '100 Thieves', teamNationality: null, age: 30, majorCount: 1, position: 'Rifler', topRanking: 4 },
  { id: 'gla1ve', name: 'gla1ve', country: 'DK', team: '100 Thieves', teamNationality: null, age: 30, majorCount: 4, position: 'Coach',  topRanking: 8 },

  // ==========================================
  // ETERNAL FIRE — TR (all Turkish)
  // ==========================================
  { id: 'xantares', name: 'XANTARES', country: 'TR', team: 'Eternal Fire', teamNationality: 'TR', age: 30, majorCount: 0, position: 'Rifler', topRanking: 14 },
  { id: 'woxic',    name: 'woxic',    country: 'TR', team: 'Eternal Fire', teamNationality: 'TR', age: 27, majorCount: 0, position: 'AWPer',  topRanking: 12 },
  { id: 'imorr',    name: 'imoRR',    country: 'TR', team: 'Eternal Fire', teamNationality: 'TR', age: 23, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'jottaaa',  name: 'jottaaa',  country: 'TR', team: 'Eternal Fire', teamNationality: 'TR', age: 22, majorCount: 0, position: 'IGL',    topRanking: 21 },
  { id: 'wicadia',  name: 'Wicadia',  country: 'TR', team: 'Eternal Fire', teamNationality: 'TR', age: 20, majorCount: 0, position: 'Rifler', topRanking: 21 },

  // ==========================================
  // AURORA — RU (4 RU + Jimpphat FI)
  // ==========================================
  { id: 'jimpphat', name: 'Jimpphat', country: 'FI', team: 'Aurora', teamNationality: 'RU', age: 19, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'lack1',    name: 'Lack1',    country: 'RU', team: 'Aurora', teamNationality: 'RU', age: 25, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'deko',     name: 'deko',     country: 'RU', team: 'Aurora', teamNationality: 'RU', age: 24, majorCount: 0, position: 'AWPer',  topRanking: 21 },
  { id: 'kensi',    name: 'KENSI',    country: 'RU', team: 'Aurora', teamNationality: 'RU', age: 23, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'norwi',    name: 'Norwi',    country: 'RU', team: 'Aurora', teamNationality: 'RU', age: 24, majorCount: 0, position: 'IGL',    topRanking: 21 },

  // ==========================================
  // COMPLEXITY — US (3 US + hallzerk NO)
  // JT→Liquid, needs new IGL
  // ==========================================
  { id: 'grim',     name: 'Grim',     country: 'US', team: 'Complexity', teamNationality: 'US', age: 24, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'floppy',   name: 'floppy',   country: 'US', team: 'Complexity', teamNationality: 'US', age: 25, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'hallzerk', name: 'hallzerk', country: 'NO', team: 'Complexity', teamNationality: 'US', age: 25, majorCount: 0, position: 'AWPer',  topRanking: 21 },
  { id: 'cxzi',     name: 'Cxzi',     country: 'US', team: 'Complexity', teamNationality: 'US', age: 23, majorCount: 0, position: 'Rifler', topRanking: 21 },

  // ==========================================
  // BIG — DE (all German)
  // ==========================================
  { id: 'tabsen',  name: 'tabseN',  country: 'DE', team: 'BIG', teamNationality: 'DE', age: 30, majorCount: 0, position: 'IGL',    topRanking: 21 },
  { id: 'syrson',  name: 'syrsoN',  country: 'DE', team: 'BIG', teamNationality: 'DE', age: 28, majorCount: 0, position: 'AWPer',  topRanking: 21 },
  { id: 'krimbo',  name: 'Krimbo',  country: 'DE', team: 'BIG', teamNationality: 'DE', age: 23, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'jdc',     name: 'JDC',     country: 'DE', team: 'BIG', teamNationality: 'DE', age: 22, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'prosus',  name: 'prosus',  country: 'DE', team: 'BIG', teamNationality: 'DE', age: 20, majorCount: 0, position: 'Rifler', topRanking: 21 },

  // ==========================================
  // MIBR — BR (all Brazilian)
  // ==========================================
  { id: 'insani',  name: 'insani',  country: 'BR', team: 'MIBR', teamNationality: 'BR', age: 21, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'exit_br', name: 'exit',    country: 'BR', team: 'MIBR', teamNationality: 'BR', age: 25, majorCount: 0, position: 'IGL',    topRanking: 21 },
  { id: 'saffee',  name: 'saffee',  country: 'BR', team: 'MIBR', teamNationality: 'BR', age: 25, majorCount: 0, position: 'AWPer',  topRanking: 21 },
  { id: 'drop',    name: 'drop',    country: 'BR', team: 'MIBR', teamNationality: 'BR', age: 22, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'brnz4n',  name: 'brnz4n',  country: 'BR', team: 'MIBR', teamNationality: 'BR', age: 21, majorCount: 0, position: 'Rifler', topRanking: 21 },

  // ==========================================
  // LEGACY — BR (all Brazilian, rose to #9)
  // ==========================================
  { id: 'dumau',   name: 'dumau',   country: 'BR', team: 'Legacy', teamNationality: 'BR', age: 22, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'latto',   name: 'latto',   country: 'BR', team: 'Legacy', teamNationality: 'BR', age: 23, majorCount: 0, position: 'IGL',    topRanking: 21 },
  { id: 'saadzin', name: 'saadzin', country: 'BR', team: 'Legacy', teamNationality: 'BR', age: 21, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'n3w',     name: 'n3w',     country: 'BR', team: 'Legacy', teamNationality: 'BR', age: 20, majorCount: 0, position: 'AWPer',  topRanking: 21 },
  { id: 'neoz',    name: 'neoz',    country: 'BR', team: 'Legacy', teamNationality: 'BR', age: 21, majorCount: 0, position: 'Rifler', topRanking: 21 },

  // ==========================================
  // CSGO MAJOR CHAMPIONS (Historical, not on above teams)
  // ==========================================
  { id: 'dupreeh',      name: 'dupreeh',      country: 'DK', team: '(Retired)',    teamNationality: null, age: 33, majorCount: 5, position: 'Rifler', topRanking: 5 },
  { id: 'xyp9x',        name: 'Xyp9x',        country: 'DK', team: '(Retired)',    teamNationality: null, age: 30, majorCount: 4, position: 'Rifler', topRanking: 13 },
  { id: 'coldzera',     name: 'coldzera',     country: 'BR', team: '(Retired)',    teamNationality: null, age: 30, majorCount: 2, position: 'Rifler', topRanking: 1 },
  { id: 'fer',          name: 'fer',          country: 'BR', team: '(Retired)',    teamNationality: null, age: 33, majorCount: 2, position: 'Rifler', topRanking: 3 },
  { id: 'taco',         name: 'TACO',         country: 'BR', team: '(Retired)',    teamNationality: null, age: 30, majorCount: 2, position: 'Rifler', topRanking: 11 },
  { id: 'fnx',          name: 'fnx',          country: 'BR', team: '(Retired)',    teamNationality: null, age: 35, majorCount: 2, position: 'Rifler', topRanking: 21 },
  { id: 'jw',           name: 'JW',           country: 'SE', team: '(Retired)',    teamNationality: null, age: 30, majorCount: 3, position: 'AWPer',  topRanking: 5 },
  { id: 'flusha',       name: 'flusha',       country: 'SE', team: '(Retired)',    teamNationality: null, age: 31, majorCount: 3, position: 'Rifler', topRanking: 2 },
  { id: 'olofmeister',  name: 'olofmeister',  country: 'SE', team: '(Retired)',    teamNationality: null, age: 33, majorCount: 2, position: 'Rifler', topRanking: 1 },
  { id: 'krimz',        name: 'KRIMZ',        country: 'SE', team: '(Retired)',    teamNationality: null, age: 31, majorCount: 2, position: 'Rifler', topRanking: 6 },
  { id: 'pronax',       name: 'pronax',       country: 'SE', team: '(Retired)',    teamNationality: null, age: 34, majorCount: 3, position: 'IGL',    topRanking: 21 },
  { id: 'kennys',       name: 'kennyS',       country: 'FR', team: '(Retired)',    teamNationality: null, age: 30, majorCount: 1, position: 'AWPer',  topRanking: 6 },
  { id: 'shox',         name: 'shox',         country: 'FR', team: '(Retired)',    teamNationality: null, age: 33, majorCount: 1, position: 'Rifler', topRanking: 3 },
  { id: 'nbk',          name: 'NBK-',         country: 'FR', team: '(Retired)',    teamNationality: null, age: 31, majorCount: 2, position: 'Rifler', topRanking: 5 },
  { id: 'happy',        name: 'Happy',        country: 'FR', team: '(Retired)',    teamNationality: null, age: 34, majorCount: 2, position: 'IGL',    topRanking: 8 },
  { id: 'guardian',     name: 'GuardiaN',     country: 'SK', team: '(Retired)',    teamNationality: null, age: 34, majorCount: 0, position: 'AWPer',  topRanking: 2 },
  { id: 'cadian',       name: 'cadiaN',       country: 'DK', team: '(Free Agent)', teamNationality: null, age: 29, majorCount: 0, position: 'IGL',    topRanking: 18 },
  { id: 'stavn',        name: 'stavn',        country: 'DK', team: '(Free Agent)', teamNationality: null, age: 24, majorCount: 0, position: 'Rifler', topRanking: 9 },
  { id: 'jl',           name: 'jL',           country: 'LT', team: '(Free Agent)', teamNationality: null, age: 26, majorCount: 1, position: 'Rifler', topRanking: 15 },

  // ==========================================
  // GAMBIT CSGO ERA — PGL Krakow 2017 Major Champions
  // ==========================================
  { id: 'hobbit',   name: 'HObbit', country: 'KZ', team: '(Free Agent)', teamNationality: null, age: 31, majorCount: 1, position: 'Rifler', topRanking: 6 },
  { id: 'zeus',     name: 'Zeus',   country: 'UA', team: '(Retired)',    teamNationality: null, age: 38, majorCount: 1, position: 'IGL',    topRanking: 21 },

  // ==========================================
  // CHINESE PLAYERS — TYLOO (CN)
  // ==========================================
  { id: 'jamyoung',  name: 'JamYoung',  country: 'CN', team: 'TYLOO', teamNationality: 'CN', age: 23, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'jee',       name: 'JEE',       country: 'CN', team: 'TYLOO', teamNationality: 'CN', age: 21, majorCount: 0, position: 'AWPer',  topRanking: 21 },
  { id: 'mercury',   name: 'Mercury',   country: 'CN', team: 'TYLOO', teamNationality: 'CN', age: 23, majorCount: 0, position: 'IGL',    topRanking: 21 },
  { id: 'moseyuh',   name: 'Moseyuh',   country: 'CN', team: 'TYLOO', teamNationality: 'CN', age: 22, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'attacker',  name: 'Attacker',  country: 'CN', team: 'TYLOO', teamNationality: 'CN', age: 28, majorCount: 0, position: 'Rifler', topRanking: 21 },

  // ==========================================
  // CHINESE PLAYERS — LVG (CN)
  // ==========================================
  { id: 'westmelon',   name: 'Westmelon',   country: 'CN', team: 'LVG', teamNationality: 'CN', age: 22, majorCount: 0, position: 'IGL',    topRanking: 21 },
  { id: 'z4kr',        name: 'z4kr',        country: 'CN', team: 'LVG', teamNationality: 'CN', age: 21, majorCount: 0, position: 'AWPer',  topRanking: 21 },
  { id: 'starry',      name: 'Starry',      country: 'CN', team: 'LVG', teamNationality: 'CN', age: 20, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'emiliaqaq',   name: 'EmiliaQAQ',   country: 'CN', team: 'LVG', teamNationality: 'CN', age: 22, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'c4llm3su3',   name: 'C4LLM3SU3',   country: 'CN', team: 'LVG', teamNationality: 'CN', age: 22, majorCount: 0, position: 'Rifler', topRanking: 21 },

  // ==========================================
  // CHINESE PLAYERS — RA (Rare Atom) (CN)
  // ==========================================
  { id: 'kaze_cn',    name: 'kaze',     country: 'CN', team: 'RA', teamNationality: 'CN', age: 30, majorCount: 0, position: 'AWPer',  topRanking: 21 },
  { id: 'somebody',   name: 'somebody', country: 'CN', team: 'RA', teamNationality: 'CN', age: 28, majorCount: 0, position: 'Rifler', topRanking: 21 },

  // ==========================================
  // RETIRED CHINESE LEGENDS
  // ==========================================
  { id: 'danking',    name: 'DANK1NG',    country: 'CN', team: '(Retired)', teamNationality: null, age: 25, majorCount: 0, position: 'AWPer',  topRanking: 21 },
  { id: 'summer_cn',  name: 'Summer',     country: 'CN', team: '(Retired)', teamNationality: null, age: 28, majorCount: 0, position: 'IGL',    topRanking: 21 },
  { id: 'advent',     name: 'advent',     country: 'CN', team: '(Retired)', teamNationality: null, age: 29, majorCount: 0, position: 'IGL',    topRanking: 21 },
  { id: 'zhoking',    name: 'zhokiNg',    country: 'CN', team: '(Retired)', teamNationality: null, age: 31, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'captainmo',  name: 'captainMo',  country: 'CN', team: '(Retired)', teamNationality: null, age: 34, majorCount: 0, position: 'IGL',    topRanking: 21 },
  { id: 'qz',         name: 'QZ',         country: 'CN', team: '(Retired)', teamNationality: null, age: 33, majorCount: 0, position: 'AWPer',  topRanking: 21 },
  

  // ==========================================
  // CN CASTERS & PERSONALITIES
  // ==========================================
  { id: 'wanjiqi',    name: 'MachineWJQ',    country: 'CN', team: '(Caster)', teamNationality: null, age: 28, majorCount: 0, position: 'Caster', topRanking: 21 },
 
  // ==========================================
  // INTERNATIONAL CASTERS & PERSONALITIES
  // ==========================================
  { id: 'banks',      name: 'Banks',      country: 'US', team: '(Caster)', teamNationality: null, age: 34, majorCount: 0, position: 'Caster', topRanking: 21 },
  { id: 'spunj',      name: 'SPUNJ',      country: 'AU', team: '(Caster)', teamNationality: null, age: 34, majorCount: 0, position: 'Caster', topRanking: 14 },
  { id: 'machine',    name: 'Machine',    country: 'GB', team: '(Caster)', teamNationality: null, age: 32, majorCount: 0, position: 'Caster', topRanking: 21 },


  // ==========================================
  // BENCHED / RECENTLY ACTIVE NOTABLE PLAYERS
  // ==========================================
  { id: 'chopper',    name: 'chopper',    country: 'RU', team: '(Benched)',  teamNationality: null, age: 29, majorCount: 1, position: 'IGL',    topRanking: 21 },
  { id: 'kyxsan',     name: 'kyxsan',     country: 'MK', team: '(Benched)',  teamNationality: null, age: 24, majorCount: 0, position: 'IGL',    topRanking: 21 },
  { id: 'siuhy',      name: 'siuhy',      country: 'PL', team: '(Benched)',  teamNationality: null, age: 23, majorCount: 0, position: 'IGL',    topRanking: 21 },
  { id: 'ultimate',   name: 'ultimate',   country: 'PL', team: '(Benched)',  teamNationality: null, age: 22, majorCount: 0, position: 'AWPer',  topRanking: 21 },
  { id: 'sunpayus',   name: 'SunPayus',   country: 'ES', team: '(Benched)',  teamNationality: null, age: 26, majorCount: 0, position: 'AWPer',  topRanking: 21 },
  { id: 'perfecto',   name: 'Perfecto',   country: 'RU', team: '(Benched)',  teamNationality: null, age: 26, majorCount: 1, position: 'Rifler', topRanking: 11 },
  { id: 'ax1le',      name: 'Ax1Le',      country: 'RU', team: '(Free Agent)', teamNationality: null, age: 24, majorCount: 0, position: 'Rifler', topRanking: 4 },
  { id: 'blamef',     name: 'blameF',     country: 'DK', team: '(Free Agent)', teamNationality: null, age: 26, majorCount: 0, position: 'Rifler', topRanking: 6 },
  { id: 'fame',       name: 'fame',       country: 'RU', team: '(Benched)',  teamNationality: null, age: 23, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'fl1t',       name: 'FL1T',       country: 'RU', team: '(Benched)',  teamNationality: null, age: 25, majorCount: 0, position: 'Rifler', topRanking: 21 },
  { id: 'nafany',     name: 'nafany',     country: 'RU', team: '(Free Agent)', teamNationality: null, age: 24, majorCount: 0, position: 'IGL',    topRanking: 21 },
  { id: 'interz',     name: 'interz',     country: 'RU', team: '(Free Agent)', teamNationality: null, age: 25, majorCount: 0, position: 'Rifler', topRanking: 21 },
];

// Verify no duplicate IDs
const ids = new Set<string>();
for (const p of PLAYERS) {
  if (ids.has(p.id)) {
    console.error(`Duplicate player ID: ${p.id}`);
  }
  ids.add(p.id);
}

console.log(`Player database loaded: ${PLAYERS.length} players`);
