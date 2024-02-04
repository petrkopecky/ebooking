

  
  export interface BookingTableStructure {
    articles: Article[]
    hourSlots: HourSlot[]
    slotsPerHour: SlotsPerHour[]
  }
  
  export interface Article {
    name: string
    key: string
  }
  
  export interface HourSlot {
    name: string
    key: string
  }
  
  export interface SlotsPerHour {
    name: string
    key: string
  }