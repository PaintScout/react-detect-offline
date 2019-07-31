/// <reference types="react" />
import { UseConnectionArgs } from './useConnection'
export interface OnlineProps extends UseConnectionArgs {
  children: JSX.Element
  onChange?: (online: boolean) => any
}
export default function Online({ children, polling, onChange }: OnlineProps): JSX.Element
