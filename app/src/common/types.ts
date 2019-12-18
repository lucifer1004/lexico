export type Item = {
  id: number
  word: string
  description: string
}

export type SystemMessage = {
  display: boolean
  message: string
  type: 'info' | 'error' | 'success'
}

export interface IPageProps {
  path: string
  word?: string
  location?: {
    state: any
  }
}
