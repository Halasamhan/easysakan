// src/data/HomePageData.js
export const toArabicNum = (number) => {
  return String(number)
    .replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d])
    .replace(',', '،');
};

export const homeTranslations = {
  en: {
    // ... (Hero, How it works, Services remain the same)
    hero: {
      title: "Easy Search. Easy Move. Easy Living.",

      titleRow2: "Easy Living.",
      subtitle: "Your unified journey in real estate begins here",
      btn_primary: "Browse Properties",
      btn_secondary: "Our Services"
    },
    stats: [
      { rawNum: 1000, label: "Properties Listed" },
      { rawNum: 500,  label: "Happy Customers" },
      { rawNum: 50,   label: "Expert Agents" },
      { rawNum: "24/7",   label: "Support Available" } // Changed to String
    ],
    how_it_works: {
      title: "How It Works",
      subtitle: "Your journey to finding the perfect property in three simple steps",
      steps: [
        { id: 1, title: "Browse Properties", desc: "Explore our extensive collection of properties tailored to your needs" },
        { id: 2, title: "Schedule a Visit", desc: "Book a tour and experience your future home in person" },
        { id: 3, title: "Make It Yours", desc: "Complete the process with our expert guidance and support" }
      ]
    },
    services: {
      title: "Our Services",
      subtitle: "Comprehensive real estate solutions for every need",
      list: [
        { icon: "🏠🔑", title: "Buy & Rent Properties", desc: "Find your dream home for sale or discover apartments, villas, and studios available for rent", link_text: "Explore →", link: "/listings" },
        { icon: "🚚", title: "Transportation", desc: "Professional moving and transportation services for your convenience", link_text: "Explore →", link: "/transportation" },
        { icon: "🔧", title: "Services", desc: "Expert maintenance and repair services for your property", link_text: "Explore →", link: "/services" }
      ]
    },
    testimonials: {
      title: "What Our Clients Say",
      subtitle: "Real stories from satisfied customers",
      list: [
        { rating: "⭐⭐⭐⭐⭐", text: "Easy sakan made finding my dream home so simple! The team was professional and supportive throughout the entire process.", author: "Ahmed Salem", title: "Homeowner", initials: "AS" },
        { rating: "⭐⭐⭐⭐⭐", text: "Exceptional service! They helped me find the perfect rental apartment and even assisted with the moving process.", author: "Mona Khalil", title: "Tenant", initials: "MK" },
        { rating: "⭐⭐⭐⭐⭐", text: "From property search to maintenance services, Easy sakan is truly a one-stop solution for all real estate needs!", author: "Karim Mostafa", title: "Investor", initials: "KM" }
      ]
    },
    cta: {
      title: "Ready to Find Your Perfect Property?",
      subtitle: "Join thousands of satisfied customers who found their dream homes with us",
      btn_primary: "Get Started",
      btn_secondary: "Contact Us"
    }
  },
  ar: {
    hero: {
      title: "ابحث. انقل. اسكن.",
      subtitle: "رحلتك الموحدة في العقارات تبدأ من هنا",
      btn_primary: "تصفح العقارات",
      btn_secondary: "خدماتنا"
    },
    stats: [
      { rawNum: 1000, label: "عقار مدرج" },
      { rawNum: 500,  label: "عميل سعيد" },
      { rawNum: 50,   label: "وكيل خبير" },
      { rawNum: "24/7",   label: "دعم متاح" } // Changed to String (Will be converted to ٢٤/٧ by formatter)
    ],
    how_it_works: {
      title: "كيف نعمل",
      subtitle: "رحلتك للعثور على العقار المثالي في ثلاث خطوات بسيطة",
      steps: [
        { id: 1, title: "تصفح العقارات", desc: "استكشف مجموعتنا الواسعة من العقارات المصممة لتناسب احتياجاتك" },
        { id: 2, title: "حدد زيارة", desc: "احجز جولة وعش تجربة منزلك المستقبلي شخصيًا" },
        { id: 3, title: "اجعله ملكك", desc: "أكمل العملية بإرشاد ودعم من خبرائنا" }
      ]
    },
    services: {
      title: "خدماتنا",
      subtitle: "حلول عقارية شاملة لكل احتياجاتك",
      list: [
        { icon: "🏠🔑", title: "شراء وتأجير العقارات", desc: "ابحث عن منزل أحلامك للبيع أو اكتشف الشقق والفلل والاستوديوهات المتاحة للإيجار", link_text: "استكشف ←", link: "/listings" },
        { icon: "🚚", title: "خدمات النقل", desc: "خدمات نقل وتوصيل احترافية لراحتك", link_text: "استكشف ←", link: "/transportation" },
        { icon: "🔧", title: "الخدمات", desc: "خدمات صيانة وإصلاح احترافية لعقارك", link_text: "استكشف ←", link: "/services" }
      ]
    },
    testimonials: {
      title: "ماذا يقول عملاؤنا",
      subtitle: "قصص حقيقية من عملاء راضين",
      list: [
        { rating: "⭐⭐⭐⭐⭐", text: "جعل إيزي سكن العثور على منزل أحلامي أمرًا بسيطًا للغاية! كان الفريق محترفًا وداعمًا طوال العملية برمتها.", author: "أحمد سالم", title: "مالك منزل", initials: "أ س" },
        { rating: "⭐⭐⭐⭐⭐", text: "خدمة استثنائية! ساعدوني في العثور على شقة إيجار مثالية وساعدوني حتى في عملية النقل.", author: "منى خليل", title: "مستأجرة", initials: "م خ" },
        { rating: "⭐⭐⭐⭐⭐", text: "من البحث عن العقارات إلى خدمات الصيانة، إيزي سكن هو حقًا حل شامل لجميع احتياجات العقارات!", author: "كريم مصطفى", title: "مستثمر", initials: "ك م" }
      ]
    },
    cta: {
      title: "هل أنت مستعد للعثور على العقار المثالي؟",
      subtitle: "انضم إلى آلاف العملاء الراضين الذين وجدوا منازل أحلامهم معنا",
      btn_primary: "ابدأ الآن",
      btn_secondary: "اتصل بنا"
    }
  }
};