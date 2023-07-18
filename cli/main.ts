import { Command } from "cliffy/command/mod.ts";
import { App } from "@/cli/tui/mod.ts";
import { parse } from "@/cli/duration-string.ts";
import { newTask } from "@/task/mod.ts";

const command = await new Command()
  .name("timebox")
  .version("0.0.2")
  .description("Timebox a task for productivity!")
  .example(
    "Start a timebox and monitor it",
    `timebox 1h30m5s "Make TODO list" --monitor`,
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
