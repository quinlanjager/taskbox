import { AnyComponent } from "tui/mod.ts"

export interface Component<C = AnyComponent> {
  component?: C,
  children?: Component<C>[],
  onMount: () => void
}
