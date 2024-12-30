export interface ICacheRepository {
    set(key: string, value: string): Promise<void>;
    get(key: string): Promise<string | null>;
    exists(key: string): Promise<boolean>;
}