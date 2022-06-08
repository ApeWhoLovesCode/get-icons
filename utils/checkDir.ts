import fs from 'fs';
export default function checkoutDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {
      recursive: true
    });
  }
}

