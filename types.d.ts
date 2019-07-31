declare module "react-detect-offline" {
  type Polling =
    | boolean
    | {
        url?: string;
        interval?: number;
        timeout?: number;
      };

  export interface DetectorProps {
    polling?: Polling;
    onChange?: (args: { online: boolean }) => any;
    render?: (args: { online: boolean }) => React.ReactNode;
    children?: (args: { online: boolean }) => React.ReactNode;
  }

  export interface OnlineProps extends BaseProps {
    polling?: Polling;
    onChange?: (args: { online: boolean }) => any;
    children?: React.ReactNode;
  }

  export interface OfflineProps extends BaseProps {
    polling?: Polling;
    onChange?: (args: { online: boolean }) => any;
    children?: React.ReactNode;
  }

  export const Detector: (props: DetectorProps) => any;
  export const Online: (props: OnlineProps) => any;
  export const Offline: (props: OfflineProps) => any;

  export const useConnection: (
    options: { polling?: Polling }
  ) => { online: boolean; offline: boolean };
}
