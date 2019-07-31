export interface PollingConfig {
    enabled?: boolean;
    url?: string;
    interval?: number;
    timeout?: number;
}
export interface UseConnectionArgs {
    polling?: PollingConfig | boolean;
}
export default function useConnection({ polling }?: UseConnectionArgs): {
    online: boolean;
    offline: boolean;
};
