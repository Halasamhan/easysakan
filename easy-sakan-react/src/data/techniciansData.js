/* src/data/techniciansData.js */

// Sample technician profiles
export const technicians = [
  {
    id: 'tech-001',
    name: 'Ahmed Hassan',
    name_ar: 'أحمد حسن',
    specialization: 'Plumbing',
    specialization_ar: 'سباكة',
    rating: 4.9,
    reviews: 247,
    experience: '12 years',
    experience_ar: '١٢ سنة',
    verified: true,
    image: '👨‍🔧',
    status: 'available',
    status_ar: 'متاح',
    responseTime: '15 mins',
    responseTime_ar: '١٥ دقيقة'
  },
  {
    id: 'tech-002',
    name: 'Fatima El-Sayed',
    name_ar: 'فاطمة السيد',
    specialization: 'Electrical',
    specialization_ar: 'كهرباء',
    rating: 4.8,
    reviews: 189,
    experience: '10 years',
    experience_ar: '١٠ سنوات',
    verified: true,
    image: '👩‍🔧',
    status: 'available',
    status_ar: 'متاح',
    responseTime: '20 mins',
    responseTime_ar: '٢٠ دقيقة'
  },
  {
    id: 'tech-003',
    name: 'Mohamed Ibrahim',
    name_ar: 'محمد إبراهيم',
    specialization: 'AC & Cooling',
    specialization_ar: 'تكييف وتبريد',
    rating: 4.7,
    reviews: 156,
    experience: '8 years',
    experience_ar: '٨ سنوات',
    verified: true,
    image: '👨‍🔧',
    status: 'available',
    status_ar: 'متاح',
    responseTime: '25 mins',
    responseTime_ar: '٢٥ دقيقة'
  },
  {
    id: 'tech-004',
    name: 'Layla Ahmed',
    name_ar: 'ليلى أحمد',
    specialization: 'Cleaning',
    specialization_ar: 'تنظيف',
    rating: 4.9,
    reviews: 312,
    experience: '15 years',
    experience_ar: '١٥ سنة',
    verified: true,
    image: '👩‍🔧',
    status: 'available',
    status_ar: 'متاح',
    responseTime: '10 mins',
    responseTime_ar: '١٠ دقيقة'
  },
  {
    id: 'tech-005',
    name: 'Karim Nassar',
    name_ar: 'كريم نصار',
    specialization: 'General Maintenance',
    specialization_ar: 'صيانة عامة',
    rating: 4.6,
    reviews: 98,
    experience: '5 years',
    experience_ar: '٥ سنوات',
    verified: false,
    image: '👨‍🔧',
    status: 'available',
    status_ar: 'متاح',
    responseTime: '30 mins',
    responseTime_ar: '٣٠ دقيقة'
  }
];

