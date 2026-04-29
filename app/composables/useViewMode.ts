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
  const mode = useState<ViewMode>(() => ViewMode.GRID);

  onMounted(() => {
    const saved = localStorage.getItem('view-mode');
    if (saved) {
      mode.value = saved as ViewMode;
    }
  });

  function setViewMode(value: ViewMode) {
    mode.value = value;
    localStorage.setItem('view-mode', value);
  }

  return {
    mode,
    setViewMode,
  };
}