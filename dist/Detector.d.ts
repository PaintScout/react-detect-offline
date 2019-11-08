/// <reference types="react" />
export interface DetectorProps {
  children: (online: boolean) => JSX.Element
  onChange?: (online: boolean) => any
}
export default function Detector({ children, onChange }: DetectorProps): JSX.Element
