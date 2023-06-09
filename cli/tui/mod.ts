import { Canvas, Tui } from "tui/mod.ts";
import { Task } from "@/task/mod.ts";
import { TaskKeeper } from "@/cli/tui/task-keeper.ts"

export const App = (task: Task) => {
  const tui = new Tui({
    canvas: new Canvas({
      refreshRate: 1000 / 60, // Run in 60FPS
      stdout: Deno.stdout,
    }),
  });

  const taskKeeper = TaskKeeper(tui, task)

  return {
    tui,
    mount: function() {
      tui.dispatch();
      tui.run();
      taskKeeper.onMount();
    }
  }
}
