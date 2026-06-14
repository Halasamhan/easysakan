// src/data/about.js

// Helper function to convert English numbers to Arabic
export const toArabicNum = (str) => {
  if (typeof str !== 'string') str = str.toString();
  const id = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
  return str.replace(/[0-9]/g, w => id[w]);
};

export const translations = {
  en: {
    direction: 'ltr',
    lang_btn: "العربية",
    
    // Header / Navigation Keys (Shared with Footer)
    nav_home: "🏠 Home",
    nav_listings: "🏢 Listings",
    nav_sell: "Sell",
    nav_transport: "🚚 Transportation",
    nav_services: "🔧 Services",
    nav_contact: "Contact",

    // Hero
    hero_title: "EasySakan",
    hero_desc: "Your All-in-One Platform for Moving, Real Estate, and Furniture Services.",
    hero_btn: "Get Started",
    
    // Mission
    mission_title: "Our Mission",
    mission_desc: "At EasySakan, we simplify the complex process of moving, buying, and selling furniture. We provide a single, trusted platform where you can book a truck, list your home, or find your perfect piece of furniture—all with the ease of a click.",
    
    // Services
    services_title: "Our Services",
    
    // Stats
    stat_1: "Moves Completed",
    stat_2: "Happy Clients",
    stat_3: "Years Active",
    
    // Values
    values_title: "Why Choose EasySakan?",
    val_1_title: "Reliability",
    val_1_desc: "We treat your belongings as if they were our own.",
    val_2_title: "Efficiency",
    val_2_desc: "Fast and efficient execution without compromising safety.",
    val_3_title: "Safety",
    val_3_desc: "Comprehensive insurance and safety measures for your items.",
    
    // Team
    team_title: "Meet The Team",

    // ================== FOOTER KEYS ADDED BELOW ==================
    
    // Footer Branding
    footer_brand: "🏠 EasySakan",
    footer_desc: "Your unified journey in real estate and moving services",
    
    // Footer Navigation
    footer_nav: "Navigation",

    
    // Footer About
    footer_about: "About",
    about_us: "ℹ️ About Us",
    
    // Footer Contact
    footer_contact: "Contact",
    help_center: "❓ Help Center",
    contact_us: "📞 Contact", // Note: Adjusted icon slightly for clarity
    address: "📍 Cairo, Egypt",
    
    // Footer Legal
    footer_legal: "Legal",
    privacy_policy: " 🔐 Privacy Policy",
    terms_conditions: "📝 Terms",
    
    // Footer Social
    footer_social: "Follow Us",
   
    
    // Footer Bottom
    copyright: "© 2026 Easy Sakan. All rights reserved.",
    made_in: "Made with ❤️ in Egypt"
  },

  ar: {
    direction: 'rtl',
    lang_btn: "English",
    
    // Header / Navigation Keys (Shared with Footer)
    nav_home: "🏠 الرئيسية",
    nav_listings: "🏢 العقارات",
    nav_sell: "بيع",
    nav_transport: "🚚 النقل",
    nav_services: "🔧 الخدمات",
    nav_contact: "اتصل بنا",
  
    // Hero
    hero_title: "إيزي سكن",
    hero_desc: "منصتك الشاملة لخدمات النقل، العقارات، والأثاث.",
    hero_btn: "ابـدأ الآن",
    
    // Mission
    mission_title: "رسالتنا",
    mission_desc: "في إيزي سكن، نقوم بتبسيط العملية المعقدة لنقل الأثاث وبيعه وشرائه. نحن نقدم منصة موثوقة واحدة يمكنك من خلالها حجز شاحنة، أو إدراج منزلك للبيع، أو العثور على قطعة الأثاث المثالية — كل ذلك بنقرة واحدة.",
    
    // Services
    services_title: "خدماتنا",
    
    // Stats
    stat_1: "عمليات نقل مكتملة",
    stat_2: "عملاء سعداء",
    stat_3: "سنوات من الخبرة",
    
    // Values
    values_title: "لماذا تختار إيزي سكن؟",
    val_1_title: "الموثوقية",
    val_1_desc: "نتعامل مع ممتلكاتك وكأنها ملك لنا.",
    val_2_title: "الكفاءة",
    val_2_desc: "تنفيذ سريع وفعال دون المساس بالسلامة.",
    val_3_title: "السلامة",
    val_3_desc: "تأمين شامل وإجراءات سلامة لمقتنياتك.",
    
    // Team
    team_title: "تعرف على الفريق",

    // ================== FOOTER KEYS ADDED BELOW ==================

    // Footer Branding
    footer_brand: "🏠 إيزي سكن",
    footer_desc: "رحلتك المتكاملة في مجال العقارات وخدمات النقل",
    
    // Footer Navigation
    footer_nav: "القائمة",
    // Footer About
    footer_about: "عن الشركة",
    about_us: "ℹ️ من نحن",
    
    // Footer Contact
    footer_contact: "تواصل معنا",
    help_center: "❓ مركز المساعدة",
    contact_us: "📞 اتصل بنا", // Note: Adjusted icon slightly for clarity
    address: "📍 القاهرة، مصر",
    
    // Footer Legal
    footer_legal: "قانوني",
    privacy_policy: "🔐 سياسة الخصوصية",
    terms_conditions: "📝 الشروط",
    
    // Footer Social
    footer_social: "تابعنا",
   
    
    // Footer Bottom
    copyright: "© 2026 إيزي سكن. جميع الحقوق محفوظة.",
    made_in: "صنع بـ ❤️ في مصر"
  },

  // Data Arrays (Kept intact)
  services: [
    { en: { title: "Transportation", desc: "Seamless moving services." }, ar: { title: "النقل والحجز", desc: "خدمات نقل سلسة." }, icon: "ri-truck-line", color: "service-icon-blue" },
    { en: { title: "Buy & Sell", desc: "Marketplace for furniture." }, ar: { title: "بيع وشراء", desc: "سوق للأثاث." }, icon: "ri-shopping-cart-line", color: "service-icon-green" },
    { en: { title: "Real Estate", desc: "List your property." }, ar: { title: "العقارات", desc: "أدرج عقارك." }, icon: "ri-home-4-line", color: "service-icon-purple" },
    { en: { title: "Rent & Storage", desc: "Flexible storage." }, ar: { title: "الإيجار والتخزين", desc: "وحدات تخزين آمنة." }, icon: "ri-key-2-line", color: "service-icon-orange" },
    { en: { title: "Additional", desc: "Packing services." }, ar: { title: "خدمات إضافية", desc: "تغليف احترافي." }, icon: "ri-tools-line", color: "service-icon-slate" }
  ],
  team: [
    { name_en: "Ahmed Farouk", name_ar: "أحمد فاروق", role_en: "Founder & CEO", role_ar: "المؤسس والرئيس التنفيذي", img: "https://i.pravatar.cc/150?img=1" },
    { name_en: "Sara Ali", name_ar: "سارة علي", role_en: "Operations Lead", role_ar: "مديرة العمليات", img: "https://i.pravatar.cc/150?img=5" },
    { name_en: "Micheal Taha", name_ar: "ميخائيل طه", role_en: "Senior Mover", role_ar: "ناقل أول", img: "https://i.pravatar.cc/150?img=9" },
    { name_en: "Dina Youssef", name_ar: "دينا يوسف", role_en: "Logistics Manager", role_ar: "مديرة لوجستيات", img: "https://i.pravatar.cc/150?img=10" },
  ]
};