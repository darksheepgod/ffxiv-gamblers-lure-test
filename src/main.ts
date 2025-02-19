import { testStrategy } from "./sim-test";
import { s1, s2, s3, Strategy } from "./strategy";

// 策略
const strategies: Strategy[] = [s1, s2, s3];

/** 模拟方式测试多个策略 */
async function main() {
  // 模拟方式
  const gameNums = 200_000_000;

  for (const [i, s] of strategies.entries()) {
    // 输出一下
    console.log(
      `testing ${i + 1}/${strategies.length} ${s.name} （${s.desc}）`
    );
    testStrategy(s, gameNums);
  }
}
main();
