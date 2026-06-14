export const translations = {
  en: {
    direction: 'ltr',
    // Header
    title: 'Services Dashboard',
    welcome: 'Hello,',
    desc: 'Track your service bookings below.',
    // Stats
    stat_total: 'Total Orders',
    stat_pending: 'Pending',
    stat_accepted: 'Accepted',
    stat_denied: 'Denied',
    // Table
    th_id: '#',
    th_cat: 'Category',
    th_serv: 'Services',
    th_date: 'Date & Time',
    th_total: 'Total',
    th_status: 'Status',
    // Empty State
    empty_msg: 'No service orders yet.',
    empty_btn: 'Book a Service',
    // Currency
    currency: 'EGP',
    // Location
    th_location: 'Location',
    // Edit Price
    edit_price:    'Edit Price',
    save_price:    'Save',
    cancel:        'Cancel',
    price_updated: 'Price updated successfully',
  },
  ar: {
    direction: 'rtl',
    // Header
    title: 'لوحة خدماتي',
    welcome: 'مرحباً،',
    desc: 'تتبع حجوزات الخدمة أدناه.',
    // Stats
    stat_total: 'إجمالي الطلبات',
    stat_pending: 'معلق',
    stat_accepted: 'مقبول',
    stat_denied: 'مرفوض',
    // Table
    th_id: '#',
    th_cat: 'الفئة',
    th_serv: 'الخدمات',
    th_date: 'التاريخ والوقت',
    th_total: 'الإجمالي',
    th_status: 'الحالة',
    // Empty State
    empty_msg: 'لا توجد طلبات خدمات حتى الآن.',
    empty_btn: 'احجز خدمة',
    // Currency
    currency: 'ج.م',
    // Location
    th_location: 'الموقع',
    // Edit Price
    edit_price:    'تعديل السعر',
    save_price:    'حفظ',
    cancel:        'إلغاء',
    price_updated: 'تم تحديث السعر بنجاح',
  }
};

export const getStatusLabel = (status, lang) => {
  const map = {
    en: {
      pending: 'Pending',
      accepted: 'Accepted',
      denied: 'Denied',
      'in-progress': 'In Progress'
    },
    ar: {
      pending: 'معلق',
      accepted: 'مقبول',
      denied: 'مرفوض',
      'in-progress': 'جاري العمل'
    }
  };
  return map[lang][status] || status;
};

export const toArabicNum = (number) => {
  return String(number)
    .replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d])
    .replace('.', '٫');
};