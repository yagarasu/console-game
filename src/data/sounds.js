import hit from 'assets/Skil_Saw_Hit_Body.mp3';
import choir from 'assets/Angelical_Choir.mp3';
import monsterRoarAggressive from 'assets/Monster_Roar_Aggressive.mp3';
import thunder from 'assets/Thunder.mp3';
import chimes from 'assets/Wind_Chimes.mp3';

export default [
  {
    id: 'hit',
    file: hit,
    tags: ['sfx'],
    sprites: [
      { id: 'hit1', start: 571, duration: 1029 },
      { id: 'hit2', start: 2057, duration: 930  },
      { id: 'hit3', start: 3477, duration: 1078 },
      { id: 'hit4', start: 8179, duration: 1159 },
      { id: 'hit5', start: 13926, duration: 1045 },
    ]
  },
  {
    id: 'choir',
    file: choir,
    tags: ['sfx'],
    sprites: [
      { id: 'choir1', start: 48, duration: 941 },
      { id: 'choir2', start: 987, duration: 755 },
      { id: 'choir3', start: 2559, duration: 941 },
      { id: 'choir4', start: 4030, duration: 1621 },
    ]
  },
  {
    id: 'monsterRoarAggr',
    file: monsterRoarAggressive,
    tags: ['sfx'],
    sprites: [
      { id: 'dead', start: 5642, duration: 2261 },
    ]
  },
  {
    id: 'thunder',
    file: thunder,
    tags: ['sfx'],
    sprites: [
      { id: 'thunder', start: 318, duration: 1930 }
    ]
  },
  {
    id: 'chimes',
    file: chimes,
    tags: ['sfx'],
    sprites: [
      { id: 'chimes1', start: 1030, duration: 542 },
      { id: 'chimes2', start: 1604, duration: 648 },
      { id: 'chimes3', start: 2321, duration: 493 },
    ],
  }
];