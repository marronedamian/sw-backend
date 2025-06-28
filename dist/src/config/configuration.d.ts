declare const _default: (() => {
    port: number;
    swapi: {
        baseUrl: string | undefined;
    };
    database: {
        type: string;
        database: string;
        entities: string[];
        synchronize: boolean;
    };
    cache: {
        ttl: number;
        redis: {
            host: string;
            port: number;
        };
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    port: number;
    swapi: {
        baseUrl: string | undefined;
    };
    database: {
        type: string;
        database: string;
        entities: string[];
        synchronize: boolean;
    };
    cache: {
        ttl: number;
        redis: {
            host: string;
            port: number;
        };
    };
}>;
export default _default;
