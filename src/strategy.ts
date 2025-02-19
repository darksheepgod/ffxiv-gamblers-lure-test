import { TurnState } from "./types";

/**
 * 策略
 */
export interface Strategy {
  name: string;

  desc: string;

  /**
   * 处理当前局势，是否继续
   * @param s 当前局势
   * @returns 是否继续
   */
  judgeContinue(ts: TurnState): boolean;

  /**
   * 处理当前局势，选大小
   * @param s 当前局势
   * @returns 选择（"greater" | "less"）
   */
  judgeChoose?(ts: TurnState): "greater" | "less";
}

/** 默认的选大小方式，1~4就选大于，5~9就选小于 */
export function defaultJudgeChoose({ leftNum }: TurnState): "greater" | "less" {
  return leftNum < 5 ? "greater" : "less";
}

/**
 * 策略1
 * 第4/5次1289，第3次123789，第2次12346789，第1次全体
 */
export const s1: Strategy = {
  name: "策略1",
  desc: "第4/5次1289，第3次123789，第2次12346789，第1次全体",
  judgeContinue: ({ times, leftNum }: TurnState) => {
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
  },
};

/**
 * 策略2
 * 第一轮必定参加；第二三轮只参加123789；第四五轮只参加1289；
 */
export const s2: Strategy = {
  name: "策略2",
  desc: "第一轮必定参加；第二三轮只参加123789；第四五轮只参加1289；",
  judgeContinue: ({ times, leftNum }: TurnState) => {
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
  },
};

/**
 * Always take the first bet. (~75% chance to double your chest, only ~25% chance to lose it.)
 * For the second bet, leave if the revealed card is a 5.
 * For the third bet, leave if the revealed card falls between 4 and 6.
 * For the fourth bet, leave if the revealed card falls between 3 and 7.
 * For the fifth bet, leave if the revealed card falls between 2 and 8.
 */
export const s3: Strategy = {
  name: "策略3",
  desc: "Always take the first bet. (~75% chance to double your chest, only ~25% chance to lose it. For the second bet, leave if the revealed card is a 5. For the third bet, leave if the revealed card falls between 4 and 6. For the fourth bet, leave if the revealed card falls between 3 and 7. For the fifth bet, leave if the revealed card falls between 2 and 8.",
  judgeContinue: ({ times, leftNum }: TurnState) => {
    switch (times) {
      case 1:
        return true;
      case 2:
        return leftNum !== 5;
      case 3:
        return leftNum <= 3 || leftNum >= 7;
      case 4:
        return leftNum <= 2 || leftNum >= 8;
      case 5:
        return leftNum <= 1 || leftNum >= 9;
      default:
        return false;
    }
  },
};
