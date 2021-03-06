export type Item = {
  id: number
  word: string
  description: string
}

export interface IPageProps {
  path: string
  word?: string
  location?: {state: any}
}
