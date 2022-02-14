// External imports
import { Cell, Pie, PieChart, Tooltip, TooltipProps } from 'recharts';
import { Duration } from 'luxon';
import React from 'react';

// Internal imports
import './activity-pie-chart.scss';


type ActivityPieChartProps = {
  activityTypes: {
    categoryid: string
    activityid: string
    long: string
    short: string
    count: number
  }[]
  pickedCategoryid: string,
  color: string
  totalCount: number
}

const ActivityPieChart:React.FC<ActivityPieChartProps> = ({ activityTypes, pickedCategoryid, color, totalCount }) => {

  const CustomTooltip = ({ payload, active }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {

      return (
        <div className="activity-pie-chart__custom-tooltip">
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
        data={activityTypes.filter((activityType) => activityType.categoryid === pickedCategoryid)}
        cx={145}
        cy={150}
        innerRadius={75}
        outerRadius={100}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="count"
        animationBegin={10}
        animationDuration={900}
        nameKey={'long'}
      >
        {activityTypes.map((entry, index) => {
          if (entry.categoryid === pickedCategoryid) {
            return (
              <Cell
                key={`cell-${index}`}
                fill={color}
                stroke={'black'}
              />
            );
          } else return null;
        })}
      </Pie>
    </PieChart>
  );
};

export default ActivityPieChart;
