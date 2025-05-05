export interface Review {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  id: string;
  comment: string;
  rating: number;
  status: "Approved" | "Pending";
  reviewer: {
    name: string;
    profileImg: string;
  };
}

export interface ReviewRowProps {
  id: string;
  image: string;
  name: string;
  comment: string;
  rating: number;
  status: "Approved" | "Pending"; 
  onDetailClick: (id: string) => void;
}
