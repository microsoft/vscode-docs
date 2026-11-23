import { readFile } from 'node:fs/promises';

// eslint-disable-next-line security/detect-non-literal-fs-filename -- This URL identifies only the checked-in sibling manifest.
const manifest = JSON.parse(await readFile(new URL('./extension.json', import.meta.url), 'utf8'));

export function declaredCanvas(id, handlers) {
  const declaration = manifest.canvases.find(canvas => canvas.id === id);
  if (!declaration || declaration.actions.length !== Object.keys(handlers).length ||
      declaration.actions.some(action => typeof Reflect.get(handlers, action.name) !== 'function')) {
    throw new Error(`Canvas declaration and action handlers differ: ${id}`);
  }
  return {
    ...declaration,
    actions: declaration.actions.map(action => ({ ...action, handler: Reflect.get(handlers, action.name) }))
  };
}
