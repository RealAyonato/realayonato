// سكربت بسيط لإنشاء ملفات صور فارغة
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.join(__dirname, '..', 'public');

// صور أساسية مطلوبة للمشروع
const essentialImages = [
  // صور الهيرو
  'images/hero/hero-bg.jpg',
  'images/hero/hero-bg-mobile.jpg',
  'images/hero/hero-bg-tablet.jpg',
  
  // صور البروفايل
  'images/profile/avatar.jpg',
  'images/profile/logo.jpg',
  
  // صور البورتفوليو
  'images/portfolio/project-1/thumbnail.jpg',
  'images/portfolio/project-2/thumbnail.jpg',
  'images/portfolio/project-3/thumbnail.jpg',
  'images/portfolio/project-4/thumbnail.jpg',
  
  // صور الخدمات
  'images/services/roblox-gfx.jpg',
  'images/services/video-editing.jpg',
  'images/services/ui-ux-design.jpg',
  
  // أيقونات أساسية
  'favicon.ico',
  'apple-touch-icon.png'
];

console.log('🚀 إنشاء هيكل الصور...');

// إنشاء المجلدات أولاً
const folders = [
  'images/hero',
  'images/profile',
  'images/portfolio/project-1',
  'images/portfolio/project-2',
  'images/portfolio/project-3',
  'images/portfolio/project-4',
  'images/services',
  'images/background',
  'icons'
];

folders.forEach(folder => {
  const fullPath = path.join(baseDir, folder);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`📁 Created folder: ${folder}`);
  }
});

// إنشاء ملفات صور وهمية (بدون محتوى حقيقي، فقط للمسارات)
essentialImages.forEach(imagePath => {
  const fullPath = path.join(baseDir, imagePath);
  const dir = path.dirname(fullPath);
  
  // إنشاء المجلد إذا لم يكن موجوداً
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // إنشاء ملف نصي كبديل مؤقت
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, `// Placeholder for ${imagePath}\n// Replace with actual image`);
    console.log(`✅ Created placeholder: ${imagePath}`);
  }
});

console.log('\n🎉 تم إنشاء هيكل الصور بنجاح!');
console.log('📌 يمكنك الآن وضع الصور الحقيقية في:');
console.log('   - public/images/hero/hero-bg.jpg');
console.log('   - public/images/profile/avatar.jpg');
console.log('   - ... إلخ');
console.log('\n⚠️  ملاحظة: هذه ملفات نصية مؤقتة، استبدلها بصور حقيقية');