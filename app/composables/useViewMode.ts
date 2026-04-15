import { LayoutGrid, List, AlignLeft, Text } from "lucide-vue-next";
import type { Component } from "vue";

export enum ViewMode {
  GRID = "grid",
  LIST = "list",
  BASIC = "basic"
}

export const ViewModeItems: {
  mode: ViewMode;
  icon: Component;
}[] = [
  {
    mode: ViewMode.GRID,
    icon: LayoutGrid,
  },
  {
    mode: ViewMode.LIST,
    icon: List,
  },
  {
    mode: ViewMode.BASIC,
    icon: Text,
  }
];

export default function useViewMode() {
  const mode = useState<ViewMode>(()=> ViewMode.GRID);

  function setViewMode(value: ViewMode) {
    mode.value = value
  }
  return {
    mode,
    setViewMode
  }
}