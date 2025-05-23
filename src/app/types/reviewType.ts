export interface Review {
  user: any;
 event :{
   title: string;
   bannerImage: string; 
   slug: string
createdAt: string
 }
 createdAt: string,
  data: any;
  id: string;
  comment: string;
  rating: number;
  status: "Approved" | "Pending";
  reviewer: {
    name: string;
    profileImg: string;
    email: string;
    id: string;
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
  isSelected: boolean;
  onSelect: (id: string) => void;
}
