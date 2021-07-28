export default function fiend(entity) {
  const shouldMove = Math.random() >= 0.7;
  if (!shouldMove) return;
  const rndx = Math.round((Math.random() * 2) - 1);
  const rndy = Math.round((Math.random() * 2) - 1);
  const movable = entity.getOne('Movable');
  movable.update({
    dx: rndx,
    dy: rndy,
  });
}