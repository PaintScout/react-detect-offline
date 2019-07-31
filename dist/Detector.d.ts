/// <reference types="react" />
import { UseConnectionArgs } from './useConnection'
export interface DetectorProps extends UseConnectionArgs {
  children: (online: boolean) => JSX.Element
  onChange?: (online: boolean) => any
}
export default function Detector({ children, polling, onChange }: DetectorProps): JSX.Element
