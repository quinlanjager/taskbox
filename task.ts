type Task = {
  name?: string;
  ttl: number;
  startTime: Date | null;
  start: () => Promise<void>;
};

export const newTask = (ttl: number, name?: string): Task => {
  return {
    name: name,
    ttl: ttl,
    startTime: null,
    start: function () {
      this.startTime = new Date();
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(undefined);
        }, ttl);
      });
    },
  };
};
