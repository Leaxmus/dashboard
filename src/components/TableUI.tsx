import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

interface TableUIProps {
   labels: string[];
   values1: number[];
   values2: number[];
}

function combineArrays(arrLabels: string[], arrValues1: number[], arrValues2: number[]) {
   return arrLabels.map((label, index) => ({
      id: index,
      time: label,
      temperature: arrValues1[index],
      apparentTemp: arrValues2[index]
   }));
}

const columns: GridColDef[] = [
   { field: 'time', headerName: 'Hora', width: 160 },
   { field: 'temperature', headerName: 'Temperatura (°C)', width: 150 },
   { field: 'apparentTemp', headerName: 'Temp. Aparente (°C)', width: 170 },
   {
      field: 'resumen',
      headerName: 'Resumen',
      sortable: false,
      width: 200,
      valueGetter: (_, row) =>
         `${row.time} → ${row.temperature}°C / ${row.apparentTemp}°C`,
   },
];

export default function TableUI({ labels, values1, values2 }: TableUIProps) {

   const formattedLabels = labels.map(l =>
      new Date(l).toLocaleString('es-ES', {
         hour: '2-digit',
         minute: '2-digit'
      })
   );

   const rows = combineArrays(formattedLabels, values1, values2);

   return (
      <Box sx={{ height: 400, width: '100%' }}>
         <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
               pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
         />
      </Box>
   );
}
