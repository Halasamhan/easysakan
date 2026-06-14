export const translations = {
  en: {
    direction: 'ltr',
    // Header
    welcome: 'Welcome',
    manage: 'Manage your bookings and saved properties.',
    // Section
    my_bookings: 'My Bookings',
    loading: 'Loading...',
    // Table
    th_property: 'Property',
    th_date: 'Date',
    th_status: 'Status',
    // Statuses
    status_confirmed: 'Confirmed',
    status_accepted: 'Accepted', // ADDED
    status_pending: 'Pending',
    // Empty State
    no_bookings: 'No bookings yet.',
    browse_listings: 'Browse listings',
  },
  ar: {
    direction: 'rtl',
    // Header
    welcome: 'مرحباً',
    manage: 'إدارة حجوزاتك والعقارات المحفوظة.',
    // Section
    my_bookings: 'حجوزاتي',
    loading: 'جاري التحميل...',
    // Table
    th_property: 'العقار',
    th_date: 'التاريخ',
    th_status: 'الحالة',
    // Statuses
    status_confirmed: 'مؤكد',
    status_accepted: 'مقبول', // ADDED
    status_pending: 'قيد الانتظار',
    // Empty State
    no_bookings: 'لا توجد حجوزات حتى الآن.',
    browse_listings: 'تصفح العقارات',
  }
};

// Helper to translate property names coming from the database
export const translatePropertyName = (name, lang) => {
  if (!name) return '—';
  if (lang === 'en') return name;

  return name
    .replace(/Bedroom/gi, 'غرفة نوم')
    .replace(/Packing Service/gi, 'خدمة التعبئة')
    .replace(/Apartment/gi, 'شقة')
    .replace(/Villa/gi, 'فيلا')
    .replace(/Studio/gi, 'ستوديو');
};

export const toArabicNum = (number) => {
  return String(number)
    .replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d])
    .replace('-', '-'); // Keep the dash as is, or change to specific separator if needed
};

export const getStatusLabel = (status, lang) => {
  const map = {
    en: { confirmed: 'Confirmed', accepted: 'Accepted', pending: 'Pending' }, // Added 'accepted'
    ar: { confirmed: 'مؤكد', accepted: 'مقبول', pending: 'قيد الانتظار' }
  };
  return map[lang][status] || status;
};