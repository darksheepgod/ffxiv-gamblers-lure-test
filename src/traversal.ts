import { createWriteStream } from "fs";
import { testStrategy } from "./sim-test";
import { Strategy } from "./strategy";

// 遍历所有策略，暴力计算
function traversal(): void {
  // 一共5轮
  // 每一轮只有6种策略，即保留0~保留5，共6^5=7776种策略
  // 实际上每轮的保留只会小于等于上一轮，不过懒得写了

  // 生成所有策略
  const strategies: Strategy[] = [];
  // 直接五重循环
  for (let a = 5; a <= 5; a++) {  // 第一轮一定是全保留
    for (let b = 0; b <= a; b++) {
      for (let c = 0; c <= b; c++) {
        for (let d = 0; d <= c; d++) {
          for (let e = 0; e <= d; e++) {
            const s: Strategy = {
              name: `${a}${b}${c}${d}${e}`,
              desc: `保留${a}~保留${b}~保留${c}~保留${d}~保留${e}`,
              judgeContinue: (ts) => {
                const { times, leftNum } = ts;
                switch (times) {
                  case 1:
                    return leftNum <= a || leftNum >= 10 - a;
                  case 2:
                    return leftNum <= b || leftNum >= 10 - b;
                  case 3:
                    return leftNum <= c || leftNum >= 10 - c;
                  case 4:
                    return leftNum <= d || leftNum >= 10 - d;
                  case 5:
                    return leftNum <= e || leftNum >= 10 - e;
                  default:
                    return false;
                }
              },
            };
            strategies.push(s);
          }
        }
      }
    }
  }

  // 模拟
  const gameNums = 10_000_000;

  // 将console输出重定向到文件
  const oriLog = console.log;
  const logFileName = "traversal.log";
  const stream = createWriteStream(logFileName);
  console.log = (...args: any[]) => {
    // oriLog(...args);
    const msg = args.join(" ") + "\n";
    stream.write(msg, "utf8");
  };

  for (const [i, s] of strategies.entries()) {
    oriLog(`${i + 1}/${strategies.length}`);
    console.log(
      `testing ${i + 1}/${strategies.length} ${s.name} （${s.desc}）`
    );
    testStrategy(s, gameNums);
  }

  // 关闭文件
  stream.end();
  // 恢复console
  console.log = oriLog;
}
traversal();