export const serviceCategories = [
  {
    id: 1,
    title: 'Plumbing',
    title_ar: 'سباكة',
    icon: '🔧',
    color: 'service-blue',
    description: 'Leaks, repairs, installations & maintenance',
    description_ar: 'تسريبات، إصلاحات، تركيبات وصيانة',
    startingPrice: 800,
    popular: true,
    services: [
      { id: 'p1', name: 'Leak Repair', name_ar: 'إصلاح تسريب', price: 1200, time: '1-2 hours', time_ar: '١-٢ ساعة', popular: true },
      { id: 'p2', name: 'Drain Cleaning', name_ar: 'تنظيف مجاري', price: 1000, time: '30 mins', time_ar: '٣٠ دقيقة' },
      { id: 'p3', name: 'Pipe Installation', name_ar: 'تركيب مواسير', price: 1500, time: '2-3 hours', time_ar: '٢-٣ ساعات' },
      { id: 'p4', name: 'Water Meter Issue', name_ar: 'مشكلة عداد المياه', price: 800, time: '1 hour', time_ar: 'ساعة واحدة' },
      { id: 'p5', name: 'Urgent/Complex Repair', name_ar: 'إصلاح عاجل/معقد', price: 2000, time: '2-4 hours', time_ar: '٢-٤ ساعات' }
    ]
  },
  {
    id: 2,
    title: 'Electrical',
    title_ar: 'كهرباء',
    icon: '⚡',
    color: 'service-yellow',
    description: 'Wiring, outlets, fixtures & repairs',
    description_ar: 'أسلاك، مآخذ، تركيبات وإصلاحات',
    startingPrice: 600,
    popular: true,
    services: [
      { id: 'e1', name: 'Outlet Installation', name_ar: 'تركيب مأخذ', price: 600, time: '1 hour', time_ar: 'ساعة واحدة', popular: true },
      { id: 'e2', name: 'Light Fixture Install', name_ar: 'تركيب إضاءة', price: 800, time: '1-2 hours', time_ar: '١-٢ ساعة' },
      { id: 'e3', name: 'Wiring Repair', name_ar: 'إصلاح أسلاك', price: 1200, time: '2-3 hours', time_ar: '٢-٣ ساعات' },
      { id: 'e4', name: 'Circuit Breaker Repair', name_ar: 'إصلاح قاطع كهربائي', price: 1500, time: '1-2 hours', time_ar: '١-٢ ساعة' },
      { id: 'e5', name: 'Electrical Inspection', name_ar: 'فحص كهربائي', price: 750, time: '1 hour', time_ar: 'ساعة واحدة' }
    ]
  },
  {
    id: 3,
    title: 'AC & Cooling',
    title_ar: 'تكييف وتبريد',
    icon: '❄️',
    color: 'service-cyan',
    description: 'Installation, maintenance & repair',
    description_ar: 'تركيب، صيانة وإصلاح',
    startingPrice: 1000,
    popular: true,
    services: [
      { id: 'ac1', name: 'AC Service & Cleaning', name_ar: 'صيانة وتنظيف مكيف', price: 1200, time: '1-2 hours', time_ar: '١-٢ ساعة', popular: true },
      { id: 'ac2', name: 'AC Installation', name_ar: 'تركيب مكيف', price: 2500, time: '3-4 hours', time_ar: '٣-٤ ساعات' },
      { id: 'ac3', name: 'Refrigerant Refill', name_ar: 'تعبئة غاز', price: 1000, time: '1 hour', time_ar: 'ساعة واحدة' },
      { id: 'ac4', name: 'AC Repair', name_ar: 'إصلاح مكيف', price: 1500, time: '2 hours', time_ar: 'ساعتان' },
      { id: 'ac5', name: 'Filter Replacement', name_ar: 'تغيير فلتر', price: 300, time: '30 mins', time_ar: '٣٠ دقيقة' }
    ]
  },
  {
    id: 4,
    title: 'Cleaning',
    title_ar: 'تنظيف',
    icon: '🧹',
    color: 'service-purple',
    description: 'Deep cleaning & regular maintenance',
    description_ar: 'تنظيف عميق وصيانة دورية',
    startingPrice: 600,
    services: [
      { id: 'c1', name: 'Regular Cleaning', name_ar: 'تنظيف دوري', price: 1000, time: '2-3 hours', time_ar: '٢-٣ ساعات', popular: true },
      { id: 'c2', name: 'Deep Cleaning', name_ar: 'تنظيف عميق', price: 2500, time: '4-5 hours', time_ar: '٤-٥ ساعات' },
      { id: 'c3', name: 'Window Cleaning', name_ar: 'تنظيف نوافذ', price: 600, time: '1 hour', time_ar: 'ساعة واحدة' },
      { id: 'c4', name: 'Carpet Cleaning', name_ar: 'تنظيف سجاد', price: 1800, time: '2-3 hours', time_ar: '٢-٣ ساعات' },
      { id: 'c5', name: 'Post-Construction Clean', name_ar: 'تنظيف ما بعد البناء', price: 3200, time: '6-8 hours', time_ar: '٦-٨ ساعات' }
    ]
  }
];
// Bundle packages
export const bundlePackages = [
  {
    id: 'bundle-1',
    name: 'Home Checkup',
    name_ar: 'فحص المنزل', // ARABIC (Fixed)
    description: 'Complete home inspection & basic maintenance',
    description_ar: 'فحص منزل شامل وصيانة أساسية', // ARABIC (Fixed)
    services: ['Electrical Inspection', 'Plumbing Check', 'AC Service'],
    services_ar: ['فحص كهربائي', 'فحص سباكة', 'صيانة تكييف'], // ARABIC (Fixed)
    originalPrice: 2500,
    bundlePrice: 1999,
    savings: 501,
    icon: '🏠'
  },
  {
    id: 'bundle-2',
    name: 'Spring Refresh',
    name_ar: 'تجديد الربيع', // ARABIC (Fixed)
    description: 'Seasonal maintenance package',
    description_ar: 'باقة الصيانة الموسمية', // ARABIC (Fixed)
    services: ['Deep Cleaning', 'AC Service', 'Plumbing Check'],
    services_ar: ['تنظيف عميق', 'صيانة تكييف', 'فحص سباكة'], // ARABIC (Fixed)
    originalPrice: 5000,
    bundlePrice: 3999,
    savings: 1001,
    icon: '🌸'
  },
  {
    id: 'bundle-3',
    name: 'Move-In Ready',
    name_ar: 'جاهزية الانتقال', // ARABIC (Fixed)
    description: 'Complete prep for new occupants',
    description_ar: 'تحضير كامل للسكان الجدد', // ARABIC (Fixed)
    services: ['Deep Cleaning', 'Electrical Check', 'AC Service', 'Plumbing Check'],
    services_ar: ['تنظيف عميق', 'فحص كهربائي', 'صيانة تكييف', 'فحص سباكة'], // ARABIC (Fixed)
    originalPrice: 6200,
    bundlePrice: 4999,
    savings: 1201,
    icon: '🔑'
  }
];

// Helper function to convert numbers to Arabic numerals (dynamic usage)
export const toArabicNum = (str) => {
  const map = {
    '0': '٠', '1': '١', '2': '٢', '3': '٣', '4': '٤',
    '5': '٥', '6': '٦', '7': '٧', '8': '٨', '9': '٩',
    '.': '.', '-': '-'
  };
  return str.toString().replace(/[0-9]/g, function(w) {
    return map[w];
  });
};

export const generateTimeSlots = (selectedDate) => {
  const slots = [];
  const now = new Date();
  const selected = new Date(selectedDate);
  const isToday = selected.toDateString() === now.toDateString();

  const timeSlots = [
    { start: '08:00', end: '10:00', available: true },
    { start: '10:00', end: '12:00', available: true },
    { start: '12:00', end: '14:00', available: Math.random() > 0.3 },
    { start: '14:00', end: '16:00', available: true },
    { start: '16:00', end: '18:00', available: Math.random() > 0.4 },
    { start: '18:00', end: '20:00', available: true }
  ];

  return timeSlots.map(slot => ({
    ...slot,
    available: isToday ? false : slot.available,
    label: `${slot.start} - ${slot.end}`
  }));
};