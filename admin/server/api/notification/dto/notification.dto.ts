export interface NotificationDto {
  _id: string;
  order: {
    orderId: string;
    status: string;
    products: [
      {
        productId: {
          _id: string;
          title: string;
        };
      },
    ];
  };
  isRead: boolean;
  createdAt: string;
}
