import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';

interface ChartUIProps {
    label?: string;
    labelValues1?: string;
    labelValues2?: string;
    values1: number[];
    values2: number[];
    labels: string[];
}


export default function ChartUI({ label, labelValues1, labelValues2, values1, values2, labels }: ChartUIProps) {
    return (
        <>
            <Typography variant="h5" component="div">
                {label}
            </Typography>

            <LineChart
                height={300}
                series={[
                    { data: values1, label: labelValues1 },
                    { data: values2, label: labelValues2 },
                ]}
                xAxis={[
                    {
                        scaleType: 'point',
                        data: labels,
                    },
                ]}
            />
        </>
    );
}

