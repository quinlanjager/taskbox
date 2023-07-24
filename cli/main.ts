import { Command } from "cliffy/command/mod.ts";
import { parse } from "@/cli/duration-string.ts";
import { newTask } from "@/task/mod.ts";

import { Canvas, Tui } from "tui/mod.ts";
import { Task } from "@/task/mod.ts";
import { TaskKeeper } from "@/cli/task-keeper.ts"

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

const command = await new Command()
  .name("timebox")
  .version("0.0.3")
  .description("Timebox a task for productivity!")
  .example(
    "Start a timebox and monitor it",
    `timebox 1h30m5s "Make TODO list"`,
  )
  .option("--headless", "Runs taskbox without displaying time remaining")
  .arguments("<duration:string> [name:string]")
  .parse(Deno.args);

try {
  const ttl = parse(command.args[0]);
  const task = newTask(ttl, command.args[1]);

  if (command.options.headless) {
    await task.start();
    console.log("DONE");
  } else {
    App(task).mount();
  }
} catch (err) {
  console.error(err.message);
}
