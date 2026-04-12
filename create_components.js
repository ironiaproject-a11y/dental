const fs = require('fs');
const path = require('path');

const components = [
  'Navbar', 'Hero', 'TrustBar', 'Services', 'DiscountPlan', 
  'Team', 'Testimonials', 'CtaBanner', 'Footer', 'WhatsAppButton'
];

const dir = path.join(__dirname, 'src', 'app', 'components');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

components.forEach(comp => {
  const compPath = path.join(dir, `${comp}.js`);
  const cssPath = path.join(dir, `${comp}.module.css`);
  
  if (!fs.existsSync(compPath)) {
    fs.writeFileSync(compPath, `import styles from './${comp}.module.css';\n\nexport default function ${comp}() {\n  return (\n    <div className={styles.wrapper}>\n      ${comp} Component\n    </div>\n  );\n}\n`);
  }
  
  if (!fs.existsSync(cssPath)) {
    fs.writeFileSync(cssPath, `.wrapper {\n  /* ${comp} styles */\n}\n`);
  }
});

console.log('Components created successfully!');
