export interface DestinationItineraryType {
  place: string;
  totalNights: number;
}

interface SightseeingDescription {
  text: string;
  index: number;
}

interface Activity {
  activityType: string;
  activityDescription: string | SightseeingDescription[];
}

interface DayActivity {
  activities: Activity[];
}

export interface PackageIteniaryType {
  city: string;
  daysActivity: DayActivity[];
}

export interface DestinationDetailsType {
  name: string;
  image: string;
  description: string;
}

export interface DetailedIntinearyType {
  title: string;
  value: string[];
}

export interface TripType {
  id: string;
  name: string;
  nights: number;
  days: number;
  destinationItinerary: DestinationItineraryType[];
  images: string[];
  inclusions: string[];
  themes: string[];
  price: number;
  destinationDetails: DestinationDetailsType[];
  detailedIntineary: DetailedIntinearyType[];
  description: string;
  packageIteniary: PackageIteniaryType[];
  scrapedOn: string;
}
