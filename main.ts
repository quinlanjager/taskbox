import { Command } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";
import { newTask } from "./task.ts";

await new Command()
  .name("timebox")
  .arguments("<length:number> [name:string]")
  .action(
    async (_options, length, name) => {
      const task = newTask(length * 1000);
      // run timebox
      await task.start();

      if (name) {
        console.log(`Timebox for: ${name} is over.`)
      } else {
        console.log("Your Timebox is over.")
      }
    },
  ).parse(Deno.args);
