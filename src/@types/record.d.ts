import type { Node } from 'tsshogi'

declare module 'tsshogi' {
  interface Record {
    /**
     * USI形式の指し手を現在局面に対して追加し、その時のNodeの配列を返します
     * @param moves
     */
    createNodesByUSI: (moves: string[]) => Node[]
  }

  interface Move {
    promotable: boolean
  }
}
