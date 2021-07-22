import { createContainer as buildContainer, asValue, asClass, asFunction, Lifetime } from 'awilix';
import config from 'data/config';
import Screen from 'core/Screen';
import * as renderers from 'core/Screen/renderers';
import Scheduler from 'core/Scheduler';
import EventQueue from 'core/EventQueue';
import EntityManager from 'core/EntityManager';
import MapManager from 'core/Map/MapManager';
import EntityFactory from 'core/EntityFactory';
import Keyboard from 'core/Keyboard';
import KeyBinder from 'core/Keyboard/KeyBinder';
import * as controllers from 'controllers';
import CollisionDetector from 'core/CollisionDetector';
import CollisionResolver from 'core/CollisionResolver';
import * as systems from 'systems';
import AiManager from 'core/AI/AiManager';

function createContainer() {
  const container = buildContainer();

  container.register({
    config: asValue(config),
    Screen: asClass(Screen, { lifetime: Lifetime.SINGLETON }),
    Scheduler: asClass(Scheduler, { lifetime: Lifetime.SINGLETON }),
    EventQueue: asClass(EventQueue, { lifetime: Lifetime.SINGLETON }),
    EntityManager: asClass(EntityManager, { lifetime: Lifetime.SINGLETON }),
    MapManager: asClass(MapManager, { lifetime: Lifetime.SINGLETON }),
    EntityFactory: asValue(EntityFactory),
    Keyboard: asClass(Keyboard, { lifetime: Lifetime.SINGLETON }),
    KeyBinder: asClass(KeyBinder, { lifetime: Lifetime.SINGLETON }),
    CollisionDetector: asClass(CollisionDetector, { lifetime: Lifetime.SINGLETON }),
    CollisionResolver: asClass(CollisionResolver, { lifetime: Lifetime.SINGLETON }),
    AiManager: asClass(AiManager, { lifetime: Lifetime.SINGLETON }),
  });

  Object.keys(renderers).forEach((rendererName) => {
    const renderer = renderers[rendererName];
    container.register({
      [rendererName]: asClass(renderer, { lifetime: Lifetime.SINGLETON })
    })
  });

  Object.keys(systems).forEach((systemName) => {
    const system = systems[systemName];
    container.register({
      [systemName]: asClass(system, { lifetime: Lifetime.SINGLETON })
    })
  });

  Object.keys(controllers).forEach((controllerName) => {
    const controller = controllers[controllerName];
    container.register({
      [controllerName]: asFunction(controller)
    })
  });

  return container;
}

export default createContainer;
