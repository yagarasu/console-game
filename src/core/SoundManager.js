import { Howl } from 'howler';
import sounds from 'data/sounds';
import soundBinding from 'data/soundBinding';

class SoundManager {
  constructor(messageQueue) {
    this.messageQueue = messageQueue;
    this.sounds = {};

    this.messageQueue.addConsumer(this.consumer.bind(this));
  }

  consumer() {
    return next => message => {
      next();
      soundBinding
        .filter(soundBind => soundBind.test(message))
        .forEach(soundBind => soundBind.run(message, this.sounds, this.play.bind(this)));
    };
  }

  initialize() {
    sounds.forEach(({ id, file, sprites }) => {
      this.sounds[id] = new Howl({
        src: [file],
        preload: true,
        sprite: sprites.reduce((acc, {id, start, duration}) => ({ ...acc, [id]: [start, duration] }), {}),
      });
    });
  }

  play(id, sprite) {
    if (!this.sounds[id]) throw new Error(`Sound "${id}" not registered.`);
    this.sounds[id].play(sprite);
  }
}

export default SoundManager;
