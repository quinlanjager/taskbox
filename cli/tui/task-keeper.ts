import { Unit } from "std/datetime/difference.ts";
import { TextboxComponent } from "tui/src/components/mod.ts";
import { Tui } from "tui/mod.ts";

import { Task } from "@/task/mod.ts";
import { Component } from "@/cli/tui/component.ts";

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
  return message.length ? message : "0s";
};

const Title = (tui: Tui, taskName: string | undefined): Component<TextboxComponent> => {
  const title = new TextboxComponent({
    tui,
    rectangle: {
      column: 0,
      row: 0,
      height: 5,
      width: 30,
    },
    value: taskName ? taskName : "Your timebox ends in:",
  });
  return {
    component: title,
    onMount: function() {}
  }
}

const Timer = (tui: Tui, task: Task): Component<TextboxComponent> => {
  const timer = new TextboxComponent({
    tui,
    rectangle: {
      column: 0,
      row: 1,
      height: 5,
      width: 30,
    },
    value: "",
  });

  const update = () => {
    if (task.state === "ended") {
      // end timeout loop
      return;
    }
    timer.value = timeRemainingMessage(task);
    setTimeout(update)
  };

  return {
    component: timer,
    onMount: function() {
      task.start().then(() => {
        if (this.component) {
          this.component.value = "Taskbox over!";
        }
      });
      update();
    }
  }
}

export const TaskKeeper = (tui: Tui, task: Task): Component<TextboxComponent> => {
  const title = Title(tui, task.name);
  const timer = Timer(tui, task);
  return {
    children: [title, timer],
    onMount: function() {
      timer.onMount();
      title.onMount();
    }
  }
}

