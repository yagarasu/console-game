import defaultKeyMapping from './defaultKeyMapping';
import defaultTileset from './defaultTileset';

export default {
  screen: {
    fontSize: 24,
  },
  scheduler: {
    fps: 30
  },
  keymap: defaultKeyMapping,
  maps: {
    defaultTileset,
  }
};
