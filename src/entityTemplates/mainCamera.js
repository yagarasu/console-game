export default function mainCamera(id, x, y, screen) {
  return {
    id,
    tags: ['MainCamera'],
    components: [
      {
        type: 'Viewport',
        key: 'Viewport',
        x,
        y,
        width: screen.getDisplay().getOptions().width,
        height: screen.getDisplay().getOptions().height,
      }
    ]
  }
}
