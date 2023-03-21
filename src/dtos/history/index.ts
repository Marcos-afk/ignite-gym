export interface HistoryDTO {
  id: string;
  name: string;
  group: string;
  hour: string;
  created_at: string;
}

export interface HistoryByDayDTO {
  title: string;
  data: HistoryDTO[];
}
