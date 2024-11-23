export interface NotificationDto {
    _id: string;
    order: {
        orderId: string;
        status: {
            ru: string;
            en: string;
        };
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
