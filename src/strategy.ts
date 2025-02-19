import { TurnState } from "./types";

/**
 * 策略
 */
export interface Strategy {
  /**
   * 处理当前局势
   * @param s 当前局势
   * @returns 是否继续
   */
  (ts: TurnState): boolean;
}

/**
 * 策略1
 * 第4/5次1289，第3次123789，第2次12346789，第1次全体
 */
export const s1: Strategy = ({ times, leftNum }: TurnState) => {
  switch (times) {
    case 1:
      return true;
    case 2:
      return leftNum !== 5;
    case 3:
      return leftNum <= 3 || leftNum >= 7;
    case 4:
    case 5:
      return leftNum <= 2 || leftNum >= 8;
    default:
      return false;
  }
};

/**
 * 策略2
 * 第一轮必定参加；第二三轮只参加123789；第四五轮只参加1289；
 */
export const s2: Strategy = ({ times, leftNum }: TurnState) => {
  switch (times) {
    case 1:
      return true;
    case 2:
    case 3:
      return leftNum <= 3 || leftNum >= 7;
    case 4:
    case 5:
      return leftNum <= 2 || leftNum >= 8;
    default:
      return false;
  }
};
