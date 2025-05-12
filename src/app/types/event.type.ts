
export interface IEvent {
    id?: string;
    slug?: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    venue: string;
    dateTime: string;
    bannerImage: string;
    type: 'PUBLIC' | 'PRIVATE';
    fee?: number;
    organizerId: string;
    isPaid?: boolean;
     eventStatus?: "UPCOMING" | "ONGOING" | "ENDED";
  category?:
    | "CONFERENCE"
    | "WORKSHOP"
    | "SEMINAR"
    | "NETWORKING"
    | "PARTY"
    | "CONCERT"
    | "EXHIBITION"
    | "OTHER";
  reseveredSit?: number;
  availableSit?: number;
  }
  