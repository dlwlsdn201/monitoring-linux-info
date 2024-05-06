import { BarDatum, ComputedDatum, ResponsiveBar } from '@nivo/bar';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const getColor = ({
  chartInfo,
  colors,
}: {
  chartInfo: ComputedDatum<BarDatum>;
  colors: { [key: string]: string } | undefined;
}): string => {
  if (chartInfo && colors) {
    return colors[chartInfo?.id];
  }
  return '#000000';
};
export const ResponsiveBarChart = ({
  data /* see data tab */,
  keys,
  colors,
}: {
  data: BarDatum[];
  keys: string[];
  colors?: {
    [key: string]: string;
  };
}) => (
  <ResponsiveBar
    data={data}
    keys={keys}
    indexBy="server"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.5}
    enableLabel
    maxValue="auto"
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    valueFormat={(value: number) => `${value} GB`}
    colors={(chartInfo) => getColor({ chartInfo, colors })}
    colorBy="id"
    // defs={[
    //   {
    //     id: 'dots',
    //     type: 'patternDots',
    //     background: 'inherit',
    //     color: '#38bcb2',
    //     size: 4,
    //     padding: 1,
    //     stagger: true,
    //   },
    //   {
    //     id: 'lines',
    //     type: 'patternLines',
    //     background: 'inherit',
    //     color: '#eed312',
    //     rotation: -45,
    //     lineWidth: 6,
    //     spacing: 10,
    //   },
    // ]}
    borderColor={{
      from: 'color',
      modifiers: [['darker', 1.6]],
    }}
    axisTop={null}
    axisRight={null}
    // axisBottom={{
    //   tickSize: 5,
    //   tickPadding: 5,
    //   tickRotation: 0,
    //   legend: 'server',
    //   legendPosition: 'middle',
    //   legendOffset: 32,
    //   truncateTickAt: 0,
    // }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'disk space (GB)',
      legendPosition: 'middle',
      legendOffset: -45,
      truncateTickAt: 0,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor="#ffffff"
    // labelTextColor={{
    //   from: 'theme',
    //   // modifiers: [['#ffffff', 1.6]],
    // }}
    legends={[
      {
        dataFrom: 'keys',
        anchor: 'right',
        direction: 'column',
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 30,
        itemDirection: 'left-to-right',
        itemOpacity: 0.85,
        symbolSize: 24,
        effects: [
          {
            on: 'hover',
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
    role="application"
    ariaLabel="Nivo bar chart demo"
    barAriaLabel={(e) =>
      e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue
    }
  />
);
