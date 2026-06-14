export const translations = {
  en: {
    heroTitle: "Book Your Service",
    heroSubtitle: "Schedule expert professionals at your convenience",
    sectionHeading: "How can we help you today?",
    sectionDesc: "Browse our services or search for what you need",
    servicesLabel: "Services",
    selectServices: "Select the services you need",
    whenNeeded: "When do you need service?",
    selectDate: "Select Date",
    selectTime: "Select Time",
    chooseTime: "Choose a time",
    additionalInfo: "Any additional information?",
    placeholder: "Tell us more about your project or any special requests...",
    summaryTitle: "Booking Summary",
    emptySummary: "Select services to see summary",
    date: "Date",
    time: "Time",
    total: "Total",
    bookNow: "Book Now",
    alert: "Please select services and a date/time",
    currency: "EGP",
    am: "AM",
    pm: "PM"
  },
  ar: {
    heroTitle: "احجز خدمتك",
    heroSubtitle: "حدد موعدًا مع المحترفين في الوقت الذي يناسبك",
    sectionHeading: "كيف يمكننا مساعدتك اليوم؟",
    sectionDesc: "تصفح خدماتنا أو ابحث عما تحتاجه",
    servicesLabel: "خدمات",
    selectServices: "حدد الخدمات التي تحتاجها",
    whenNeeded: "متى تحتاج إلى الخدمة؟",
    selectDate: "اختر التاريخ",
    selectTime: "اختر الوقت",
    chooseTime: "اختر وقتاً",
    additionalInfo: "هل هناك أي معلومات إضافية؟",
    placeholder: "أخبرنا المزيد عن مشروعك أو أي طلبات خاصة...",
    summaryTitle: "ملخص الحجز",
    emptySummary: "حدد الخدمات لرؤية الملخص",
    date: "التاريخ",
    time: "الوقت",
    total: "المجموع",
    bookNow: "احجز الآن",
    alert: "الرجاء تحديد الخدمات والتاريخ/الوقت",
    currency: "ج.م",
    am: "ص",
    pm: "م"
  }
};

export const categories = [
  { id: 1, name: { en: 'Plumbing', ar: 'سباكة' }, icon: '🔧', color: 'blue' },
  { id: 2, name: { en: 'Electrical', ar: 'كهرباء' }, icon: '⚡', color: 'yellow' },
  { id: 3, name: { en: 'Cleaning', ar: 'تنظيف' }, icon: '🧹', color: 'purple' },
  { id: 4, name: { en: 'Painting', ar: 'دهانات' }, icon: '🎨', color: 'orange' },
  { id: 5, name: { en: 'Landscaping', ar: 'تنسيق حدائق' }, icon: '🌿', color: 'green' },
  { id: 6, name: { en: 'Maintenance', ar: 'صيانة' }, icon: '🔨', color: 'red' }
];

export const serviceOptions = {
  1: [
    { id: 'p1', name: { en: 'Urgent/Complex Repair', ar: 'إصلاح عاجل/معقد' }, price: 2000 },
    { id: 'p2', name: { en: 'Leak Repair', ar: 'إصلاح تسربات' }, price: 1200 },
    { id: 'p3', name: { en: 'Water Meter Issue', ar: 'مشكلة عداد مياه' }, price: 800 },
    { id: 'p4', name: { en: 'Pipe Installation', ar: 'تركيب مواسير' }, price: 1500 },
    { id: 'p5', name: { en: 'Drain Cleaning', ar: 'تنظيف مجاري' }, price: 1000 }
  ],
  2: [
    { id: 'e1', name: { en: 'Circuit Breaker Repair', ar: 'إصلاح قاطع تيار' }, price: 1500 },
    { id: 'e2', name: { en: 'Outlet Installation', ar: 'تركيب مخرج كهربائي' }, price: 600 },
    { id: 'e3', name: { en: 'Wiring Repair', ar: 'إصلاح تمديدات كهربائية' }, price: 1200 },
    { id: 'e4', name: { en: 'Light Fixture Install', ar: 'تركيب إضاءة' }, price: 800 },
    { id: 'e5', name: { en: 'Electrical Inspection', ar: 'فحص كهربائي' }, price: 750 }
  ],
  3: [
    { id: 'c1', name: { en: 'Deep Cleaning', ar: 'تنظيف عميق' }, price: 2500 },
    { id: 'c2', name: { en: 'Regular Cleaning', ar: 'تنظيف دوري' }, price: 1000 },
    { id: 'c3', name: { en: 'Carpet Cleaning', ar: 'تنظيف سجاد' }, price: 1800 },
    { id: 'c4', name: { en: 'Window Cleaning', ar: 'تنظيف نوافذ' }, price: 600 },
    { id: 'c5', name: { en: 'Post-Construction Clean', ar: 'تنظيف بعد البناء' }, price: 3200 }
  ],
  4: [
    { id: 'pa1', name: { en: 'Interior Painting', ar: 'دهانات داخلية' }, price: 3500 },
    { id: 'pa2', name: { en: 'Exterior Painting', ar: 'دهانات خارجية' }, price: 4500 },
    { id: 'pa3', name: { en: 'Accent Wall', ar: 'جدار مميز' }, price: 1500 },
    { id: 'pa4', name: { en: 'Cabinet Painting', ar: 'دهانات خزائن' }, price: 2000 },
    { id: 'pa5', name: { en: 'Trim Painting', ar: 'دهانات إطارات' }, price: 800 }
  ],
  5: [
    { id: 'l1', name: { en: 'Garden Design', ar: 'تصميم حدائق' }, price: 2500 },
    { id: 'l2', name: { en: 'Lawn Maintenance', ar: 'صيانة عشب' }, price: 600 },
    { id: 'l3', name: { en: 'Tree Trimming', ar: 'تقليم أشجار' }, price: 1500 },
    { id: 'l4', name: { en: 'Plant Installation', ar: 'زراعة نباتات' }, price: 1000 },
    { id: 'l5', name: { en: 'Hardscape Design', ar: 'تصميم تنسيق خارجي' }, price: 3500 }
  ],
  6: [
    { id: 'm1', name: { en: 'General Maintenance', ar: 'صيانة عامة' }, price: 800 },
    { id: 'm2', name: { en: 'HVAC Service', ar: 'خدمات تكييف' }, price: 1500 },
    { id: 'm3', name: { en: 'Gutter Cleaning', ar: 'تنظيف مزاريب' }, price: 1000 },
    { id: 'm4', name: { en: 'Roof Inspection', ar: 'فحص أسطح' }, price: 1500 },
    { id: 'm5', name: { en: 'Caulking & Sealing', ar: 'عزل وسبكه' }, price: 800 }
  ]
};