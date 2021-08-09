<script>
  import Bar from 'svelte-chartjs/src/Bar.svelte';
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
  let dataLine = {
    labels: [
      'acousticness',
      'danceability',
      'energy',
      'instrumentalness',
      'liveness',
      'speechiness',
      'valence',
    ],
    datasets: [
      {
        label: 'Track properties',

        lineTension: 0.3,
        backgroundColor: [
          'rgba(50,253,255,0.25)',
          'rgba(0,0,255,0.25)',
          'rgba(255,143,0,0.5)',
          'rgba(0,0,255,0.25)',
          'rgba(255,0,0,0.25)',
          'rgba(0,0,255,0.25)',
          'rgba(230,0,0,0.5)',
        ],
        borderWidth: 2,
        borderColor: [
          'rgba(50,253,255,1)',
          'rgba(0,0,255,1)',
          'rgba(255,143,0,1)',
          'rgba(0,0,255,1)',
          'rgba(255,0,0,1)',
          'rgba(0,0,255,1)',
          'rgba(230,0,0,1)',
        ],
        data: [
          acousticness * 100,
          danceability * 100,
          energy * 100,
          instrumentalness * 100,
          liveness * 100,
          speechiness * 100,
          valence * 100,
        ],
      },
    ],
  };
</script>

<Bar
  data={dataLine}
  options={{
    aspectRatio: 1,
    title: {
      display: false,
      text: 'Track Feature',
      fontSize: '25',
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            color: 'black',
          },
          ticks: { min: 0, max: 100 },
        },
      ],
    },
  }}
/>
