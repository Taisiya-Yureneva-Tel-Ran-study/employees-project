import { FC } from 'react';
import _ from 'lodash';
import StatsLineChart from './StatsLineChart';

interface Props {
    numbers: number[],
    interval: number,
    label: string
}

const Statistics: FC<Props> = ({numbers, interval, label}) => {
    const objStat = _.countBy(numbers, (num) => Math.floor(num / interval))
    const data: {amount: number, value: number}[] = Object.entries(objStat).map(([key, value]) => ({
      amount: value, value: +key * interval + interval
    }))
  return (
    <StatsLineChart data={data} xLabel={label} />
  )
}

export default Statistics