import tracery from "tracery-grammar";

class NameGenerator {
  static generateMobName() {
    const grammar = tracery.createGrammar({
      V: ['a', 'e', 'i', 'o', 'u'],
      D: ['ae', 'ai', 'oe'],
      W: [ '#V#', '#D#' ],

      C: ['b', 'p', 't', 'd', 'k', 'g', 'm', 'n', 'r', 'l', 's', 'h', 'q'],
      MC: ['mm', 'ss', 'th', 'gh', 'zh', '#C#', '#C#', '#C#'],
      IC: ['kh', 'rh', '#C#', '#C#', '#C#'],
      EC: ['th', 's', 'n', 'kh', 'sh'],

      InitSyl: ['#V#', '#IC##V#'],

      SMidSyl: ['#C##V#'],
      MidSyl1: ['#MC##V#'],
      MidSyl2: ['#MC##V##C#'],
      MidSyl3: ['#MC##W#'],
      MidSyl4: ['#MC##W##C#'],

      MidSyl: ['', '#MidSyl1#', '#MidSyl2#', '#MidSyl3#', '#MidSyl4#'],
      MidSyls: ['', '#MidSyl#', '#MidSyl##SMidSyl#'],

      EndSyl: ['#W##EC#'],
      
      name: ['#InitSyl##MidSyls##EndSyl#', '#InitSyl##EndSyl# #MidSyls##EndSyl#']
    });
    const name = grammar.flatten('#name#');
    return name
      .replace(/[aeiou]{3,}/g, 'ae');
  }
}

export default NameGenerator;
