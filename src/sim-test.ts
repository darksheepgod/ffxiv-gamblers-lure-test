import { randomNum } from "./helpers";
import { defaultJudgeChoose, Strategy } from "./strategy";
import { TurnState } from "./types";

/** 模拟方式测试一个策略 */
export function testStrategy(s: Strategy, gameNums: number) {
  let sum = 0;
  for (let i = 0; i < gameNums; i++) {
    const value = testGame(s, gameNums);
    sum += value;
  }

  // 打印
  const avg = sum / gameNums;
  console.log(`共${gameNums}局，总收益${sum}，平均收益${avg}`);
}

/**
 * 一局游戏
 * @param s 策略
 * @returns 收益
 */
function testGame(s: Strategy, turnNums: number): number {
  // 第一轮左边直接随机一个
  let leftNum = randomNum();

  // 5轮
  for (let times = 1; times <= turnNums; times++) {
    const ts: TurnState = { times, leftNum };
    const { continueGame, rightNum, win } = testTurn(ts, s);

    // 放弃，保留当前收益，收益等于当前轮数
    if (!continueGame) {
      return times;
    }

    // 输了，收益为0，且终止
    if (!win) {
      return 0;
    }

    // 赢了，下一轮；记录数字
    leftNum = rightNum;
  }

  // 5轮都赢了，收益为轮数+1
  return turnNums + 1;
}

/**
 * 一轮
 * @param ts
 * @param s
 * @returns 收益
 */
function testTurn(
  { times, leftNum }: TurnState,
  s: Strategy
): {
  continueGame: boolean;
  rightNum: number;
  win: boolean;
} {
  // 是否继续
  const continueGame = s.judgeContinue({ times, leftNum });

  // 选择了放弃
  if (!continueGame) {
    return {
      continueGame,
      rightNum: 0,
      win: false,
    };
  }

  // 选择了继续

  // 随机右边点数，如果相等就两边都重新随。但此时不能放弃，只能选大小。
  let rightNum = Math.floor(Math.random() * 9 + 1);
  while (rightNum === leftNum) {
    leftNum = Math.floor(Math.random() * 9 + 1);
    rightNum = Math.floor(Math.random() * 9 + 1);
  }

  // 选择大小
  const choose = (s.judgeChoose || defaultJudgeChoose)({ times, leftNum });
  const win = choose === "greater" ? rightNum > leftNum : rightNum < leftNum;

  return {
    continueGame,
    rightNum,
    win,
  };
}
