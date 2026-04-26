import os
import re

# Update globals.css
globals_path = 'src/app/globals.css'
with open(globals_path, 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Typography Hierarchy
css = re.sub(r'--text-h3:.*?;', '--text-h3: clamp(1.25rem, 2.5vw, 1.5rem);', css)
css = re.sub(r'--text-h2:.*?;', '--text-h2: clamp(2.25rem, 4vw, 3.25rem);', css)
css = re.sub(r'--text-h1:.*?;', '--text-h1: clamp(3.5rem, 6vw, 5rem);', css)

# Colors
css = re.sub(r'--color-text-primary:\s*#111827;', '--color-text-primary: #0F172A;', css)
css = re.sub(r'--color-text-secondary:\s*#4B5563;', '--color-text-secondary: #4B5563;', css)

h1_repl = r'''h1 {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: var(--text-h1);
  letter-spacing: var(--tracking-display);
  color: #FFFFFF;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  font-optical-sizing: auto;
}'''
css = re.sub(r'h1\s*\{[^}]*\}', h1_repl, css)

h2_repl = r'''h2 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--text-h2);
  letter-spacing: var(--tracking-heading);
  color: #0F172A;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  font-optical-sizing: auto;
}'''
css = re.sub(r'h2\s*\{[^}]*\}', h2_repl, css)

h3_repl = r'''h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-h3);
  letter-spacing: var(--tracking-subheading);
  color: #1E293B;
  line-height: var(--line-height-snug);
  margin-bottom: 1rem;
  font-optical-sizing: auto;
}'''
css = re.sub(r'h3\s*\{[^}]*\}', h3_repl, css)

# 3. Tags
tag_repl = r'''.tag {
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
}'''
css = re.sub(r'\.tag\s*\{.*?\.tagInverse\s*\{.*?\}', tag_repl, css, flags=re.DOTALL)

# Span in titles
css = re.sub(r'\.title\s*span\s*\{.*?\}', '.title span {\n  color: #1E40AF;\n  -webkit-text-fill-color: #1E40AF;\n  background: none;\n}', css, flags=re.DOTALL)
css = re.sub(r'\.titleInverse\s*span\s*\{.*?\}', '.titleInverse span {\n  color: #FFFFFF;\n  -webkit-text-fill-color: #FFFFFF;\n  background: none;\n}', css, flags=re.DOTALL)

with open(globals_path, 'w', encoding='utf-8') as f:
    f.write(css)

# Update Hero.module.css
hero_path = 'src/app/components/Hero.module.css'
with open(hero_path, 'r', encoding='utf-8') as f:
    hero = f.read()
hero = re.sub(r'color:\s*#C9A96E;', 'color: #FFFFFF;', hero)
with open(hero_path, 'w', encoding='utf-8') as f:
    f.write(hero)

# Update Team.module.css
team_path = 'src/app/components/Team.module.css'
with open(team_path, 'r', encoding='utf-8') as f:
    team_css = f.read()

team_css = re.sub(r'\.name\s*\{.*?\}', '.name {\n  font-family: var(--font-display);\n  font-size: var(--text-h3);\n  font-weight: 700;\n  color: #0F172A;\n  margin-bottom: 0.35rem;\n  line-height: 1.2;\n}', team_css, flags=re.DOTALL)
team_css = re.sub(r'\.cro\s*\{.*?\}', '.cro {\n  font-family: var(--font-display);\n  font-size: 13px;\n  font-weight: 500;\n  color: #374151;\n  margin-bottom: 0.35rem;\n  display: flex;\n  align-items: center;\n  gap: 0.3rem;\n}', team_css, flags=re.DOTALL)
team_css = re.sub(r'\.role\s*\{.*?\}', '.role {\n  font-family: var(--font-display);\n  font-size: 14px;\n  color: #2563EB;\n  font-weight: 500;\n  margin-bottom: 1rem;\n}', team_css, flags=re.DOTALL)
team_css = re.sub(r'\.bio\s*\{.*?\}', '.bio {\n  font-family: var(--font-display);\n  font-size: 16px;\n  font-weight: 400;\n  color: #4B5563;\n  line-height: 1.6;\n  margin-bottom: 1.5rem;\n}', team_css, flags=re.DOTALL)

team_css = re.sub(r'color:\s*#C9A96E;', 'color: #2563EB;', team_css)
team_css = re.sub(r'rgba\(201,\s*169,\s*110,\s*0\.12\)', 'rgba(37, 99, 235, 0.12)', team_css)
team_css = re.sub(r'rgba\(201,\s*169,\s*110,\s*0\.3\)', 'rgba(37, 99, 235, 0.3)', team_css)

with open(team_path, 'w', encoding='utf-8') as f:
    f.write(team_css)

print("Done")
