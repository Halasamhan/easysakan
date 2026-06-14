export const translations = {
  en: {
    direction: 'ltr',
    currency: 'EGP',
    // Nav
    brand: 'TransportHub',
    vendor_portal: 'Vendor Portal',
    // Header
    title: 'Transportation Orders',
    subtitle: 'Review and manage incoming move requests.',
    // Stats
    stat_total: 'Total Orders',
    stat_pending: 'Pending',
    stat_accepted: 'Accepted',
    stat_denied: 'Denied',
    // Filters
    filter_all: 'All',
    filter_pending: 'Pending',
    filter_accepted: 'Accepted',
    filter_denied: 'Denied',
    // Search
    search_ph: 'Search by name, package, location…',
    // Card
    order_id: 'ORDER',
    pickup: 'PICKUP',
    dropoff: 'DROPOFF',
    unit_km: 'km',
    view_details: 'View details →',
    btn_accept: '✓ Accept',
    btn_deny: '✕ Deny',
    // Modal
    modal_customer: 'Customer',
    modal_route: 'Route',
    modal_package: 'Package & Schedule',
    label_phone: 'Phone',
    label_email: 'Email',
    label_addons: 'Add-ons',
    label_date: 'Date',
    label_time: 'Time',
    label_total: 'Total',
    label_notes: 'Customer Notes',
    open_maps: '🗺 Open in Google Maps →',
    msg_accepted: '✓ This order has been accepted',
    msg_denied: '✕ This order has been denied',
    modal_close: 'Close',
    modal_accepting: 'Accepting…',
    modal_denying: 'Denying…',
    // Empty
    loading: 'Loading orders…',
    empty_search: 'No orders match your search.',
    empty_cat: 'No',
    empty_cat_suffix: 'orders yet.',
    no_phone: 'No phone',
    no_email: 'No email',
  },
  ar: {
    direction: 'rtl',
    currency: 'ج.م',
    // Nav
    brand: 'مركز النقل',
    vendor_portal: 'بوابة المزود',
    // Header
    title: 'طلبات النقل',
    subtitle: 'راجع وأدر طلبات النقل الواردة.',
    // Stats
    stat_total: 'إجمالي الطلبات',
    stat_pending: 'معلق',
    stat_accepted: 'مقبول',
    stat_denied: 'مرفوض',
    // Filters
    filter_all: 'الكل',
    filter_pending: 'معلق',
    filter_accepted: 'مقبول',
    filter_denied: 'مرفوض',
    // Search
    search_ph: 'بحث بالاسم، الحزمة، الموقع…',
    // Card
    order_id: 'طلب',
    pickup: 'الاستلام',
    dropoff: 'التسليم',
    unit_km: 'كم',
    view_details: 'عرض التفاصيل ←',
    btn_accept: '✓ قبول',
    btn_deny: '✕ رفض',
    // Modal
    modal_customer: 'العميل',
    modal_route: 'المسار',
    modal_package: 'الحزمة والجدول',
    label_phone: 'الهاتف',
    label_email: 'البريد الإلكتروني',
    label_addons: 'إضافات',
    label_date: 'التاريخ',
    label_time: 'الوقت',
    label_total: 'الإجمالي',
    label_notes: 'ملاحظات العميل',
    open_maps: '🗺 فتح في خرائط جوجل ←',
    msg_accepted: '✓ تم قبول هذا الطلب',
    msg_denied: '✕ تم رفض هذا الطلب',
    modal_close: 'إغلاق',
    modal_accepting: 'جاري القبول…',
    modal_denying: 'جاري الرفض…',
    // Empty
    loading: 'جاري تحميل الطلبات…',
    empty_search: 'لا توجد طلبات تطابق بحثك.',
    empty_cat: 'لا يوجد',
    empty_cat_suffix: 'طلبات بعد.',
    no_phone: 'لا يوجد هاتف',
    no_email: 'لا يوجد بريد إلكتروني',
  }
};

export const toArabicNum = (number) => {
  return String(number)
    .replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d])
    .replace(',', '،');
};

export const getStatusLabel = (status, lang) => {
  const map = {
    en: { pending: 'Pending', accepted: 'Accepted', denied: 'Denied' },
    ar: { pending: 'معلق', accepted: 'مقبول', denied: 'مرفوض' }
  };
  return map[lang][status] || status;
};

// Helper to translate Package Names (handles Unpacking, Bedroom, Furniture, etc.)
export const translatePackage = (pkgStr, lang) => {
  if (!pkgStr || lang === 'en') return pkgStr;
  
  let res = pkgStr;
  
  // IMPORTANT: Define "Unpacking Service" BEFORE "Packing Service" to avoid partial matches like "Unخدمة التعبئة"
  const dict = {
    'Unpacking Service': 'خدمة فك التعبئة',
    'Unpacking': 'فك التعبئة',
    'Packing Service': 'خدمة التعبئة',
    'Box Truck': 'شاحنة مغلقة',
    'Wrapping': 'تغليف',
    'Assembly': 'تجميع',
    'Disassembly': 'تفكيك',
    'Open Truck': 'شاحنة مفتوحة',
    'Van': 'شاحنة صغيرة',
    'Pickup Truck': 'شاحنة بيك أب',
    'Storage': 'تخزين',
    'Labor': 'عمالة',
    'Bedroom': 'غرفة نوم',
    'Furniture': 'أثاث',
    'Apartment': 'شقة',
    'Villa': 'فيلا',
    'Studio': 'ستوديو',
    'Office': 'مكتب',
  };

  // 1. Replace Words
  Object.keys(dict).forEach(k => { 
    res = res.replace(new RegExp(k, 'gi'), dict[k]); 
  });

  // 2. Replace Numbers
  res = res.replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
  
  return res;
};

// Helper to translate Time (e.g., "10:00 AM" -> "١٠:٠٠ ص")
export const formatTime = (timeStr, lang) => {
  if (!timeStr || lang === 'en') return timeStr;
  const parts = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!parts) return timeStr;
  const [, h, m, ampm] = parts;
  const suffix = ampm.toUpperCase() === 'AM' ? 'ص' : 'م';
  return `${toArabicNum(h)}:${toArabicNum(m)} ${suffix}`;
};