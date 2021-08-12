import scripts from "data/scripts";

class ScriptManager {
  constructor(game) {
    this.game = game;
  }

  runScript(scriptId, ...params) {
    const script = scripts.find(({ id }) => id == scriptId);
    if (!script) throw new Error(`Script "${scriptId}" not found.`);
    script.script.call(this.game, ...params);
  }
}

export default ScriptManager;
