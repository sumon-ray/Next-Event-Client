
type MonthlyCount = {
  month: string; 
  count: number;
};

type BarChartData = {
  eventData: MonthlyCount[];
  paymentData: MonthlyCount[];
  sentInviteData: MonthlyCount[];
  reviewData: MonthlyCount[];
  userData: MonthlyCount[];
};

export type TDashboardMeta = {
  totalUser: number;
  totalEvent: number;
  totalPayment: number;
  totalReview: number;
  totalParticipant: number;
  totalInvite: number;
  totalPaymentAmount: string; 
  barChartData: BarChartData;
};
