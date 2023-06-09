# Timebox

A simple timekeeper for your tasks.

## Building

```bash
deno compile ./cli/main.ts --output ./timebox
```

## Usage

```bash
# Starts timebox process which outputs "Done" when finished.
# Useful for other applications.
timebox 5s "Make a TODO list"

# Starts timebox with a TUI so you can monitor time remaining. Use
# Ctrl-C to exist.
timebox 5s "Make a TODO list" --monitor
```

## Duration options

Duration can be specified using the following string format:

```
(number[h|m|s])+
```

### Example:

```
# Starts a timebox for an hour and a half
timebox 1h30m
```

