/// <reference types="react" />
export interface OfflineProps {
  children: JSX.Element
  onChange?: (online: boolean) => any
}
export default function Offline({ children, onChange }: OfflineProps): JSX.Element
