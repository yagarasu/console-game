import { createContainer as buildContainer, asValue, asClass, Lifetime } from 'awilix';
import config from 'data/config';
import Screen from 'core/Screen';
import * as renderers from 'core/Screen/renderers';
import Scheduler from 'core/Scheduler';
import EntityManager from 'core/EntityManager';
import MapManager from 'core/Map/MapManager';
import EntityFactory from 'core/EntityFactory';

function createContainer() {
  const container = buildContainer();

  container.register({
    config: asValue(config),
    Screen: asClass(Screen, { lifetime: Lifetime.SINGLETON }),
    Scheduler: asClass(Scheduler, { lifetime: Lifetime.SINGLETON }),
    EntityManager: asClass(EntityManager, { lifetime: Lifetime.SINGLETON }),
    MapManager: asClass(MapManager, { lifetime: Lifetime.SINGLETON }),
    EntityFactory: asValue(EntityFactory),
  });

  Object.keys(renderers).forEach((rendererName) => {
    const renderer = renderers[rendererName];
    container.register({
      [rendererName]: asClass(renderer, { lifetime: Lifetime.SINGLETON })
    })
  });

  return container;
}

export default createContainer;
