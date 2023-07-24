# Taskbox

A simple timekeeper for your tasks.

## Dependencies

- [deno](https://deno.com/)

## Building

```bash
deno task make
```

## Usage

```bash
# Starts taskbox with a TUI so you can monitor time remaining. Use Ctrl-C to exit.
taskbox 5s "Make a TODO list"

# Starts taskbox process in headless mode. Outputs "Done" when finished.
taskbox 5s "Make a TODO list" --headless

# See help screen
taskbox --help

# Or if you want to run with deno
deno task box 5s "Make a TODO list"
```

## Duration options

Duration can be specified using the following string format:

```
(number[h|m|s])+
```

### Example:

```
# Starts a taskbox for an hour and a half
taskbox 1h30m
```
