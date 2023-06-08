import { difference, DifferenceFormat } from "std/datetime/difference.ts";

export type Task = {
  name?: string;
  ttl: number;
  state: "created" | "running" | "ended";
  startTime: number | null;
  endTime: number | null;
  start: () => Promise<void>;
  timeRemaining: () => DifferenceFormat;
};

export const newTask = (ttl: number, name?: string): Task => {
  return {
    name: name,
    ttl: ttl,
    state: "created",
    startTime: null,
    endTime: null,
    timeRemaining: function () {
      if (this.endTime === null) {
        throw new Error("Timer hasn't started");
      }

      const now = new Date();
      const end = new Date(this.endTime);
      const diff = difference(now, end, {
        units: ["hours", "minutes", "seconds"],
      });
      // cap diff seconds at 60 as minutes will be used for times larger.
      diff.seconds = diff.seconds ? diff.seconds % 60 : 0;
      diff.minutes = diff.minutes ? diff.minutes % 60 : 0;
      return diff;
    },
    start: function () {
      this.startTime = Date.now();
      this.endTime = this.startTime + this.ttl;
      this.state = "running";

      return new Promise((resolve) => {
        setTimeout(() => {
          this.state = "ended", resolve(undefined);
        }, ttl);
      });
    },
  };
};
