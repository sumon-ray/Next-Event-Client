export interface ReviewRowProps {
    avatar: string;
    name: string;
    comment: string;
    rating: number;
    status: "Approved" | "Pending";
  }