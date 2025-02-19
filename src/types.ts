/**
 * 当前轮开始时的状态
 */
export interface TurnState {
  /** 当前是第几轮了 */
  times: number;

  /** 左边点数，等于上一轮右边点数 */
  leftNum: number;
}
