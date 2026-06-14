export const transportationTranslations = {
  en: {
    currency: "EGP",
    hero: {
      title: "Leave the Lifting to Us",
      subtitle: "Professional moving services for your furniture with utmost care and reliability",
      btn: "Book Your Move"
    },
    servicesSection: {
      title: "We provide top-quality furniture moving with professional care"
    },
    featuresList: [
      {
        icon: '🚚',
        title: 'Professional Moving',
        description: 'Our trained specialists carefully handle and transport your furniture with utmost care.'
      },
      {
        icon: '⏱️',
        title: 'Fast & Reliable',
        description: 'Quick delivery times and on-time service you can depend on every time.'
      },
      {
        icon: '💰',
        title: 'Transparent Pricing',
        description: 'No hidden fees - what you see is what you pay for your move.'
      }
    ],
    booking: {
      selectPackage: "Select Your Moving Package",
      selectPackageDesc: "Choose the package that best fits your moving needs",
      addServices: "Add Additional Services",
      addServicesDesc: "Optional add-ons to enhance your moving experience",
      moveDetails: "Move Details",
      distanceFeeLabel: "Distance fee",
      baseFeeLabel: "base",
      perKmLabel: "/km",
      dateLabel: "Move Date",
      timeLabel: "Move Time",
      timePlaceholder: "Choose a time",
      timeOptions: [
        { value: "08:00 AM - 10:00 AM", label: "08:00 AM - 10:00 AM" },
        { value: "10:00 AM - 12:00 PM", label: "10:00 AM - 12:00 PM" },
        { value: "12:00 PM - 02:00 PM", label: "12:00 PM - 02:00 PM" },
        { value: "02:00 PM - 04:00 PM", label: "02:00 PM - 04:00 PM" },
        { value: "04:00 PM - 06:00 PM", label: "04:00 PM - 06:00 PM" }
      ]
    },
    packages: [
      { id: 1, name: 'Small Pickup',  icon: '🚘', price: 500,  description: 'Light loads, boxes & small items' },
      { id: 2, name: 'Light Truck',   icon: '🚛', price: 1200, description: 'Medium loads, appliances & furniture' },
      { id: 3, name: 'Box Truck',     icon: '🚚', price: 2500, description: 'Full apartment or office moves' },
      { id: 4, name: 'Crane Truck',   icon: '🏗️', price: 5000, description: 'Heavy & oversized items, machinery' }
    ],
    additionalServices: {
      1: [
        { id: 'a1', name: 'Extra Helper',       price: 200 },
        { id: 'a2', name: 'Loading & Unloading', price: 300 },
        { id: 'a3', name: 'Packing Materials',  price: 150 }
      ],
      2: [
        { id: 'a1', name: 'Extra Helper',        price: 200 },
        { id: 'a2', name: 'Loading & Unloading', price: 400 },
        { id: 'a3', name: 'Packing Service',     price: 600 },
        { id: 'a4', name: 'Furniture Assembly',  price: 500 }
      ],
      3: [
        { id: 'a1', name: 'Extra Helper',        price: 200 },
        { id: 'a2', name: 'Loading & Unloading', price: 600 },
        { id: 'a3', name: 'Packing Service',     price: 1000 },
        { id: 'a4', name: 'Furniture Assembly',  price: 800 },
        { id: 'a5', name: 'Storage (1 Day)',     price: 500 }
      ],
      4: [
        { id: 'a1', name: 'Rigging Service',     price: 1500 },
        { id: 'a2', name: 'Extra Helper',        price: 200 },
        { id: 'a3', name: 'Loading & Unloading', price: 800 },
        { id: 'a4', name: 'Storage (1 Day)',     price: 800 }
      ]
    },
    summary: {
      title: "Move Summary",
      empty: "Select a package to see summary",
      total: "Total:",
      dateLabel: "Date:",
      timeLabel: "Time:",
      fromLabel: "From:",
      toLabel: "To:",
      btn: "Proceed to Payment",
      processing: "Processing..."
    },
    destinations: {
      title: "Popular Routes",
      subtitle: "We service Cairo's most popular neighborhoods",
      list: [
        { name: 'New Cairo', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80', orders: '2,400+ moves' },
        { name: 'Zamalek', image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80', orders: '1,800+ moves' },
        { name: 'Nasr City', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80', orders: '3,100+ moves' },
        { name: 'Heliopolis', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=600&q=80', orders: '2,600+ moves' }
      ]
    },
    map: {
      title: "Service Coverage Map",
      subtitle: "We cover all major areas across Cairo"
    },
    mapPicker: {
      pickupLabel: "Pickup Location",
      pickupPlaceholder: "Search your pickup address...",
      dropoffLabel: "Dropoff Location",
      dropoffPlaceholder: "Search your destination address...",
      hintPickup: "Pickup set — or click the map to reposition",
      hintDropoff: "Dropoff set — or click the map to reposition",
      calculating: "Calculating road distance…",
      kmLabel: "km",
      byRoad: "by road",
      minutesLabel: "min",
      drive: "drive",
      instruction1: "Click the map or search to set pickup, then dropoff",
      instruction2: "Now set your dropoff location"
    },
    errors: {
      loginRequired: "You must be logged in to book a move.",
      missingFields: "Please select a package, date, time, and both map locations.",
      genericError: "Failed to create order. Please try again.",
      networkError: "Network error. Please check your connection and try again."
    }
  },
  ar: {
    currency: "جنيه",
    hero: {
      title: "دعنا نتكفل بالشحن",
      subtitle: "خدمات نقل أثاث احترافية لعفشك بأقصى درجات العناية والموثوقية",
      btn: "احجز انتقالك"
    },
    servicesSection: {
      title: "نحن نقدم نقل أثاث عالي الجودة بعناية احترافية"
    },
    featuresList: [
      {
        icon: '🚚',
        title: 'نقل احترافي',
        description: 'يتولى خبراؤنا المدربون نقل أثاثك ونقله بأقصى قدر من العناية.'
      },
      {
        icon: '⏱️',
        title: 'سريع وموثوق',
        description: 'أوقات تسليم سريعة وخدمة في الوقت المحدد يمكنك الاعتماد عليها في كل مرة.'
      },
      {
        icon: '💰',
        title: 'تسعير شفاف',
        description: 'لا رسوم خفية - ما تراه هو ما تدفعه مقابل انتقالك.'
      }
    ],
    booking: {
      selectPackage: "اختر باقة النقل",
      selectPackageDesc: "اختر الباقة التي تناسب احتياجاتك في النقل",
      addServices: "أضف خدمات إضافية",
      addServicesDesc: "إضافات اختيارية لتعزيز تجربة النقل الخاصة بك",
      moveDetails: "تفاصيل الانتقال",
      distanceFeeLabel: "رسافة المسافة",
      baseFeeLabel: "أساسي",
      perKmLabel: "/كم",
      dateLabel: "تاريخ الانتقال",
      timeLabel: "وقت الانتقال",
      timePlaceholder: "اختر وقت",
      timeOptions: [
        { value: "٠٨:٠٠ ص - ١٠:٠٠ ص", label: "٠٨:٠٠ ص - ١٠:٠٠ ص" },
        { value: "١٠:٠٠ ص - ١٢:٠٠ م", label: "١٠:٠٠ ص - ١٢:٠٠ م" },
        { value: "١٢:٠٠ م - ٠٢:٠٠ م", label: "١٢:٠٠ م - ٠٢:٠٠ م" },
        { value: "٠٢:٠٠ م - ٠٤:٠٠ م", label: "٠٢:٠٠ م - ٠٤:٠٠ م" },
        { value: "٠٤:٠٠ م - ٠٦:٠٠ م", label: "٠٤:٠٠ م - ٠٦:٠٠ م" }
      ]
    },
    packages: [
      { id: 1, name: 'شاحنة صغيرة',  icon: '🛻', price: 500,  description: 'أحمال خفيفة، صناديق وأغراض صغيرة' },
      { id: 2, name: 'شاحنة خفيفة',   icon: '🚛', price: 1200, description: 'أحمال متوسطة، الأجهزة والأثاث' },
      { id: 3, name: 'شاحنة مغلقة',     icon: '🚚', price: 2500, description: 'نقل شقق كاملة أو مكاتب' },
      { id: 4, name: 'رافعة',   icon: '🏗️', price: 5000, description: 'أغراض ثقيلة ومواد فائقة الحجم، آلات' }
    ],
    additionalServices: {
      1: [
        { id: 'a1', name: 'مساعد إضافي',       price: 200 },
        { id: 'a2', name: 'تحميل وتنزيل', price: 300 },
        { id: 'a3', name: 'مواد التغليف',  price: 150 }
      ],
      2: [
        { id: 'a1', name: 'مساعد إضافي',        price: 200 },
        { id: 'a2', name: 'تحميل وتنزيل', price: 400 },
        { id: 'a3', name: 'خدمة التغليف',     price: 600 },
        { id: 'a4', name: 'تركيب الأثاث',  price: 500 }
      ],
      3: [
        { id: 'a1', name: 'مساعد إضافي',        price: 200 },
        { id: 'a2', name: 'تحميل وتنزيل', price: 600 },
        { id: 'a3', name: 'خدمة التغليف',     price: 1000 },
        { id: 'a4', name: 'تركيب الأثاث',  price: 800 },
        { id: 'a5', name: 'تخزين (يوم واحد)',     price: 500 }
      ],
      4: [
        { id: 'a1', name: 'خدمات الرفع الثقيل',     price: 1500 },
        { id: 'a2', name: 'مساعد إضافي',        price: 200 },
        { id: 'a3', name: 'تحميل وتنزيل', price: 800 },
        { id: 'a4', name: 'تخزين (يوم واحد)',     price: 800 }
      ]
    },
    summary: {
      title: "ملخص الانتقال",
      empty: "اختر باقة لرؤية الملخص",
      total: "المجموع:",
      dateLabel: "التاريخ:",
      timeLabel: "الوقت:",
      fromLabel: "من:",
      toLabel: "إلى:",
      btn: "المتابعة للدفع",
      processing: "جاري المعالجة..."
    },
    destinations: {
      title: "الطرق الشائعة",
      subtitle: "نخدم أحياء القاهرة الأكثر شعبية",
      list: [
        { name: 'القاهرة الجديدة', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80', orders: 'أكثر من ٢٤٠٠ انتقال' },
        { name: 'الزمالك', image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80', orders: 'أكثر من ١٨٠٠ انتقال' },
        { name: 'مدينة نصر', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80', orders: 'أكثر من ٣١٠٠ انتقال' },
        { name: 'مصر الجديدة', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=600&q=80', orders: 'أكثر من ٢٦٠٠ انتقال' }
      ]
    },
    map: {
      title: "خريطة التغطية",
      subtitle: "نغطي جميع المناطق الرئيسية في القاهرة"
    },
    mapPicker: {
      pickupLabel: "موقع الاستلام",
      pickupPlaceholder: "ابحث عن عنوان الاستلام...",
      dropoffLabel: "موقع التسليم",
      dropoffPlaceholder: "ابحث عن عنوان الوصول...",
      hintPickup: "تم تحديد الاستلام — أو انقر على الخريطة لإعادة التموضع",
      hintDropoff: "تم تحديد التسليم — أو انقر على الخريطة لإعادة التموضع",
      calculating: "جاري حساب مسافة الطريق…",
      kmLabel: "كم",
      byRoad: "بالطريق",
      minutesLabel: "دقيقة",
      drive: "قيادة",
      instruction1: "انقر على الخريطة أو ابحث لتعيين الاستلام، ثم التسليم",
      instruction2: "الآن حدد موقع التسليم"
    },
    errors: {
      loginRequired: "يجب عليك تسجيل الدخول لحجز انتقال.",
      missingFields: "الرجاء اختيار باقة، وتاريخ، ووقت، وموقعي الخريطة.",
      genericError: "فشل إنشاء الطلب. يرجى المحاولة مرة أخرى.",
      networkError: "خطأ في الشبكة. يرجى التحقق من الاتصال والمحاولة مرة أخرى."
    }
  }
};