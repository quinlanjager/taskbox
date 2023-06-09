import { Command } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";
import { newTask } from "@/task/mod.ts";
import { mount } from "@/cli/task-view.ts";
import { parse } from "@/cli/duration-string.ts";

const command = await new Command()
  .name("timebox")
  .version("0.1.0")
  .description("Timebox a task for productivity!")
  .example(
    "Start a timebox and monitor it",
    `timebox 1 "Make TODO list" --monitor`,
  )
  .option("--monitor", "View current task and time countdown")
  .arguments("<duration:string> [name:string]")
  .parse(Deno.args);

const ttl = parse(command.args[0]);
const task = newTask(ttl, command.args[1]);

if (command.options.monitor) {
  mount(task);
} else {
  await task.start();

  if (command.args[1]) {
    console.log(`Timebox for: ${command.args[1]} is over.`);
  } else {
    console.log("Your Timebox is over.");
  }
}
