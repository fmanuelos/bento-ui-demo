import { type CSSProperties, type ReactNode } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  ReferenceLine,
  Scatter,
  ScatterChart,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from 'recharts'

const chartColors = {
  series1: 'var(--color-chart-series-1)',
  series2: 'var(--color-chart-series-2)',
  series3: 'var(--color-chart-series-3)',
  grid: 'var(--color-chart-gridline)',
  axis: 'var(--color-chart-axis)',
  text: 'var(--color-text-primary)',
  secondaryText: 'var(--color-text-secondary)',
  surface: 'var(--color-surface-raised)',
  border: 'var(--color-border-secondary)',
} as const

const axisTick = {
  fill: chartColors.axis,
  fontFamily: 'var(--font-body-xs)',
  fontSize: 'var(--text-body-xs)',
}

const tooltipContentStyle: CSSProperties = {
  background: chartColors.surface,
  border: `1px solid ${chartColors.border}`,
  borderRadius: 'var(--radius-shape-md)',
  color: chartColors.text,
  fontFamily: 'var(--font-body-sm)',
  fontSize: 'var(--text-body-sm)',
}

const tooltipLabelStyle: CSSProperties = {
  color: chartColors.text,
  fontWeight: 'var(--font-weight-label-sm)',
}

const tooltipItemStyle: CSSProperties = {
  color: chartColors.secondaryText,
}

