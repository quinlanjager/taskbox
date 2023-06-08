import { Command } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";
import { newTask } from "@/task/mod.ts";
import { mount } from "@/cli/task-view.ts";

const command = await new Command()
  .name("timebox")
  .option("--monitor", "View task and time remaining")
  .arguments("<length:number> [name:string]")
  .parse(Deno.args);

const task = newTask(command.args[0] * 1000);


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
