import { type Dispatch, type SetStateAction, createContext } from 'react';

import dayjs, { type Dayjs } from 'dayjs';

const TimeContext = createContext<{
  baseDate: Dayjs;
  setOffset: Dispatch<SetStateAction<number>>;
  mode: 'month' | 'week';
  setMode: Dispatch<SetStateAction<'month' | 'week'>>;
}>({
  baseDate: dayjs(),
  setOffset: () => {},
  mode: 'month',
  setMode: () => {}
});

export default TimeContext;
