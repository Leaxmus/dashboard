import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './functions/useFetchData';

import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';

import { Grid } from '@mui/material';
import './App.css'

function App() {
  //const [count, setCount] = useState(0)

  const { data, loading, error } = useFetchData();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>Sin datos</p>;

  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center">

      {/* Encabezado */}
      <Grid size={{ xs: 12, md: 12 }}><HeaderUI /></Grid>

      {/* Alertas */}
      <Grid container justifyContent="center" alignItems="center">
        <AlertUI description="No se preveen lluvias" />
      </Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }}><SelectorUI /></Grid>

      {/* Indicadores */}
      <Grid container size={{ xs: 12, md: 9 }} >

        <Grid size={{ xs: 12, md: 3 }}>
          {/* IndicatorUI temperatura en 2m' */}
          <IndicatorUI
            title='Temperatura (2m)'
            description={`${data.current.temperature_2m} ${data.current_units.temperature_2m}`}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {/* IndicatorUI temperatura aparente °C' */}
          <IndicatorUI
            title='Temperatura aparente (°C)'
            description={`${data.current.apparent_temperature} ${data.current_units.apparent_temperature}`}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {/* IndicatorUI con la Velocidad del viento en km/h' */}
          <IndicatorUI
            title='Velocidad del viento  (km/h)'
            description={`${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {/* IndicatorUI con la Humedad relativa en %' */}
          <IndicatorUI
            title='Humedad relativa (%)'
            description={`${data.current.relative_humidity_2m} ${data.current_units.relative_humidity_2m}`}
          />
        </Grid>

      </Grid>

      {/* Gráfico */}
      <Grid size={{xs: 12, md: 6}} sx={{ display: { xs: "none", md: "block" } }}>
        <ChartUI
          label="Temperatura, Temperatura aparente vs Hora"
          labels={data.hourly.time.slice(0, 24)}
          labelValues1="Temperatura (2m)"
          values1={data.hourly.temperature_2m.slice(0, 24)}

          labelValues2="Temperatura aparente (2m)"
          values2={data.hourly.apparent_temperature.slice(0, 24)}
        />

      </Grid>

      {/* Tabla */}
      <Grid size={{xs: 12, md: 6}} sx={{ display: { xs: "none", md: "block" } }}>
        <TableUI
          labels={data.hourly.time.slice(0, 24)}
          values1={data.hourly.temperature_2m.slice(0, 24)}
          values2={data.hourly.apparent_temperature.slice(0, 24)}
        />
      </Grid>

      {/* Información adicional */}
      <Grid>Elemento: Información adicional</Grid>

    </Grid>
  );
}

export default App
