export const SellerTranslations = {
  en: {
    hero: {
      title: "List Your Property",
      subtitle: "Reach thousands of buyers and renters across Egypt. Fill in the form to publish your listing instantly.",
      browseListings: "Browse Listings",
      myListings: "View My Listings"
    },
    form: {
      newListing: "New Listing",
      requiredNote: "All fields are required unless marked optional",
      labels: {
        title: "Property Title",
        location: "Location / Area",
        type: "Property Type",
        price: "Price (EGP)",
        space: "Space (m²)",
        phone: "Phone Number",
        description: "Description",
        coverPhoto: "Cover Photo"
      },
      placeholders: {
        title: "e.g. Modern 3-Bedroom Apartment in Maadi",
        location: "e.g. Maadi, Cairo",
        price: "e.g. 2500000",
        space: "e.g. 120",
        phone: "01XXXXXXXXX",
        description: "Describe the property — size, features, amenities..."
      },
      helpers: {
        phone: "Egyptian mobile (01x)"
      },
      selectPlaceholder: "Select type...",
      uploadPrompt: "Click to upload image (JPG, PNG, WEBP)",
      removePhoto: "Remove photo",
      buttons: {
        cancel: "Cancel",
        publishing: "Publishing...",
        publish: "Publish Listing"
      }
    },
    errors: {
      photoRequired: "Cover image is required.",
      loginRequired: "You must be logged in to publish a listing.",
      serverError: "Server error",
      networkError: "Could not reach server. Is XAMPP running?",
      generic: "Something went wrong. Please try again.",
      successRedirect: "redirecting to your dashboard..."
    },
    // Value is kept for backend, Label changes for display
    listingTypes: [
      { value: 'Apartment', label: 'Apartment' },
      { value: 'Villa', label: 'Villa' },
      { value: 'Studio', label: 'Studio' },
      { value: 'Office', label: 'Office' },
      { value: 'Duplex', label: 'Duplex' },
      { value: 'Penthouse', label: 'Penthouse' },
      { value: 'Townhouse', label: 'Townhouse' },
      { value: 'Land', label: 'Land' }
    ],
    locations: [
      { value: 'Maadi, Cairo', label: 'Maadi, Cairo' },
      { value: 'Zamalek, Cairo', label: 'Zamalek, Cairo' },
      { value: 'Heliopolis, Cairo', label: 'Heliopolis, Cairo' },
      { value: 'Nasr City, Cairo', label: 'Nasr City, Cairo' },
      { value: 'New Cairo', label: 'New Cairo' },
      { value: '5th Settlement, Cairo', label: '5th Settlement, Cairo' },
      { value: 'Rehab City, Cairo', label: 'Rehab City, Cairo' },
      { value: 'Mostakbal City, Cairo', label: 'Mostakbal City, Cairo' },
      { value: 'New Administrative Capital', label: 'New Administrative Capital' },
      { value: '6th of October City, Giza', label: '6th of October City, Giza' },
      { value: 'Sheikh Zayed, Giza', label: 'Sheikh Zayed, Giza' },
      { value: 'Dokki, Giza', label: 'Dokki, Giza' },
      { value: 'Mohandessin, Giza', label: 'Mohandessin, Giza' },
      { value: 'Haram, Giza', label: 'Haram, Giza' },
      { value: 'Alexandria', label: 'Alexandria' },
      { value: 'Smouha, Alexandria', label: 'Smouha, Alexandria' },
      { value: 'Sidi Bishr, Alexandria', label: 'Sidi Bishr, Alexandria' },
      { value: 'North Coast', label: 'North Coast' },
      { value: 'El Gouna, Red Sea', label: 'El Gouna, Red Sea' },
      { value: 'Hurghada, Red Sea', label: 'Hurghada, Red Sea' },
      { value: 'Sharm El-Sheikh, South Sinai', label: 'Sharm El-Sheikh, South Sinai' },
      { value: 'Mansoura, Dakahlia', label: 'Mansoura, Dakahlia' },
      { value: 'Tanta, Gharbia', label: 'Tanta, Gharbia' },
      { value: 'Assiut', label: 'Assiut' },
      { value: 'Luxor', label: 'Luxor' },
      { value: 'Aswan', label: 'Aswan' }
    ]
  },
  ar: {
    hero: {
      title: "أضف عقارك",
      subtitle: "تواصل مع آلاف المشترين والمستأجرين في مصر. املأ الاستمارة لنشر إعلانك فوراً.",
      browseListings: "تصفح العقارات",
      myListings: "عرض عقاراتي"
    },
    form: {
      newListing: "عقار جديد",
      requiredNote: "جميع الحقول مطلوبة ما لم يُذكر خلاف ذلك",
      labels: {
        title: "عنوان العقار",
        location: "الموقع / المنطقة",
        type: "نوع العقار",
        price: "السعر (جنيه)",
        space: "المساحة (م²)",
        phone: "رقم الهاتف",
        description: "الوصف",
        coverPhoto: "صورة الغلاف"
      },
      placeholders: {
        title: "مثال: شقة حديثة بـ ٣ غرف نوم في المعادي",
        location: "مثال: المعادي، القاهرة",
        price: "مثال: ٢٥٠٠٠٠٠",
        space: "مثال: ١٢٠",
        phone: "01xxxxxxxxx",
        description: "صف العقار — المساحة، المميزات، الخدمات..."
      },
      helpers: {
        phone: "موبايل مصري (01x)"
      },
      selectPlaceholder: "اختر النوع...",
      uploadPrompt: "اضغط لرفع صورة (JPG, PNG, WEBP)",
      removePhoto: "حذف الصورة",
      buttons: {
        cancel: "إلغاء",
        publishing: "جاري النشر...",
        publish: "نشر العقار"
      }
    },
    errors: {
      photoRequired: "صورة الغلاف مطلوبة.",
      loginRequired: "يجب تسجيل الدخول لنشر إعلان.",
      serverError: "خطأ في الخادم",
      networkError: "تعذر الوصول للخادم. هل برنامج XAMPP يعمل؟",
      generic: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
      successRedirect: "جاري التحويل للوحة التحكم..."
    },
    listingTypes: [
      { value: 'Apartment', label: 'شقة' },
      { value: 'Villa', label: 'فيلا' },
      { value: 'Studio', label: 'ستوديو' },
      { value: 'Office', label: 'مكتب' },
      { value: 'Duplex', label: 'دوبلكس' },
      { value: 'Penthouse', label: 'بنتهاوس' },
      { value: 'Townhouse', label: 'تاون هاوس' },
      { value: 'Land', label: 'أرض' }
    ],
    locations: [
      { value: 'Maadi, Cairo', label: 'المعادي، القاهرة' },
      { value: 'Zamalek, Cairo', label: 'الزمالك، القاهرة' },
      { value: 'Heliopolis, Cairo', label: 'مصر الجديدة، القاهرة' },
      { value: 'Nasr City, Cairo', label: 'مدينة نصر، القاهرة' },
      { value: 'New Cairo', label: 'القاهرة الجديدة' },
      { value: '5th Settlement, Cairo', label: 'التجمع الخامس، القاهرة' },
      { value: 'Rehab City, Cairo', label: 'مدينة الرحاب، القاهرة' },
      { value: 'Mostakbal City, Cairo', label: 'مدينة المستقبل، القاهرة' },
      { value: 'New Administrative Capital', label: 'العاصمة الإدارية الجديدة' },
      { value: '6th of October City, Giza', label: 'مدينة السادس من أكتوبر، الجيزة' },
      { value: 'Sheikh Zayed, Giza', label: 'الشيخ زايد، الجيزة' },
      { value: 'Dokki, Giza', label: 'الدقي، الجيزة' },
      { value: 'Mohandessin, Giza', label: 'المهندسين، الجيزة' },
      { value: 'Haram, Giza', label: 'الهرم، الجيزة' },
      { value: 'Alexandria', label: 'الإسكندرية' },
      { value: 'Smouha, Alexandria', label: 'سموحة، الإسكندرية' },
      { value: 'Sidi Bishr, Alexandria', label: 'سيدي بشر، الإسكندرية' },
      { value: 'North Coast', label: 'الساحل الشمالي' },
      { value: 'El Gouna, Red Sea', label: 'الجونة، البحر الأحمر' },
      { value: 'Hurghada, Red Sea', label: 'الغردقة، البحر الأحمر' },
      { value: 'Sharm El-Sheikh, South Sinai', label: 'شرم الشيخ، جنوب سيناء' },
      { value: 'Mansoura, Dakahlia', label: 'المنصورة، الدقهلية' },
      { value: 'Tanta, Gharbia', label: 'طنطا، الغربية' },
      { value: 'Assiut', label: 'أسيوط' },
      { value: 'Luxor', label: 'الأقصر' },
      { value: 'Aswan', label: 'أسوان' }
    ]
  }
};