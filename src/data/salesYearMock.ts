import type { CustomChartProps } from "@/types";

export const salesYearMock: CustomChartProps = {
    labels: [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
    ],
    data: [
        120500.0, 135800.5, 98400.2, 145200.8, 160100.0, 115900.3, 138400.6,
        152300.4, 141900.0, 168400.95, 185000.1, 220400.5,
    ],
    type: 'bar',
}