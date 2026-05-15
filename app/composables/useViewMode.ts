import { useLocalStorage } from "@vueuse/core";
import { LayoutGrid, List, Text } from "lucide-vue-next";
import type { Component } from "vue";

export enum ViewMode {
  // GRID = "grid",
  // LIST = "list",
  BASIC = "basic",
  DEFAULT = "default"
}

export const ViewModeItems: {
  mode: ViewMode;
  icon: Component;
}[] = [
  // {
  //   mode: ViewMode.LIST,
  //   icon: List,
  // },
  {
    mode: ViewMode.DEFAULT,
    icon: LayoutGrid,
  },
  {
    mode: ViewMode.BASIC,
    icon: Text,
  }
];

export default function useViewMode() {
  const mode = useState<ViewMode>(
    'view-mode',
    () => ViewMode.DEFAULT
  )
  
  function setViewMode(value: ViewMode) {
    mode.value = value;
  }

  return {
    mode,
    setViewMode,
  };
}