function ChartFigure({
  id,
  title,
  description,
  context,
  summary,
  children,
}: {
  id: string
  title: string
  description: string
  context: string
  summary: string
  children: ReactNode
}) {
  return (
    <figure
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-description ${id}-summary`}
      className="m-0 grid min-w-0 gap-scale-4 border-t border-border-secondary pt-scale-6 first:border-0 first:pt-0"
    >
      <figcaption className="grid gap-scale-1">
        <h3 id={`${id}-title`} className="m-0 text-heading-sm font-semibold text-text-primary">
          {title}
        </h3>
        <p id={`${id}-description`} className="m-0 text-body-sm text-text-secondary">
          {description}
        </p>
        <p className="m-0 text-caption font-medium text-text-tertiary">{context}</p>
      </figcaption>
      {children}
      <p id={`${id}-summary`} className="m-0 text-body-sm text-text-secondary">
        <strong className="font-semibold text-text-primary">Summary:</strong> {summary}
      </p>
    </figure>
  )
}

type ResponseTimePoint = {
  date: string
  milliseconds: number | null
}

const responseTimeData: ResponseTimePoint[] = [
  { date: 'Sep 8', milliseconds: 236 },
  { date: 'Sep 9', milliseconds: 228 },
  { date: 'Sep 10', milliseconds: 231 },
  { date: 'Sep 11', milliseconds: 219 },
  { date: 'Sep 12', milliseconds: 207 },
  { date: 'Sep 13', milliseconds: null },
  { date: 'Sep 14', milliseconds: 194 },
  { date: 'Sep 15', milliseconds: 182 },
]

function LineChartExample() {
  return (
    <ChartFigure
      id="line-chart-example"
      title="Median response time"
      description="A line chart shows change across an ordered interval and preserves a missing observation as a gap."
      context="Daily median · September 8–15 · milliseconds · Updated 3 minutes ago"
      summary="Median response time fell from 236 ms to 182 ms after the September 12 deployment; September 13 is unavailable and is not treated as zero."
    >
      <div className="h-block-height-sm min-w-0" aria-label="Median response time line chart">
        <LineChart
          responsive
          accessibilityLayer
          data={responseTimeData}
          margin={{ top: 24, right: 24, bottom: 16, left: 12 }}
          style={{ width: '100%', height: '100%' }}
        >
          <CartesianGrid stroke={chartColors.grid} vertical={false} />
          <XAxis
            dataKey="date"
            tick={axisTick}
            tickLine={false}
            axisLine={{ stroke: chartColors.axis }}
            label={{
              value: 'Date',
              position: 'insideBottom',
              offset: -10,
              fill: chartColors.axis,
            }}
          />
          <YAxis
            width="auto"
            domain={['dataMin - 10', 'dataMax + 10']}
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value: number) => `${value} ms`}
            label={{
              value: 'Median response time (ms)',
              angle: -90,
              position: 'insideLeft',
              fill: chartColors.axis,
            }}
          />
          <ReferenceLine
            x="Sep 12"
            stroke={chartColors.series3}
            strokeDasharray="4 4"
            label={{ value: 'Deployment', position: 'insideTopRight', fill: chartColors.text }}
          />
          <RechartsTooltip
            isAnimationActive={false}
            contentStyle={tooltipContentStyle}
            labelStyle={tooltipLabelStyle}
            itemStyle={tooltipItemStyle}
            formatter={(value) => [`${Number(value).toLocaleString()} ms`, 'Median']}
          />
          <Line
            type="linear"
            dataKey="milliseconds"
            name="Median response time"
            stroke={chartColors.series1}
            strokeWidth={2}
            dot={{ r: 3, fill: chartColors.surface, strokeWidth: 2 }}
            activeDot={{ r: 6 }}
            connectNulls={false}
            isAnimationActive={false}
          />
        </LineChart>
      </div>
    </ChartFigure>
  )
}

type SupportQueue = {
  queue: string
  openCases: number
}

const supportQueueData: SupportQueue[] = [
  { queue: 'Account access', openCases: 38 },
  { queue: 'Billing questions', openCases: 27 },
  { queue: 'Data imports', openCases: 19 },
  { queue: 'API integrations', openCases: 12 },
]

function BarChartExample() {
  return (
    <ChartFigure
      id="bar-chart-example"
      title="Open cases by support queue"
      description="Horizontal bars compare categories while preserving complete queue labels and a zero baseline."
      context="Current open cases · All regions · Updated 8 minutes ago"
      summary="Account access has the largest open queue at 38 cases, more than three times the API integrations queue."
    >
      <div className="h-block-height-sm min-w-0" aria-label="Open cases horizontal bar chart">
        <BarChart
          responsive
          accessibilityLayer
          layout="vertical"
          data={supportQueueData}
          margin={{ top: 8, right: 48, bottom: 20, left: 8 }}
          style={{ width: '100%', height: '100%' }}
        >
          <CartesianGrid stroke={chartColors.grid} horizontal={false} />
          <XAxis
            type="number"
            domain={[0, 'dataMax']}
            allowDecimals={false}
            tick={axisTick}
            tickLine={false}
            axisLine={{ stroke: chartColors.axis }}
            label={{
              value: 'Open cases',
              position: 'insideBottom',
              offset: -12,
              fill: chartColors.axis,
            }}
          />
          <YAxis
            type="category"
            dataKey="queue"
            width="auto"
            tick={axisTick}
            tickLine={false}
            axisLine={false}
          />
          <RechartsTooltip
            isAnimationActive={false}
            cursor={{ fill: 'var(--color-background-tertiary)' }}
            contentStyle={tooltipContentStyle}
            labelStyle={tooltipLabelStyle}
            itemStyle={tooltipItemStyle}
            formatter={(value) => [Number(value).toLocaleString(), 'Open cases']}
          />
          <Bar
            dataKey="openCases"
            name="Open cases"
            fill={chartColors.series1}
            radius={[0, 4, 4, 0]}
            isAnimationActive={false}
          >
            <LabelList
              dataKey="openCases"
              position="right"
              fill={chartColors.text}
              formatter={(value) => Number(value).toLocaleString()}
            />
          </Bar>
        </BarChart>
      </div>
    </ChartFigure>
  )
}

type IncidentComposition = {
  month: string
  resolved: number
  pending: number
  overdue: number
}

const incidentCompositionData: IncidentComposition[] = [
  { month: 'Jun', resolved: 18, pending: 6, overdue: 2 },
  { month: 'Jul', resolved: 22, pending: 5, overdue: 3 },
  { month: 'Aug', resolved: 25, pending: 7, overdue: 2 },
  { month: 'Sep', resolved: 27, pending: 4, overdue: 1 },
]

function ChartLegend() {
  const items = [
    { label: 'Resolved · bottom', color: chartColors.series1 },
    { label: 'Pending · middle', color: chartColors.series2 },
    { label: 'Overdue · top', color: chartColors.series3 },
  ]
  return (
    <ul className="m-0 flex list-none flex-wrap gap-x-scale-4 gap-y-scale-2 p-0 text-body-xs text-text-secondary">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-scale-2">
          <span
            aria-hidden="true"
            className="size-3 rounded-shape-xs"
            style={{ backgroundColor: item.color }}
          />
          {item.label}
        </li>
      ))}
    </ul>
  )
}

function StackedBarChartExample() {
  return (
    <ChartFigure
      id="stacked-bar-chart-example"
      title="Incident outcomes by month"
      description="Stacked bars show part-to-whole composition with a stable bottom-to-top series order."
      context="Monthly incident outcomes · June–September · Updated 12 minutes ago"
      summary="Resolved incidents increased while overdue incidents fell from three in July to one in September."
    >
      <ChartLegend />
      <div className="h-block-height-sm min-w-0" aria-label="Incident outcomes stacked bar chart">
        <BarChart
          responsive
          accessibilityLayer
          data={incidentCompositionData}
          margin={{ top: 12, right: 16, bottom: 20, left: 0 }}
          style={{ width: '100%', height: '100%' }}
        >
          <CartesianGrid stroke={chartColors.grid} vertical={false} />
          <XAxis
            dataKey="month"
            tick={axisTick}
            tickLine={false}
            axisLine={{ stroke: chartColors.axis }}
            label={{
              value: 'Month',
              position: 'insideBottom',
              offset: -12,
              fill: chartColors.axis,
            }}
          />
          <YAxis
            width="auto"
            allowDecimals={false}
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            label={{
              value: 'Incidents',
              angle: -90,
              position: 'insideLeft',
              fill: chartColors.axis,
            }}
          />
          <RechartsTooltip
            isAnimationActive={false}
            contentStyle={tooltipContentStyle}
            labelStyle={tooltipLabelStyle}
            itemStyle={tooltipItemStyle}
            formatter={(value, name) => [Number(value).toLocaleString(), String(name)]}
          />
          <Bar
            dataKey="resolved"
            name="Resolved"
            stackId="outcome"
            fill={chartColors.series1}
            stroke={chartColors.surface}
            strokeWidth={1}
            isAnimationActive={false}
          />
          <Bar
            dataKey="pending"
            name="Pending"
            stackId="outcome"
            fill={chartColors.series2}
            stroke={chartColors.surface}
            strokeWidth={1}
            isAnimationActive={false}
          />
          <Bar
            dataKey="overdue"
            name="Overdue"
            stackId="outcome"
            fill={chartColors.series3}
            stroke={chartColors.surface}
            strokeWidth={1}
            radius={[4, 4, 0, 0]}
            isAnimationActive={false}
          />
        </BarChart>
      </div>
    </ChartFigure>
  )
}

type ServiceSample = {
  service: string
  requestsPerMinute: number
  responseMilliseconds: number
}

const serviceSamples: ServiceSample[] = [
  { service: 'Accounts', requestsPerMinute: 180, responseMilliseconds: 152 },
  { service: 'Billing', requestsPerMinute: 240, responseMilliseconds: 171 },
  { service: 'Catalog', requestsPerMinute: 310, responseMilliseconds: 188 },
  { service: 'Imports', requestsPerMinute: 120, responseMilliseconds: 226 },
  { service: 'Search', requestsPerMinute: 430, responseMilliseconds: 203 },
  { service: 'Notifications', requestsPerMinute: 270, responseMilliseconds: 164 },
]

function ScatterChartExample() {
  return (
    <ChartFigure
      id="scatter-chart-example"
      title="Traffic and response time by service"
      description="A scatter chart compares two quantitative measures and retains service identity during inspection."
      context="Last 60 minutes · Requests per minute and median milliseconds · Updated now"
      summary="Imports is the clearest response-time outlier despite receiving the least traffic; higher traffic alone does not explain slower responses."
    >
      <div className="h-block-height-sm min-w-0" aria-label="Service traffic scatter chart">
        <ScatterChart
          responsive
          accessibilityLayer
          margin={{ top: 16, right: 24, bottom: 28, left: 12 }}
          style={{ width: '100%', height: '100%' }}
        >
          <CartesianGrid stroke={chartColors.grid} />
          <XAxis
            type="number"
            dataKey="requestsPerMinute"
            name="Requests per minute"
            unit=" rpm"
            domain={[0, 'dataMax + 40']}
            tick={axisTick}
            tickLine={false}
            axisLine={{ stroke: chartColors.axis }}
            label={{
              value: 'Requests per minute',
              position: 'insideBottom',
              offset: -18,
              fill: chartColors.axis,
            }}
          />
          <YAxis
            type="number"
            dataKey="responseMilliseconds"
            name="Response time"
            unit=" ms"
            width="auto"
            domain={['dataMin - 20', 'dataMax + 20']}
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            label={{
              value: 'Median response time (ms)',
              angle: -90,
              position: 'insideLeft',
              fill: chartColors.axis,
            }}
          />
          <RechartsTooltip
            isAnimationActive={false}
            cursor={{ stroke: chartColors.axis, strokeDasharray: '4 4' }}
            contentStyle={tooltipContentStyle}
            labelStyle={tooltipLabelStyle}
            itemStyle={tooltipItemStyle}
            labelFormatter={(_label, payload) =>
              payload[0]?.payload && typeof payload[0].payload === 'object'
                ? String((payload[0].payload as ServiceSample).service)
                : 'Service'
            }
          />
          <Scatter
            name="Services"
            data={serviceSamples}
            fill={chartColors.series1}
            stroke={chartColors.surface}
            strokeWidth={2}
            isAnimationActive={false}
          />
        </ScatterChart>
      </div>
    </ChartFigure>
  )
}

const compactTrendData = [
  { period: 'Sep 8', value: 236 },
  { period: 'Sep 9', value: 228 },
  { period: 'Sep 10', value: 231 },
  { period: 'Sep 11', value: 219 },
  { period: 'Sep 12', value: 207 },
  { period: 'Sep 13', value: 201 },
  { period: 'Sep 14', value: 194 },
  { period: 'Sep 15', value: 182 },
]

function CompactTrendExample() {
  return (
    <ChartFigure
      id="compact-trend-example"
      title="Optional compact trend"
      description="A compact trend supports a persistent metric; it does not replace the exact current value or appear on every statistic card."
      context="Daily median · Last 8 days · milliseconds · Updated 3 minutes ago"
      summary="The current median is 182 ms, down 54 ms over eight days."
    >
      <div className="grid gap-scale-4 rounded-shape-lg border border-border-secondary bg-surface-primary p-scale-4 sm:grid-cols-[minmax(0,1fr)_minmax(12rem,1fr)] sm:items-end">
        <div>
          <p className="m-0 text-label-sm font-semibold text-text-secondary">
            Median response time
          </p>
          <p className="mt-scale-2 mb-0 text-data-lg font-bold text-text-primary tabular-nums">
            182 ms
          </p>
          <p className="mt-scale-1 mb-0 text-body-sm text-text-secondary">
            54 ms faster than eight days ago
          </p>
        </div>
        <div className="h-24 min-w-0" aria-label="Eight-day response-time compact trend">
          <LineChart
            responsive
            accessibilityLayer
            data={compactTrendData}
            margin={{ top: 8, right: 4, bottom: 8, left: 4 }}
            style={{ width: '100%', height: '100%' }}
          >
            <RechartsTooltip
              isAnimationActive={false}
              contentStyle={tooltipContentStyle}
              labelStyle={tooltipLabelStyle}
              itemStyle={tooltipItemStyle}
              formatter={(value) => [`${Number(value).toLocaleString()} ms`, 'Median']}
            />
            <Line
              type="linear"
              dataKey="value"
              name="Median response time"
              stroke={chartColors.series1}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
              isAnimationActive={false}
            />
          </LineChart>
        </div>
      </div>
    </ChartFigure>
  )
}

export default function ChartExamples() {
  return (
    <div className="grid min-w-0 gap-scale-8">
      <LineChartExample />
      <BarChartExample />
      <StackedBarChartExample />
      <ScatterChartExample />
      <CompactTrendExample />
    </div>
  )
}
