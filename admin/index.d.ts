declare module "#app" {
    interface PageMeta {
        auth?: {
            unauthenticatedOnly?: boolean;
            navigateAuthenticatedTo?: string;
        };
    }
}

export {};
