const fs = require('fs');
const path = require('path');

// Update globals.css
const globalsPath = 'src/app/globals.css';
let css = fs.readFileSync(globalsPath, 'utf8');

// 1. Typography Hierarchy
css = css.replace(/--text-h3:.*?;/g, '--text-h3: clamp(1.25rem, 2.5vw, 1.5rem);');
css = css.replace(/--text-h2:.*?;/g, '--text-h2: clamp(2.25rem, 4vw, 3.25rem);');
css = css.replace(/--text-h1:.*?;/g, '--text-h1: clamp(3.5rem, 6vw, 5rem);');

// Colors
css = css.replace(/--color-text-primary:\s*#111827;/g, '--color-text-primary: #0F172A;');
css = css.replace(/--color-text-secondary:\s*#4B5563;/g, '--color-text-secondary: #4B5563;');

const h1Repl = `h1 {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: var(--text-h1);
  letter-spacing: var(--tracking-display);
  color: #FFFFFF;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  font-optical-sizing: auto;
}`;
css = css.replace(/h1\s*\{[^}]*\}/g, h1Repl);

const h2Repl = `h2 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--text-h2);
  letter-spacing: var(--tracking-heading);
  color: #0F172A;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  font-optical-sizing: auto;
}`;
css = css.replace(/h2\s*\{[^}]*\}/g, h2Repl);

const h3Repl = `h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-h3);
  letter-spacing: var(--tracking-subheading);
  color: #1E293B;
  line-height: var(--line-height-snug);
  margin-bottom: 1rem;
  font-optical-sizing: auto;
}`;
css = css.replace(/h3\s*\{[^}]*\}/g, h3Repl);

// 3. Tags
const tagRepl = `.tag {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #1D4ED8;
  background: #EFF6FF;
  padding: 6px 16px;
  border-radius: 999px;
  margin-bottom: 1.25rem;
  border: 1px solid #BFDBFE;
  transition: all var(--transition-base);
}

.tagInverse {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #1D4ED8;
  background: #EFF6FF;
  padding: 6px 16px;
  border-radius: 999px;
  margin-bottom: 1.25rem;
  border: 1px solid #BFDBFE;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}`;
css = css.replace(/\.tag\s*\{[\s\S]*?\.tagInverse\s*\{[\s\S]*?\}/, tagRepl);

// Span in titles
css = css.replace(/\.title\s*span\s*\{[\s\S]*?\}/, '.title span {\n  color: #1E40AF;\n  -webkit-text-fill-color: #1E40AF;\n  background: none;\n}');
css = css.replace(/\.titleInverse\s*span\s*\{[\s\S]*?\}/, '.titleInverse span {\n  color: #FFFFFF;\n  -webkit-text-fill-color: #FFFFFF;\n  background: none;\n}');

fs.writeFileSync(globalsPath, css, 'utf8');

// Update Hero.module.css
const heroPath = 'src/app/components/Hero.module.css';
let hero = fs.readFileSync(heroPath, 'utf8');
hero = hero.replace(/color:\s*#C9A96E;/g, 'color: #FFFFFF;');
// and fix the sublinhado dourado to white as well
hero = hero.replace(/background:\s*#C9A96E;/g, 'background: #FFFFFF;');
fs.writeFileSync(heroPath, hero, 'utf8');

// Update Team.module.css
const teamPath = 'src/app/components/Team.module.css';
let teamCss = fs.readFileSync(teamPath, 'utf8');

teamCss = teamCss.replace(/\.name\s*\{[\s\S]*?\}/, `.name {
  font-family: var(--font-display);
  font-size: var(--text-h3);
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.35rem;
  line-height: 1.2;
}`);
teamCss = teamCss.replace(/\.cro\s*\{[\s\S]*?\}/, `.cro {
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.35rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}`);
teamCss = teamCss.replace(/\.role\s*\{[\s\S]*?\}/, `.role {
  font-family: var(--font-display);
  font-size: 14px;
  color: #2563EB;
  font-weight: 500;
  margin-bottom: 1rem;
}`);
teamCss = teamCss.replace(/\.bio\s*\{[\s\S]*?\}/, `.bio {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 400;
  color: #4B5563;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}`);

teamCss = teamCss.replace(/color:\s*#C9A96E;/g, 'color: #2563EB;');
teamCss = teamCss.replace(/color:\s*#92701E;/g, 'color: #2563EB;'); // wait, I replaced the .role entirely so it's ok
teamCss = teamCss.replace(/rgba\(201,\s*169,\s*110,\s*0\.12\)/g, 'rgba(37, 99, 235, 0.12)');
teamCss = teamCss.replace(/rgba\(201,\s*169,\s*110,\s*0\.3\)/g, 'rgba(37, 99, 235, 0.3)');

fs.writeFileSync(teamPath, teamCss, 'utf8');

console.log("Done JS");
