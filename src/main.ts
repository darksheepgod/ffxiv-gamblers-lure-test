import { s1, s2, Strategy } from "./strategy";
import { TurnState } from "./types";

/** 游戏轮数 */
const MAX_TURNS: number = 5;

/** 测试数量 */
const TEST_COUNT: number = 20_000_000;

/** 随机数字 */
function randomNum(): number {
  return Math.floor(Math.random() * 9 + 1);
}

/** 测试一个策略 */
function test(s: Strategy) {
  let sum = 0;
  for (let i = 0; i < TEST_COUNT; i++) {
    const value = testGame(s);
    sum += value;
  }

  // 打印
  const avg = sum / TEST_COUNT;
  console.log(`测试策略，总次数：${TEST_COUNT}，总收益：${sum}，平均收益：${avg}`);
}

/**
 * 一局游戏
 * @param s 策略
 * @returns 收益
 */
function testGame(s: Strategy): number {
  // 第一轮左边直接随机一个
  let leftNum = randomNum();

  // 5轮
  for (let times = 1; times <= MAX_TURNS; times++) {
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
  return MAX_TURNS + 1;
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
  const continueGame = s({ times, leftNum });

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

  // 1~4就选大于，5~9就选小于
  const win = leftNum < 5 ? rightNum > leftNum : rightNum < leftNum;
  return {
    continueGame,
    rightNum,
    win,
  };
}

function main(): void {
  // 策略1
  console.log("策略1：");
  test(s1);

  // 策略2
  console.log("策略2：");
  test(s2);
}
main();
