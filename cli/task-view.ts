import { Unit } from "std/datetime/difference.ts";
import { Task } from "@/task/mod.ts";
import { Canvas, Tui } from "tui/mod.ts";
import { TextboxComponent } from "tui/src/components/mod.ts";

const TIME_SHORTHAND: { [k in Unit]?: string } = {
  minutes: "m",
  seconds: "s",
  hours: "h",
};

const timeRemainingMessage = (task: Task) => {
  const timeRemaining = task.timeRemaining();
  let message = "";
  for (const key of Object.keys(timeRemaining) as Unit[]) {
    if (!TIME_SHORTHAND[key] || !timeRemaining[key]) continue;
    message += `${timeRemaining[key]}${TIME_SHORTHAND[key]}`;
  }
  return message;
};

export const mount = (task: Task) => {
  const tui = new Tui({
    canvas: new Canvas({
      refreshRate: 1000 / 60, // Run in 60FPS
      stdout: Deno.stdout,
    }),
  });

  new TextboxComponent({
    tui,
    rectangle: {
      column: 0,
      row: 0,
      height: 5,
      width: 30,
    },
    value: task.name ? task.name : "Your timebox ends in:",
  });

  const watch = new TextboxComponent({
    tui,
    rectangle: {
      column: 0,
      row: 1,
      height: 5,
      width: 30,
    },
    value: "",
  });

  tui.dispatch();
  tui.run();

  task.start().then(() => {
    watch.value = "Timebox over!";
  });

  const update = () => {
    if (task.state === "ended") return;
    watch.value = timeRemainingMessage(task);
  };

  update();

  setInterval(update, 500);
};
