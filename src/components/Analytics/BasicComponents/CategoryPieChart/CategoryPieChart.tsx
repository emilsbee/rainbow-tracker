// External imports
import React from 'react';
import { Cell, Pie, PieChart, Tooltip, TooltipProps } from 'recharts';
import { Duration } from 'luxon';

// Internal imports
import './category-pie-chart.scss';

type CategoryPieChartProps = {
  categoryTypes: {
    name: string
    count: number
    color: string
  }[]
  totalCount: number
}

const CategoryPieChart:React.FC<CategoryPieChartProps> = ({ categoryTypes, totalCount }) => {

  const CustomTooltip = ({ payload, active }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {

      return (
        <div className="category-pie-chart__custom-tooltip">
          {payload.map((entry) => (
            <p style={{ color: entry.payload.stroke }}>
              {entry.name}: {entry.value && Duration.fromObject({ minutes: entry.value * 15 }).toFormat('h:mm')}h ({((entry.payload.count / totalCount) * 100).toPrecision(2)}%)
            </p>
          ))}
        </div>
      );
    } else return null;
  };

  return (
    <PieChart width={300} height={300}>

      <Tooltip
        content={<CustomTooltip />}
      />

      <Pie
        data={categoryTypes}
        cx={145}
        cy={150}
        innerRadius={75}
        outerRadius={100}
        paddingAngle={5}
        dataKey="count"
        animationBegin={10}
        animationDuration={900}
      >
        {categoryTypes.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={entry.color}
            stroke={'black'}
          />
        ))}
      </Pie>
    </PieChart>
  );
};

export default CategoryPieChart;
