export interface BookingTableStructure {
  articles: Article[];
  hourSlots: HourSlot[];
}

export interface Article {
  name: string;
  key: string;
}

export interface HourSlot {
  name: string;
  key: string;
  slotsPerHour: SlotPerHour[];
}

export interface SlotPerHour {
  name: string;
  key: string;
}

export interface BookingSlot {
  articleKey: string;
  slotKey: string;
  slotValue: string;
  info: string;
  userPins: string[];
}
