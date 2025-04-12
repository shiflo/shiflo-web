export interface Schedule {
  id: number;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  isAllDay: boolean;
  style: {
    color: string;
  };
  createdAt: string;
  updatedAt: string;
}
