const { chromium } = require(process.env.RUNNER_TEMP + '/fa-review/node_modules/playwright');
const assert = require('node:assert/strict');
const catalogue = require('../public/icons/index.json');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const response = await page.goto('http://127.0.0.1:4321/tools/icon-pack');
  assert.equal(response.status(), 200, 'Gallery route must load');
  await page.waitForSelector('.cutout-card');
  assert.equal(await page.locator('.cutout-card').count(), catalogue.families.length);
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const theme of ['light', 'dark']) {
      await page.evaluate(theme => document.documentElement.setAttribute('data-theme', theme), theme);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Horizontal overflow');
      for (const card of await page.locator('.cutout-card').all()) {
        await card.scrollIntoViewIfNeeded();
        await card.locator('img').evaluate(image => image.decode());
      }
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: `cutout-${width}-${theme}.png`, fullPage: true });
    }
  }
  let variants = 0;
  for (const family of catalogue.families.filter(f => f.variants.length > 1)) {
    const card = page.locator(`[data-family="${family.id}"]`);
    for (const variant of family.variants) {
      await card.locator('select').selectOption(variant.id);
      await card.locator('img').evaluate(image => image.decode());
      assert.equal(await card.locator('img').getAttribute('src'), variant.file);
      assert.equal(await card.locator('img').getAttribute('alt'), variant.alt);
      assert.equal(await card.locator('.asset-download').getAttribute('href'), variant.file);
      assert.equal(await card.locator('.asset-download').getAttribute('download'), `${variant.id}.webp`);
      assert.equal(await card.locator('.cutout-frame').getAttribute('data-ground'), variant.background);
      if (variant.source.url) assert.equal(await card.locator('.asset-source').getAttribute('href'), variant.source.url);
      variants++;
    }
  }
  for (const ground of ['light', 'dark', 'checker']) {
    await page.locator('#asset-ground').selectOption(ground);
    assert.equal(await page.locator(`.cutout-frame[data-ground="${ground}"]`).count(), catalogue.families.length);
  }
  await page.locator('#asset-search').fill('horse');
  const category = catalogue.families.find(f => f.title.toLowerCase().includes('horse')).category;
  await page.locator('#asset-category').selectOption(category);
  for (const card of await page.locator('.cutout-card:visible').all()) {
    assert.equal(await card.getAttribute('data-category'), category);
    assert((await card.getAttribute('data-search')).includes('horse'));
  }
  assert(await page.locator('.cutout-card:visible').count() > 0);
  await page.locator('#asset-search').fill('no-such-cutout-12345');
  assert.equal(await page.locator('.cutout-card:visible').count(), 0);
  assert(await page.locator('.library-empty').isVisible());
  await page.locator('#asset-search').fill('');
  await page.locator('#asset-category').selectOption('');
  assert.equal(await page.locator('.cutout-card:visible').count(), catalogue.families.length);
  assert.deepEqual(errors, []);
  console.log(`Browser checks passed: ${catalogue.families.length} families, ${variants} selectable variants, mobile/desktop, light/dark, grounds and filters.`);
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
