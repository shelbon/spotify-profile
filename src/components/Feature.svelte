<script>
  // Import core module
  import * as echarts from 'echarts/core';
  // Import bar chart
  import { BarChart } from 'echarts/charts';
  // Import components
  import {
    TooltipComponent,
    GridComponent,
  } from 'echarts/components';
  // Import renderer
  import { CanvasRenderer } from 'echarts/renderers';

  import { onMount } from 'svelte';

  // Register the required components
  echarts.use([
    BarChart,
    TooltipComponent,
    GridComponent,
    CanvasRenderer,
  ]);

  export let data = {};

  const {
    acousticness,
    danceability,
    energy,
    instrumentalness,
    liveness,
    speechiness,
    valence,
  } = data;

  let chartContainer;
  let chart;

  const labels = [
    'acousticness',
    'danceability',
    'energy',
    'instrumentalness',
    'liveness',
    'speechiness',
    'valence',
  ];

  const chartData = [
    acousticness * 100,
    danceability * 100,
    energy * 100,
    instrumentalness * 100,
    liveness * 100,
    speechiness * 100,
    valence * 100,
  ];

  const colors = [
    'rgba(50,253,255,1)',
    'rgba(0,0,255,1)',
    'rgba(255,143,0,1)',
    'rgba(0,0,255,1)',
    'rgba(255,0,0,1)',
    'rgba(0,0,255,1)',
    'rgba(230,0,0,1)',
  ];

  onMount(() => {
    if (chartContainer) {
      chart = echarts.init(chartContainer);

      const option = {
        grid: {
          left: '10%',
          right: '10%',
          bottom: '15%',
          top: '10%',
        },
        xAxis: {
          type: 'category',
          data: labels,
          axisLabel: {
            rotate: 45,
            color: '#fff',
          },
          axisLine: {
            lineStyle: {
              color: '#666',
            },
          },
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 100,
          axisLabel: {
            color: '#fff',
          },
          splitLine: {
            lineStyle: {
              color: '#333',
            },
          },
        },
        series: [
          {
            name: 'Track properties',
            type: 'bar',
            data: chartData.map((value, index) => ({
              value,
              itemStyle: {
                color: colors[index],
                borderColor: colors[index],
                borderWidth: 2,
              },
            })),
            label: {
              show: false,
            },
          },
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
      };

      chart.setOption(option);

      // Handle window resize
      const resizeObserver = new ResizeObserver(() => {
        chart?.resize();
      });

      resizeObserver.observe(chartContainer);

      return () => {
        resizeObserver.disconnect();
        chart?.dispose();
      };
    }
  });
</script>

<div bind:this={chartContainer} style="width: 100%; height: 400px;"></div>
