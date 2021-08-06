import hit from 'assets/Skil_Saw_Hit_Body.mp3';
import choir from 'assets/Angelical_Choir.mp3';
import monsterRoarAggressive from 'assets/Monster_Roar_Aggressive.mp3';

export default [
  {
    id: 'hit',
    file: hit,
    tags: ['sfx'],
    sprites: [
      { id: 'hit1', start: 250, duration: 800 },
      { id: 'hit2', start: 1000, duration: 2000 },
      { id: 'hit3', start: 3000, duration: 1000 },
    ]
  },
  {
    id: 'choir',
    file: choir,
    tags: ['sfx'],
    sprites: [
      { id: 'choir1', start: 0, duration: 730 },
      { id: 'choir2', start: 800, duration: 1800 },
    ]
  },
  {
    id: 'monsterRoarAggr',
    file: monsterRoarAggressive,
    tags: ['sfx'],
    sprites: [
      { id: 'roar2', start: 1000, duration: 1500 },
    ]
  }
];