export const servicesTranslations = {
  en: {
    // --- UI Strings ---
    search: {
      title: "What do you need help with?",
      subtitle: "Choose from our expert home services",
      placeholder: "Search plumbing, electrical, cleaning, AC...",
      btn: "Search"
    },
    cta: {
      title: "⚡ Book a Technician in 60 Seconds",
      subtitle: "No waiting. No hassle. Instant booking confirmation.",
      btn: "Get Started Now →"
    },
    steps: {
      title: "How Booking Works",
      1: { label: "Choose Service", desc: "Select from Plumbing, Electrical, AC, Cleaning & more" },
      2: { label: "Pick Date & Time", desc: "See available slots and choose what works best" },
      3: { label: "Enter Location", desc: "Add your address or choose from saved locations" },
      4: { label: "Confirm & Book", desc: "Get instant confirmation + SMS & email updates" }
    },
    section: {
      ourServices: "Our Services",
      bundles: "💰 Bundle Packages & Save",
      addBundle: "Add Bundle to Cart",
      viewAll: "View All",
      favorite: "❤️",
      startingAt: "Starting at",
      popular: "⭐ Most Popular",
      popularShort: "⭐ Popular"
    },
    booking: {
      step1: "Step 1: Choose Your Service",
      step1Sub: "Select services you need",
      step2: "Step 2: Service Options & Date/Time",
      step2Sub: "Select specific services and time",
      step3: "Step 3: Location & Price Estimate",
      backToServices: "← Back to Services",
      back: "← Back",
      next: "Next: Location & Price →",
      confirm: "Confirm Booking →",
      selectDate: "📅 Select Date",
      selectTime: "🕐 Select Time Slot",
      locationLabel: "📍 Service Location",
      locationPlaceholder: "Select saved location or enter new",
      orAddress: "Or type your address",
      priceEstimate: "💰 Price Estimate",
      total: "Total:",
      confirmTitle: "✓ Booking Confirmed!",
      assignedTech: "Your Assigned Technician",
      timeline: "Booking Timeline",
      details: "Booking Details",
      date: "Date:",
      time: "Time:",
      location: "Location:",
      stayUpdated: "📞 Stay Updated",
      completeBooking: "Complete Booking & Pay →",
      timeSlots: [
        { value: '08:00 AM - 10:00 AM', label: '08:00 AM – 10:00 AM' },
        { value: '10:00 AM - 12:00 PM', label: '10:00 AM – 12:00 PM' },
        { value: '12:00 PM - 02:00 PM', label: '12:00 PM – 02:00 PM' },
        { value: '02:00 PM - 04:00 PM', label: '02:00 PM – 04:00 PM' },
        { value: '04:00 PM - 06:00 PM', label: '04:00 PM – 06:00 PM' }
      ],
      contactOptions: {
        chat: "Live Chat", chatDesc: "Chat with support",
        whatsapp: "WhatsApp", whatsappDesc: "+20 1001234567",
        track: "Track Live", trackDesc: "GPS tracking"
      }
    },
    addresses: {
      home: "Home",
      office: "Office",
      defaultLoc: "New Cairo, Cairo"
    },
    ctaBottom: {
      title: "Need Help Right Now?",
      subtitle: "Call us or chat with support for immediate assistance",
      callUs: "📞 Call Us Now",
      backHome: "Back to Home"
    },
    errors: {
      missingFields: "Please complete all required fields",
      selectLocation: "Please select a service location on the map."
    },
    mapPicker: {
      locationLabel: "📍 Service Location",
      locationPlaceholder: "Search your address...",
      locationSet: "✓ Location set on map",
      instruction: "Click on the map or search above to set your service location"
    },

    // --- Service List & Options (EN) ---
    servicesList: [
      {
        id: 1,
        title: 'Plumbing',
        description: 'Expert plumbing services for leaks, repairs, installations, and maintenance',
        icon: '🔧',
        color: 'service-blue'
      },
      {
        id: 2,
        title: 'Electrical',
        description: 'Professional electrical work from fixture installation to wiring repairs',
        icon: '⚡',
        color: 'service-yellow'
      },
      {
        id: 3,
        title: 'Cleaning',
        description: 'Comprehensive home and commercial cleaning services for a spotless space',
        icon: '🧹',
        color: 'service-purple'
      },
      {
        id: 4,
        title: 'Landscaping',
        description: 'Beautiful garden design and maintenance to enhance your outdoor space',
        icon: '🌿',
        color: 'service-green'
      },
      {
        id: 5,
        title: 'Painting',
        description: 'Professional interior and exterior painting for a fresh, vibrant look',
        icon: '🎨',
        color: 'service-orange'
      },
      {
        id: 6,
        title: 'Maintenance',
        description: 'Regular maintenance and repairs to keep your property in top condition',
        icon: '🔨',
        color: 'service-red'
      }
    ],

    serviceOptions: {
      1: [
        { id: 'p1', name: 'Urgent/Complex Repair', price: 2000 },
        { id: 'p2', name: 'Leak Repair', price: 1200 },
        { id: 'p3', name: 'Water Meter Issue', price: 800 },
        { id: 'p4', name: 'Pipe Installation', price: 1500 },
        { id: 'p5', name: 'Drain Cleaning', price: 1000 }
      ],
      2: [
        { id: 'e1', name: 'Circuit Breaker Repair', price: 1500 },
        { id: 'e2', name: 'Outlet Installation', price: 600 },
        { id: 'e3', name: 'Wiring Repair', price: 1200 },
        { id: 'e4', name: 'Light Fixture Install', price: 800 },
        { id: 'e5', name: 'Electrical Inspection', price: 750 }
      ],
      3: [
        { id: 'c1', name: 'Deep Cleaning', price: 2500 },
        { id: 'c2', name: 'Regular Cleaning', price: 1000 },
        { id: 'c3', name: 'Carpet Cleaning', price: 1800 },
        { id: 'c4', name: 'Window Cleaning', price: 600 },
        { id: 'c5', name: 'Post-Construction Clean', price: 3200 }
      ],
      4: [
        { id: 'l1', name: 'Garden Design', price: 2500 },
        { id: 'l2', name: 'Lawn Maintenance', price: 600 },
        { id: 'l3', name: 'Tree Trimming', price: 1500 },
        { id: 'l4', name: 'Plant Installation', price: 1000 },
        { id: 'l5', name: 'Hardscape Design', price: 3500 }
      ],
      5: [
        { id: 'pa1', name: 'Interior Painting', price: 3500 },
        { id: 'pa2', name: 'Exterior Painting', price: 4500 },
        { id: 'pa3', name: 'Accent Wall', price: 1500 },
        { id: 'pa4', name: 'Cabinet Painting', price: 2000 },
        { id: 'pa5', name: 'Trim Painting', price: 800 }
      ],
      6: [
        { id: 'm1', name: 'General Maintenance', price: 800 },
        { id: 'm2', name: 'HVAC Service', price: 1500 },
        { id: 'm3', name: 'Gutter Cleaning', price: 1000 },
        { id: 'm4', name: 'Roof Inspection', price: 1500 },
        { id: 'm5', name: 'Caulking & Sealing', price: 800 }
      ]
    }
  },
  ar: {
    // --- Arabic UI Strings ---
    search: {
      title: "بم تحتاج إلى مساعدة؟",
      subtitle: "اختر من خدمات المنزل المتميزة لدينا",
      placeholder: "بحث سباكة، كهرباء، تنظيف، تكييف...",
      btn: "بحث"
    },
    cta: {
      title: "⚡ احجز فني في ٦٠ ثانية",
      subtitle: "لا انتظار. لا تعقيد. تأكيد حجز فوري.",
      btn: "ابدأ الآن ←"
    },
    steps: {
      title: "كيف يعمل الحجز",
      1: { label: "الخطوة ١: اختر الخدمة", desc: "اختر من السباكة، الكهرباء، التكييف، التنظيف والمزيد" },
      2: { label: "الخطوة ٢: اختر التاريخ والوقت", desc: "شاهد المواعيد المتاحة واختر ما يناسبك" },
      3: { label: "الخطوة ٣: أدخل الموقع", desc: "أضف عنوانك أو اختر من العناوين المحفوظة" },
      4: { label: "الخطوة ٤: تأكيد وحجز", desc: "احصل على تأكيد فوري + تحديثات SMS والبريد الإلكتروني" }
    },
    section: {
      ourServices: "خدماتنا",
      bundles: "💰 حزم وفر",
      addBundle: "أضف الحزمة للسلة",
      viewAll: "عرض الكل",
      favorite: "❤️",
      startingAt: "يبدأ من",
      popular: "⭐ الأكثر شعبية",
      popularShort: "⭐ شائع"
    },
    booking: {
      step1: "الخطوة ١: اختر خدمتك",
      step1Sub: "اختر الخدمات التي تحتاجها",
      step2: "الخطوة ٢: خيارات الخدمة والتاريخ والوقت",
      step2Sub: "اختر خدمات محددة والوقت",
      step3: "الخطوة ٣: الموقع وتقدير السعر",
      backToServices: "→ عودة للخدمات",
      back: "عودة →",
      next: "التالي: الموقع والسعر ←",
      confirm: "تأكيد الحجز ←",
      selectDate: "📅 اختر التاريخ",
      selectTime: "🕐 اختر الموعد",
      locationLabel: "📍 موقع الخدمة",
      locationPlaceholder: "اختر موقع محفوظ أو أدخل جديد",
      orAddress: "أو اكتب عنوانك",
      priceEstimate: "💰 تقدير السعر",
      total: "المجموع:",
      confirmTitle: "✓ تم تأكيد الحجز!",
      assignedTech: "الفني الخاص بك",
      timeline: "جدول الحجز",
      details: "تفاصيل الحجز",
      date: "التاريخ:",
      time: "الوقت:",
      location: "الموقع:",
      stayUpdated: "📞 ابق على اطلاع",
      completeBooking: "إكمال الحجز والدفع ←",
      timeSlots: [
        { value: '08:00 AM - 10:00 AM', label: '٨:٠٠ ص – ١٠:٠٠ ص' },
        { value: '10:00 AM - 12:00 PM', label: '١٠:٠٠ ص – ١٢:٠٠ م' },
        { value: '12:00 PM - 02:00 PM', label: '١٢:٠٠ م – ٢:٠٠ م'  },
        { value: '02:00 PM - 04:00 PM', label: '٢:٠٠ م – ٤:٠٠ م'   },
        { value: '04:00 PM - 06:00 PM', label: '٤:٠٠ م – ٦:٠٠ م'   }
      ],
      contactOptions: {
        chat: "محادثة مباشرة", chatDesc: "تحدث مع الدعم",
        whatsapp: "واتساب", whatsappDesc: "+20 1001234567",
        track: "تتبع مباشر", trackDesc: "تتبع GPS"
      }
    },
    addresses: {
      home: "المنزل",
      office: "المكتب",
      defaultLoc: "القاهرة الجديدة، القاهرة"
    },
    ctaBottom: {
      title: "هل تحتاج مساعدة الآن؟",
      subtitle: "اتصل بنا أو تحدث مع الدعم للحصول على مساعدة فورية",
      callUs: "📞 اتصل بنا الآن",
      backHome: "عودة للرئيسية"
    },
    errors: {
      missingFields: "الرجاء إكمال جميع الحقول المطلوبة",
      selectLocation: "الرجاء تحديد موقع الخدمة على الخريطة."
    },
    mapPicker: {
      locationLabel: "📍 موقع الخدمة",
      locationPlaceholder: "ابحث عن عنوانك...",
      locationSet: "✓ تم تحديد الموقع على الخريطة",
      instruction: "انقر على الخريطة أو ابحث أعلاه لتحديد موقع الخدمة"
    },

    // --- Service List & Options (AR) ---
    servicesList: [
      {
        id: 1,
        title: 'سباكة',
        description: 'خدمات سباكة احترافية للتسريبات، الإصلاحات، التركيبات والصيانة',
        icon: '🔧',
        color: 'service-blue'
      },
      {
        id: 2,
        title: 'كهرباء',
        description: 'أعمال كهربائية احترافية من تركيب التركيبات إلى إصلاح التمديدات',
        icon: '⚡',
        color: 'service-yellow'
      },
      {
        id: 3,
        title: 'تنظيف',
        description: 'خدمات تنظيف شاملة للمنازل والمحلات التجارية لمكان خالٍ من الأوساخ',
        icon: '🧹',
        color: 'service-purple'
      },
      {
        id: 4,
        title: 'تنسيق حدائق',
        description: 'تصميم وصيانة حدائق جميلة لتعزيز مساحتك الخارجية',
        icon: '🌿',
        color: 'service-green'
      },
      {
        id: 5,
        title: 'دهانات',
        description: 'دهانات احترافية للداخل والخارج لمظهر جديد وحيوي',
        icon: '🎨',
        color: 'service-orange'
      },
      {
        id: 6,
        title: 'صيانة عامة',
        description: 'صيانة وإصلاحات دورية للحفاظ على ممتلكاتك في حالة ممتازة',
        icon: '🔨',
        color: 'service-red'
      }
    ],

    serviceOptions: {
      1: [
        { id: 'p1', name: 'إصلاح عاجل/معقد', price: 2000 },
        { id: 'p2', name: 'إصلاح تسريبات', price: 1200 },
        { id: 'p3', name: 'مشكلة عداد المياه', price: 800 },
        { id: 'p4', name: 'تركيب مواسير', price: 1500 },
        { id: 'p5', name: 'تنظيف مجاري', price: 1000 }
      ],
      2: [
        { id: 'e1', name: 'إصلاح قواطع الدائرة', price: 1500 },
        { id: 'e2', name: 'تركيب مآخذ', price: 600 },
        { id: 'e3', name: 'إصلاح تمديدات', price: 1200 },
        { id: 'e4', name: 'تركيب إضاءة', price: 800 },
        { id: 'e5', name: 'فحص كهربائي', price: 750 }
      ],
      3: [
        { id: 'c1', name: 'تنظيف عميق', price: 2500 },
        { id: 'c2', name: 'تنظيف دوري', price: 1000 },
        { id: 'c3', name: 'تنظيف سجاد', price: 1800 },
        { id: 'c4', name: 'تنظيف نوافذ', price: 600 },
        { id: 'c5', name: 'تنظيف ما بعد البناء', price: 3200 }
      ],
      4: [
        { id: 'l1', name: 'تصميم حدائق', price: 2500 },
        { id: 'l2', name: 'صيانة عشب', price: 600 },
        { id: 'l3', name: 'تقليم أشجار', price: 1500 },
        { id: 'l4', name: 'زراعة نباتات', price: 1000 },
        { id: 'l5', name: 'تصميم مناظر طبيعية صلبة', price: 3500 }
      ],
      5: [
        { id: 'pa1', name: 'دهانات داخلية', price: 3500 },
        { id: 'pa2', name: 'دهانات خارجية', price: 4500 },
        { id: 'pa3', name: 'جدار مميز', price: 1500 },
        { id: 'pa4', name: 'دهان خزائن', price: 2000 },
        { id: 'pa5', name: 'دهان إطارات', price: 800 }
      ],
      6: [
        { id: 'm1', name: 'صيانة عامة', price: 800 },
        { id: 'm2', name: 'خدمات تكييف', price: 1500 },
        { id: 'm3', name: 'تنظيف مزاريب', price: 1000 },
        { id: 'm4', name: 'فحص أسقف', price: 1500 },
        { id: 'm5', name: 'تفريغ وأحكام', price: 800 }
      ]
    }
  }
};