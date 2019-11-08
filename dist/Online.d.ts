/// <reference types="react" />
export interface OnlineProps {
  children: JSX.Element
  onChange?: (online: boolean) => any
}
export default function Online({ children, onChange }: OnlineProps): JSX.Element
