export interface BookingType {
  id: number;
  createdAt: string;
  date: string;
  bookingType: string;
  bookingTypeId: string;
  userId: number;
  totalAmount: number;
  paymentIntent: string;
  isCompleted: boolean;
}
