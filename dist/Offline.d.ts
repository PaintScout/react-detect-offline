/// <reference types="react" />
import { UseConnectionArgs } from './useConnection'
export interface OfflineProps extends UseConnectionArgs {
  children: JSX.Element
  onChange?: (online: boolean) => any
}
export default function Offline({ children, polling, onChange }: OfflineProps): JSX.Element
