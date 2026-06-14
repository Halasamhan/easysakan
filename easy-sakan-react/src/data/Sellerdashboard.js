export const translations = {
  en: {
    direction: 'ltr', currency: 'EGP', unit_m: 'm²',
    brand: 'SellerHub', search_ph: 'Search properties...', listings: 'Listings',
    seller_title: 'Property Seller', location: 'Location', units: 'Units',
    stat_avail: 'Available', stat_sold: 'Sold', stat_total: 'Total Units', stat_val: 'Listed Value',
    page_title: 'Property', page_accent: 'Dashboard', page_sub: 'Overview of your sold, active sale, and rental listings',
    tab_avail: 'Available', tab_sold: 'Sold',
    sold_overview: 'Sold Units Overview', sold_count: 'Units Sold', sold_total: 'Total Value',
    badge_sold: 'Sold', badge_avail: 'Available', badge_closed: 'Closed',
    btn_price: 'Price', btn_mark_sold: 'Mark Sold', btn_mark_avail: 'Mark Available',
    modal_update_price: 'Update Price', modal_new_price: 'New Price', modal_save: 'Save Price', modal_saving: 'Saving...',
    modal_delete_title: 'Delete Unit', modal_delete_confirm: 'Are you sure you want to delete', modal_delete_btn: 'Yes, Delete', modal_deleting: 'Deleting...', cancel: 'Cancel',
    loading: 'Loading your units...', empty_search: 'No properties match your search', empty_cat: 'No units in this category', clear_search: 'Clear search',
    toast_copy: 'Copied!', toast_price: 'Price updated!', toast_sold: 'Unit marked as sold!', toast_avail: 'Unit marked as available!', toast_delete: 'Unit deleted.', toast_err: 'Failed to load. Is XAMPP running?',
    suffix_m: 'M', suffix_k: 'K',
  },
  ar: {
    direction: 'rtl', currency: 'ج.م', unit_m: 'م²',
    brand: 'SellerHub', search_ph: 'بحث عن عقارات...', listings: 'العقارات',
    seller_title: 'بائع عقارات', location: 'الموقع', units: 'الوحدات',
    stat_avail: 'متاح', stat_sold: 'تم البيع', stat_total: 'إجمالي الوحدات', stat_val: 'قيمة القائمة',
    page_title: 'عقارات', page_accent: 'لوحة التحكم', page_sub: 'نظرة عامة على العقارات المباعة والمتاحة لديك',
    tab_avail: 'متاح', tab_sold: 'تم البيع',
    sold_overview: 'نظرة عامة على الوحدات المباعة', sold_count: 'الوحدات المباعة', sold_total: 'إجمالي القيمة',
    badge_sold: 'تم البيع', badge_avail: 'متاح', badge_closed: 'مغلق',
    btn_price: 'السعر', btn_mark_sold: 'تم البيع', btn_mark_avail: 'جعله متاح',
    modal_update_price: 'تحديث السعر', modal_new_price: 'السعر الجديد', modal_save: 'حفظ السعر', modal_saving: 'جاري الحفظ...',
    modal_delete_title: 'حذف الوحدة', modal_delete_confirm: 'هل أنت متأكد أنك تريد حذف', modal_delete_btn: 'نعم، احذف', modal_deleting: 'جاري الحذف...', cancel: 'إلغاء',
    loading: 'جاري تحميل الوحدات...', empty_search: 'لا توجد عقارات تطابق بحثك', empty_cat: 'لا توجد وحدات في هذه الفئة', clear_search: 'مسح البحث',
    toast_copy: 'تم النسخ!', toast_price: 'تم تحديث السعر!', toast_sold: 'تم تعليم الوحدة كمباعة!', toast_avail: 'تم تعليم الوحدة كمتاحة!', toast_delete: 'تم حذف الوحدة.', toast_err: 'فشل التحميل. هل XAMPP يعمل؟',
    suffix_m: 'م', suffix_k: 'ألف',
  }
};

export const toArabicNum = (number) => {
  return String(number)
    .replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d])
    .replace('.', '٫');
};