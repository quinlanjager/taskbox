import { Unit } from "std/datetime/difference.ts";
import { Task } from "@/task/mod.ts"
import { Canvas, Tui } from "https://deno.land/x/tui@1.3.4/mod.ts";
import { TextboxComponent } from "https://deno.land/x/tui@1.3.4/src/components/mod.ts";

const TIME_SHORTHAND:  {[k in Unit]?: string}= {
  minutes: "m",
  seconds: "s",
}

const timeRemainingMessage = (task: Task) => {
  const timeRemaining = task.timeRemaining()
  let message = ""
  for (const key of Object.keys(timeRemaining) as Unit[]) {
    if (!TIME_SHORTHAND[key] || !timeRemaining[key]) continue;
    message += `${timeRemaining[key]}${TIME_SHORTHAND[key]}`;
  }
  return message;
}

export const mount = (task: Task) => {
  const tui = new Tui({
    canvas: new Canvas({
      refreshRate: 1000 / 60, // Run in 60FPS
      stdout: Deno.stdout,
    }),
  });

  const text = new TextboxComponent({
    tui,
    rectangle: {
      column: 0,
      row: 0,
      height: 5,
      width: 30,
    },
    value: "",
  });

  tui.dispatch();
  tui.run();

  task.start().then(() => {
    text.value = "Timebox over!"
  })

  text.value = timeRemainingMessage(task);

  setInterval(() => {
    if (task.state === "ended") return;
    text.value = timeRemainingMessage(task);
  }, 500)
}

