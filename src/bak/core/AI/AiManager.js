import * as algorithms from './algorithms';

class AiManager {
  constructor (cradle) {
    this.cradle = cradle;
  }

  getAlgorithm(algorithmName) {
    const algorithm = algorithms[algorithmName];
    if (!algorithm) throw new Error(`Unknown algorithm "${algorithmName}"`);
    return algorithm(this.cradle);
  }
}

export default AiManager;
