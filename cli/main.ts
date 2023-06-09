import { Command } from "cliffy/command/mod.ts";
import { App } from "@/cli/tui/mod.ts";
import { parse } from "@/cli/duration-string.ts";
import { newTask } from "@/task/mod.ts";

const command = await new Command()
  .name("timebox")
  .version("0.0.1")
  .description("Timebox a task for productivity!")
  .example(
    "Start a timebox and monitor it",
    `timebox 1h30m5s "Make TODO list" --monitor`,
  )
  .option("--monitor", "View current task and time countdown")
  .arguments("<duration:string> [name:string]")
  .parse(Deno.args);

try {
  const ttl = parse(command.args[0]);
  const task = newTask(ttl, command.args[1]);

  if (command.options.monitor) {
    App(task).mount();
  } else {
    await task.start();
    console.log("Done");
  }
} catch (err) {
  console.error(err.message);
}
