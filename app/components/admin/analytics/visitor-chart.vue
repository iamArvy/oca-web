<script setup lang="ts">
// import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartCrosshair,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
  type ChartConfig,
} from "@/components/ui/chart";
// import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { VisArea, VisAxis, VisLine, VisXYContainer } from "@unovis/vue";
import type { ApiResponse, VisitorsChartData } from "~/types";

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "var(--chart-2)",
  },
  visits: {
    label: "Visits",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const svgDefs = `
  <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
    <stop
      offset="5%"
      stop-color="var(--color-desktop)"
      stop-opacity="0.8"
    />
    <stop
      offset="95%"
      stop-color="var(--color-desktop)"
      stop-opacity="0.1"
    />
  </linearGradient>
  <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
    <stop
      offset="5%"
      stop-color="var(--color-mobile)"
      stop-opacity="0.8"
    />
    <stop
      offset="95%"
      stop-color="var(--color-mobile)"
      stop-opacity="0.1"
    />
  </linearGradient>
`;
enum AnalyticsPeriod {
  DAYS = "days",
  MONTHS = "months",
  YEARS = "years",
}

interface IFilters {
  period: AnalyticsPeriod;
  duration: number;
}

const selectedFilter = computed({
  get() {
    return filterOptions.find(
      (option) =>
        option.value.period === query.period &&
        option.value.duration === query.duration,
    )?.value;
  },
  set(value: IFilters | undefined) {
    if (!value) return;
    query.period = value.period;
    query.duration = value.duration;
  },
});

const query = reactive<IFilters>({
  period: AnalyticsPeriod.DAYS,
  duration: 7,
});

const filterOptions = [
  {
    label: "Last 7 days",
    value: { period: AnalyticsPeriod.DAYS, duration: 7 },
  },
  {
    label: "Last 3 months",
    value: { period: AnalyticsPeriod.MONTHS, duration: 3 },
  },
  {
    label: "Last 6 months",
    value: { period: AnalyticsPeriod.MONTHS, duration: 6 },
  },
  {
    label: "Last 12 months",
    value: { period: AnalyticsPeriod.MONTHS, duration: 12 },
  },
];

const { data } = useAPI<ApiResponse<VisitorsChartData[]>>(
  "/analytics/visitors-chart",
  {
    method: "GET",
    query,
    watch: [query],
    immediate: true,
  },
);

const chartData = computed(
  () =>
    data.value?.data?.map((item) => ({
      ...item,
      date: new Date(item.date),
    })) ?? [],
);

const yDomain = computed(() => {
  if (!chartData.value.length) return [0, 10];

  const max = Math.max(
    ...chartData.value.map((d) => Math.max(d.visits, d.visitors)),
  );

  return [0, Math.ceil(max * 1.1)];
});

const tickFormat = computed(() => {
  const format = (d: number | Date) => {
    const date = d instanceof Date ? d : new Date(d);

    if (query.period === AnalyticsPeriod.DAYS) {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }

    if (query.period === AnalyticsPeriod.MONTHS) {
      return date.toLocaleDateString("en-US", {
        month: "short",
      });
    }

    if (query.period === AnalyticsPeriod.YEARS) {
      return date.getFullYear().toString();
    }

    return date.toLocaleDateString();
  };

  return format;
});
</script>

<template>
  <Card class="pt-0">
    <CardHeader class="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
      <div class="grid flex-1 gap-1">
        <CardTitle>Visitors & Visits Overview</CardTitle>
        <CardDescription>
          Track visitor activity and total visits over the selected time period.
        </CardDescription>
      </div>
      <Select v-model="selectedFilter">
        <SelectTrigger class="hidden w-40 rounded-lg sm:ml-auto sm:flex" aria-label="Select a value">
          <SelectValue :placeholder="filterOptions.find(
            (option) =>
              option.value.period === query.period &&
              option.value.duration === query.duration,
          )?.label || 'Select a filter'
            " />
        </SelectTrigger>
        <SelectContent class="rounded-xl">
          <SelectItem v-for="{ label, value } in filterOptions" :key="label" :value="value" class="rounded-lg">
            {{ label }}
          </SelectItem>
        </SelectContent>
      </Select>
    </CardHeader>
    <CardContent class="px-2 pt-4 sm:px-6 sm:pt-6 pb-4">
      <ChartContainer v-if="chartData.length" :config="chartConfig" class="aspect-auto h-62.5 w-full" :cursor="false">
        <VisXYContainer :data="chartData" :svg-defs="svgDefs" :y-domain="yDomain">
          <!-- Visitors Area -->
          <VisArea :x="(d: VisitorsChartData) => d.date" :y="(d: VisitorsChartData) => d.visitors"
            :color="'url(#fillMobile)'" :opacity="0.5" />

          <!-- Visits Area -->
          <VisArea :x="(d: VisitorsChartData) => d.date" :y="(d: VisitorsChartData) => d.visits"
            :color="'url(#fillDesktop)'" :opacity="0.5" />

          <!-- Visitors Line -->
          <VisLine :x="(d: VisitorsChartData) => d.date" :y="(d: VisitorsChartData) => d.visitors"
            :color="chartConfig.visitors.color" :line-width="2" />

          <!-- Visits Line -->
          <VisLine :x="(d: VisitorsChartData) => d.date" :y="(d: VisitorsChartData) => d.visits"
            :color="chartConfig.visits.color" :line-width="2" />

          <!-- X Axis -->
          <VisAxis type="x" :x="(d: VisitorsChartData) => d.date" :tick-line="false" :domain-line="false"
            :grid-line="true" :tick-format="tickFormat" />

          <!-- Y Axis -->
          <VisAxis type="y" :num-ticks="7" :tick-line="false" :domain-line="false" />

          <ChartTooltip />

          <ChartCrosshair :template="componentToString(chartConfig, ChartTooltipContent, {
            labelFormatter: tickFormat,
          })
            " :color="(d: VisitorsChartData, i: number) =>
              [chartConfig.visitors.color, chartConfig.visits.color][i % 2]
              " />
        </VisXYContainer>

        <ChartLegendContent />
      </ChartContainer>
    </CardContent>
  </Card>
</template>
