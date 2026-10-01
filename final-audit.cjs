const { chromium } = require("playwright");
const url = process.env.URL;

const VIEWPORTS = [
  { name: "1920", width: 1920, height: 1080 },
  { name: "1440", width: 1440, height: 900 },
  { name: "900", width: 900, height: 900 },
  { name: "768", width: 768, height: 1024 },
  { name: "390", width: 390, height: 844 },
  { name: "320", width: 320, height: 720 },
];

(async () => {
  const browser = await chromium.launch();
  const results = [];

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
    });
    const consoleErrors = [];
    const failedRequests = [];
    page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
    page.on("pageerror", (e) => consoleErrors.push("pageerror: " + e.message));
    page.on("requestfailed", (r) => failedRequests.push(r.url().slice(0, 70)));

    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(4500);

    // slow scroll through the page
    const total = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < total; y += 400) {
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(45);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(900);

    const info = await page.evaluate(() => {
      const de = document.documentElement;
      const offenders = [];
      document.querySelectorAll("*").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0) return;
        if (r.right > de.clientWidth + 1 || r.left < -1) {
          const cs = getComputedStyle(el);
          if (cs.position === "fixed") return;
          offenders.push(
            el.tagName.toLowerCase() +
              "." +
              String(el.className).split(" ").slice(0, 2).join(".") +
              " [" + Math.round(r.left) + "," + Math.round(r.right) + "]"
          );
        }
      });
      const reveals = document.querySelectorAll("[data-reveal]");
      const revealed = document.querySelectorAll("[data-reveal].is-revealed");
      return {
        scrollW: de.scrollWidth,
        clientW: de.clientWidth,
        hScroll: de.scrollWidth > de.clientWidth + 1,
        offenders: offenders.slice(0, 6),
        revealTotal: reveals.length,
        revealDone: revealed.length,
        conf: document.querySelector(".conf-value")?.textContent,
        heroConfBar: (() => {
          const c = document.querySelector(".conf-fill");
          return c ? Math.round(c.getBoundingClientRect().width) : null;
        })(),
      };
    });

    results.push({ vp: vp.name, ...info, consoleErrors, failedRequests });
    await page.close();
  }

  for (const r of results) {
    console.log(
      `\n=== ${r.vp} === hScroll=${r.hScroll} (${r.scrollW}/${r.clientW}) reveals=${r.revealDone}/${r.revealTotal} conf=${r.conf} bar=${r.heroConfBar}`
    );
    if (r.offenders.length) console.log("  offenders:", JSON.stringify(r.offenders));
    if (r.consoleErrors.length) console.log("  consoleErrors:", JSON.stringify(r.consoleErrors));
    if (r.failedRequests.length) console.log("  failedRequests:", JSON.stringify(r.failedRequests));
  }

  const bad = results.filter(
    (r) => r.hScroll || r.consoleErrors.length || r.failedRequests.length
  );
  console.log("\nSUMMARY:", bad.length === 0 ? "ALL CLEAN" : JSON.stringify(bad.map((r) => r.vp)));
  await browser.close();
})();
