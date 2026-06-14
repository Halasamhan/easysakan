// src/data/help.js

export const toArabicNum = (str) => {
  if (typeof str !== 'string') str = str.toString();
  const id = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
  return str.replace(/[0-9]/g, w => id[w]);
};

export const helpTranslations = {
  en: {
    // UI Strings
    hero_title: "How can we help you?",
    quick_categories: "Quick Categories", // Key must be here
    search_placeholder: "Search 20+ articles...",
    search_btn: "Search",
    results_title: "Help Articles",
    results_count: (count) => `${count} results found`,
    no_results: "No articles found matching your criteria.",
    clear_filters: "Clear Filters",
    cat_all: "All Topics",
    cat_apartments: "Apartments & Renting",
    cat_services: "Home Services",
    cat_transport: "Transport",
    cat_account: "Payments & Account",
    contact_title: "Still need help?",
    contact_desc: "Our support team is available 24/7.",
    contact_btn: "Contact Support",
    // Articles
    articles: [
      {
        id: 1,
        category: 'Apartments',
        categoryName: { en: 'Apartments', ar: 'شقق وإيجار' }, // Added localized name
        title: { en: 'How do I search for an apartment?', ar: 'كيف أبحث عن شقة؟' },
        summary: { en: 'Using filters for price, location, and amenities.', ar: 'استخدام الفلاتر للسعر، الموقع، والمرافق.' },
        answer: { en: 'Navigate to Listings page. On left sidebar, you will find filters for Price Range, Number of Bedrooms, and Neighborhood. Use map view to see exact locations.', ar: 'انتقل إلى صفحة العقارات. في القائمة الجانبية، ستجد فلاتر لنطاق السعر، عدد غرف النوم، والحي. استخدم العرض الخريطي لرؤية المواقع بدقة.' }
      },
      {
        id: 2,
        category: 'Apartments',
        categoryName: { en: 'Apartments', ar: 'شقق وإيجار' },
        title: { en: 'Is security deposit refundable?', ar: 'هل الوديعة مستردة؟' },
        summary: { en: 'Understanding terms for getting your deposit back.', ar: 'فهم شروط استرداد الوديعة.' },
        answer: { en: 'Yes, deposits are fully refundable within 30 days of moving out, provided apartment is clean and undamaged. Deductions are made only for necessary repairs or cleaning.', ar: 'نعم، الوديعة مستردة بالكامل خلال 30 يوم من الانتقال، بشرط أن تكون الشقة نظيفة وغير تالفة. يتم عمل خصومات فقط للإصلاحات الضرورية أو التنظيف.' }
      },
      {
        id: 3,
        category: 'Apartments',
        categoryName: { en: 'Apartments', ar: 'شقق وإيجار' },
        title: { en: 'Can I have pets in apartment?', ar: 'هل يمكنني تربية حيوانات أليفة في الشقة؟' },
        summary: { en: 'Pet policy and restrictions for rentals.', ar: 'سياسة الحيوانات الأليفة والقواعد للإيجار.' },
        answer: { en: 'Pet policies vary by landlord. Filter listings by "Pet Friendly" or check specific "Rules" tab on apartment detail page. Additional fees may apply.', ar: 'تختلف سياسة الحيوانات الأليفة حسب المالك. قم بتصفية العقارات بـ "مسموح بالحيوانات الأليفة" أو تحقق من تبويب "القواعد" في صفحة تفاصيل الشقة. قد يتم تطبيق رسوم إضافية.' }
      },
      {
        id: 4,
        category: 'Apartments',
        categoryName: { en: 'Apartments', ar: 'شقق وإيجار' },
        title: { en: 'How do I pay my rent?', ar: 'كيف أدفع الإيجار؟' },
        summary: { en: 'Online payment methods and scheduling.', ar: 'طرق الدفع الإلكتروني وجدولة المدفوعات.' },
        answer: { en: 'Rent can be paid via "My Account" section using Credit Card, Bank Transfer, or Apple Pay. You can also set up automatic monthly payments to avoid late fees.', ar: 'يمكن دفع الإيجار عبر قسم "حسابي" باستخدام بطاقة ائتمان، التحويل البنكي، أو آبل باي. يمكنك أيضًا إعداد مدفوعات شهرية تلقائية لتجنب رسوم التأخير.' }
      },
      {
        id: 5,
        category: 'Apartments',
        categoryName: { en: 'Apartments', ar: 'شقق وإيجار' },
        title: { en: 'What if I need to break my lease early?', ar: 'ماذا احتجت لإنهاء عقد الإيجار مبكرًا؟' },
        summary: { en: 'Early termination policies and penalties.', ar: 'سياسات الإنهاء المبكر والعقوبات.' },
        answer: { en: 'Early termination usually requires a 60-day notice and a penalty fee equivalent to one month\'s rent. Please contact our support team to review your specific contract terms.', ar: 'يتطلب الإنهاء المبكر عادة إشعارًا لمدة 60 يومً ورسوم غرامة تعادل شهر إيجار. يرجى التواصل مع فريق الدعم لدينا لمراجعة شروط العقد الخاصة بك.' }
      },
      {
        id: 6,
        category: 'Apartments',
        categoryName: { en: 'Apartments', ar: 'شقق وإيجار' },
        title: { en: 'Are utilities included in rent?', ar: 'هل المرافق مشمولة في الإيجار؟' },
        summary: { en: 'Details on water, electricity, and internet.', ar: 'تفاصيل المياه، الكهرباء، والإنترنت.' },
        answer: { en: 'This depends on the specific listing. Most "All-Inclusive" apartments cover water and electricity. Others require you to set up your own accounts. Check Amenities list.', ar: 'هذا يعتم على العقار المحدد. تشمل معظم الشقق "شاملة المرافق" المياه والكهرباء. يطلب البعض الآخرين إنشاء حساباتهم الخاصة. تحقق من قائمة المرافق.' }
      },
      {
        id: 7,
        category: 'Transport',
        categoryName: { en: 'Transport', ar: 'النقل' },
        title: { en: 'What happens if my moving truck is late?', ar: 'ماذا يحدث إذا تأخرت شاحنة النقل؟' },
        summary: { en: 'Compensation and updates for delays.', ar: 'التعويض والتحديثات للتأخير.' },
        answer: { en: 'If truck is more than 30 minutes late, you will receive an SMS. Delays over 2 hours qualify for a 10% refund or a discount voucher for future moves.', ar: 'إذا تأخرت الشاحنة أكثر من 30 دقيقة، ستصلك رسالة نصية. التأخيرات التي تزيد عن ساعتين مؤهلة لاسترداد 10% أو قسيمة خصم للحركات المستقبلية.' }
      },
      {
        id: 8,
        category: 'Transport',
        categoryName: { en: 'Transport', ar: 'النقل' },
        title: { en: 'How do I choose the right truck size?', ar: 'كيف أختار حجم الشاحنة المناسب؟' },
        summary: { en: 'Guide to truck sizes: Studio vs. 3-Bedroom.', ar: 'دليل أحجام الشاحنات: استوديو مقابل 3 غرف نوم.' },
        answer: { en: 'Use our Truck Calculator. Generally: Studio = 10ft truck, 1-2 Bedrooms = 15ft truck, 3+ Bedrooms = 20ft+ truck. Our team can also assist via chat.', ar: 'استخدم حاسبة الشاحنات الخاصة بنا. بشكل عام: استوديو = شاحنة 10 قدم، 1-2 غرفة نوم = شاحنة 15 قدم، 3+ غرف نوم = شاحنة 20 قدم+. يمكن لفريقنا المساعدة أيضًا عبر الدردشة.' }
      },
      {
        id: 9,
        category: 'Transport',
        categoryName: { en: 'Transport', ar: 'النقل' },
        title: { en: 'Is my furniture insured during move?', ar: 'هل أثاثي مؤمن أثناء النقل؟' },
        summary: { en: 'Liability coverage and premium insurance options.', ar: 'تغطية المسؤولية وخيارات التأمين المتازة.' },
        answer: { en: 'Basic liability coverage is included (covers $0.60 per pound). We highly recommend purchasing Full Value Protection for expensive items like electronics or art.', ar: 'تشمل تغطية المسؤولية الأساسية (تغطي 0.60 جنيه إسترليني للرطل). نوصي بشدة بشراء الحماية الكاملة للعناصر باهواتة مثل الإلكترونيات أو اللوحات الفنية.' }
      },
      {
        id: 10,
        category: 'Transport',
        categoryName: { en: 'Transport', ar: 'النقل' },
        title: { en: 'Can I track my shipment in real-time?', ar: 'هل يمكنني تتبع شحنتي في الوقت الفعلي؟' },
        summary: { en: 'Using GPS tracker for your move.', ar: 'استخدام متتبع GPS لحركتك.' },
        answer: { en: 'Yes! On day of move, go to "My Bookings" and click "Track Driver". You will see the truck\'s live location on a map.', ar: 'نعم! في يوم النقل، انتقل إلى "حجزوزاتي" وانقر على "تتبع السائق". سترى الموقع الفعلي للشاحنة على الخريطة.' }
      },
      {
        id: 11,
        category: 'Transport',
        categoryName: { en: 'Transport', ar: 'النقل' },
        title: { en: 'Do you provide packing materials?', ar: 'هل توفرن مواد التغليف؟' },
        summary: { en: 'Boxes, tape, and bubble wrap availability.', ar: 'توفير الصناديون والشريط والغلاف البلاستيكي.' },
        answer: { en: 'We sell moving kits (boxes, tape, bubble wrap) that can be delivered to your home 2 days before move. You can add this during checkout.', ar: 'نحن نبيع مجموعات نقل (صناديون، شريط، غلاف بلاستيكي) يمكن تسليمها إلى منزلك قبل يومين من النقل. يمكنك إضافتها أثناء الدفع.' }
      },
      {
        id: 12,
        category: 'Services',
        categoryName: { en: 'Services', ar: 'خدمات المنزل' },
        title: { en: 'Can I book a cleaning service after moving?', ar: 'هل يمكنني حجز خدمة تنظيف بعد النقل؟' },
        summary: { en: 'Move-in deep cleaning details.', ar: 'تفاصيل التنظيف العميق عند الاستلام.' },
        answer: { en: 'Absolutely. Select "Move-In Clean" in Services tab. This includes deep cleaning of floors, windows, and bathrooms to ensure your new home is spotless.', ar: 'بالتأكيد. اختر "التنظيف عند الاستلام" في تبويب الخدمات. يشمل ذلك التنظيف العميق للأرضيات والنوافذ والحمامات لضمان أن منزلك الجديد خالٍ تمامً من البقع.' }
      },
      {
        id: 13,
        category: 'Services',
        categoryName: { en: 'Services', ar: 'خدمات المنزل' },
        title: { en: 'How do I request painting services?', ar: 'كيف أطلب خدمات الدهان؟' },
        summary: { en: 'Color selection and booking process.', ar: 'اختيار الألوان وعملية الحجز.' },
        answer: { en: 'Choose "Painting" from Services. You can pick standard colors from our palette or enter a custom HEX code. We provide paint and tools.', ar: 'اختر "الدهان" من الخدمات. يمكنك اختيار الألوان القياسية من لوحتنا أو إدخال كود HEX مخصص. نحن نقدم الدهان والأدوات.' }
      },
      {
        id: 14,
        category: 'Services',
        categoryName: { en: 'Services', ar: 'خدمات المنزل' },
        title: { en: 'Do I need to be home during service?', ar: 'هل يجب أن أكون في المنزل أثناء الخدمة؟' },
        summary: { en: 'Access requirements for technicians.', ar: 'متطلبات الوصول للفنيين.' },
        answer: { en: 'For first-time services, yes, we recommend being there to show technician around. For recurring cleaning services, you can provide a key access code.', ar: 'لخدمات أول مرة، نعم، نوصي بأن تكون هناك لإرشاد الفني. لخدمات التنظيف المتكررة، يمكنك توفير رمز دخول.' }
      },
      {
        id: 15,
        category: 'Services',
        categoryName: { en: 'Services', ar: 'خدمات المنزل' },
        title: { en: 'What is included in AC Maintenance?', ar: 'ماذا يشمله صيانة المكيفات؟' },
        summary: { en: 'Filter cleaning and gas refilling.', ar: 'تنظيف الفلات وملء الغاز.' },
        answer: { en: 'Our AC service includes filter cleaning, gas top-up (Freon), and outdoor unit washing. If parts need replacement, technician will advise you before proceeding.', ar: 'تشمل خدمتنا للمكيفات تنظيف الفلات وتعبئة الغاز (فريون)، وغسل الوحدة الخارجية. إذا كانت الأجزاء بحاجة لاستبدال، سينصحك الفني قبل المتابعة.' }
      },
      {
        id: 16,
        category: 'Services',
        categoryName: { en: 'Services', ar: 'خدمات المنزل' },
        title: { en: 'How to reschedule a service appointment?', ar: 'كيف أقوم بإعادة جدولة موعد الخدمة؟' },
        summary: { en: 'Changing time or date.', ar: 'تغيير الوقت أو التاريخ.' },
        answer: { en: 'Go to "My Bookings", find service, and click "Reschedule". Changes are free up to 24 hours before appointment.', ar: 'انتقل إلى "حجزوزاتي"، وابحث عن الخدمة، وانقر على "إعادة الجدولة". التغييرات مجانية حتى 24 ساعة قبل الموعد.' }
      },
      {
        id: 17,
        category: 'Services',
        categoryName: { en: 'Services', ar: 'خدمات المنزل' },
        title: { en: 'Are your technicians vetted?', ar: 'هل فنيكتمت فحصهم؟' },
        summary: { en: 'Background checks and training.', ar: 'فحص الخلفية والتدريب.' },
        answer: { en: 'Yes, all Easy Sakan partners undergo a strict background check, ID verification, and practical skill assessment before joining platform.', ar: 'نعم، يخضع جميع شركاء إيزي سكن لفحص خلفية صارمة، والتحقق من الهوية، وتقييم المهارات العملية قبل الانضمام إلى المنصة.' }
      },
      {
        id: 18,
        category: 'Account',
        categoryName: { en: 'Account', ar: 'الدفع والحساب' },
        title: { en: 'How do I reset my password?', ar: 'كيف أقوم بإعادة تعيين كلمة المرور؟' },
        summary: { en: 'Recovering access to your account.', ar: 'استعادة الوصول إلى حسابك.' },
        answer: { en: 'Click "Login" and select "Forgot Password". Enter your email address, and we will send a reset link within 5 minutes.', ar: 'انقر على "تسجيل الدخول" واختر "نسيت كلمة المرور". أدخل عنوان بريدك الإلكتروني، وسنرسل لك رابط إعادة التعيين خلال 5 دقائق.' }
      },
      {
        id: 19,
        category: 'Account',
        categoryName: { en: 'Account', ar: 'الدفع والحساب' },
        title: { en: 'How to update my payment method?', ar: 'كيف أقوم بتحديث طريقة الدفع؟' },
        summary: { en: 'Changing credit card or bank details.', ar: 'تغيير تفاصيل بطاقة الائتمان أو البنك.' },
        answer: { en: 'Go to Profile > Billing Settings. Click "Add Method" to enter a new card. You can swipe it to set it as your primary payment method.', ar: 'انتقل إلى الملف الشخصي > إعدادات الفوترة. انقر على "إضافة طريقة" لإدخال بطاقة جديدة. يمكنك تمريرها لتعيينها كطريقة الدفع الأساسية.' }
      },
      {
        id: 20,
        category: 'Account',
        categoryName: { en: 'Account', ar: 'الدفع والحساب' },
        title: { en: 'Where can I see my invoices?', ar: 'أين يمكنني رؤية فواتيري؟' },
        summary: { en: 'Downloading past receipts.', ar: 'تنزيل الإيصالات السابقة.' },
        answer: { en: 'All invoices are stored in Profile > Billing History. You can download them as PDF for tax or reimbursement purposes.', ar: 'توجد جميع الفواتير في الملف الشخصي > سجل الفوترة. يمكنك تنزيلها بصيغة PDF لأغراض الضرائب أو التعويض.' }
      },
      {
        id: 21,
        category: 'Account',
        categoryName: { en: 'Account', ar: 'الدفع والحساب' },
        title: { en: 'How to delete my account?', ar: 'كيف أحذف حسابي؟' },
        summary: { en: 'Permanent removal of data.', ar: 'إزالة البيانات بشكل دائم.' },
        answer: { en: 'Go to Profile > Privacy > Delete Account. Please note this action is irreversible and all your booking history will be lost.', ar: 'انتقل إلى الملف الشخصي > الخصوصية > حذف الحساب. يرجى ملاحظة أن هذا الإجراء لا رجعة فيه وسيتم فقدان جميع سجلات الحجز الخاصة بك.' }
      },
      {
        id: 22,
        category: 'Account',
        categoryName: { en: 'Account', ar: 'الدفع والحساب' },
        title: { en: 'How do I change my notification settings?', ar: 'كيف أقوم بتغيير إعدادات الإشعارات؟' },
        summary: { en: 'SMS and Email preferences.', ar: 'تفضيلات الرسائل القصيرة والبريد الإلكتروني.' },
        answer: { en: 'In Profile > Notifications, you can toggle SMS updates, promotional emails, and booking reminders on or off.', ar: 'في الملف الشخصي > الإشعارات، يمكنك تبديل تحديثات الرسائل القصيرة، والرسائل الترويجية، وتذكيرات الحجز تشغيلًا أو إيقافًا.' }
      }
    ]
  },
 ar: {
    // UI Strings
    hero_title: "كيف يمكننا مساعدتك؟",
    quick_categories: "تصنيفات سريعة", // Key must be here
    search_placeholder: "ابحث في أكثر من ۲۰+ مقالة...", // 20 -> ۲۰
    search_btn: "بحث",
    results_title: "مقالات المساعدة",
    results_count: (count) => `${count} نتيجة وجدت`,
    no_results: "لم يتم العثور على مقالات تطابق معاييرك.",
    clear_filters: "مسح الفلاتر",
    cat_all: "كل المواضيع",
    cat_apartments: "شقق وإيجار",
    cat_services: "خدمات المنزل",
    cat_transport: "النقل",
    cat_account: "الدفع والحساب",
    contact_title: "هل تحتاج مساعدة؟",
    contact_desc: "فريق الدعم متاح ۲۴/٧.", // 24/7 -> ۲۴/٧
    contact_btn: "اتصل بالدعم",

    // Articles (Structure aligned with English, Categories use English keys)
    articles: [
      {
        id: 1,
        category: 'Apartments',
        categoryName: { en: 'Apartments', ar: 'شقق وإيجار' },
        title: { en: 'How do I search for an apartment?', ar: 'كيف أبحث عن شقة؟' },
        summary: { en: 'Using filters for price, location, and amenities.', ar: 'استخدام الفلاتر للسعر، الموقع، والمرافق.' },
        answer: { en: 'Navigate to Listings page. On left sidebar, you will find filters for Price Range, Number of Bedrooms, and Neighborhood. Use map view to see exact locations.', ar: 'انتقل إلى صفحة العقارات. في القائمة الجانبية، ستجد فلاتر لنطاق السعر، عدد غرف النوم، والحي. استخدم العرض الخريطي لرؤية المواقع بدقة.' }
      },
      {
        id: 2,
        category: 'Apartments',
        categoryName: { en: 'Apartments', ar: 'شقق وإيجار' },
        title: { en: 'Is security deposit refundable?', ar: 'هل الوديعة مستردة؟' },
        summary: { en: 'Understanding terms for getting your deposit back.', ar: 'فهم شروط استرداد الوديعة.' },
        answer: { en: 'Yes, deposits are fully refundable within 30 days of moving out, provided apartment is clean and undamaged. Deductions are made only for necessary repairs or cleaning.', ar: 'نعم، الوديعة مستردة بالكامل خلال 30 يوم من الانتقال، بشرط أن تكون الشقة نظيفة وغير تالفة. يتم عمل خصومات فقط للإصلاحات الضرورية أو التنظيف.' }
      },
      {
        id: 3,
        category: 'Apartments',
        categoryName: { en: 'Apartments', ar: 'شقق وإيجار' },
        title: { en: 'Can I have pets in apartment?', ar: 'هل يمكنني تربية حيوانات أليفة في الشقة؟' },
        summary: { en: 'Pet policy and restrictions for rentals.', ar: 'سياسة الحيوانات الأليفة والقواعد للإيجار.' },
        answer: { en: 'Pet policies vary by landlord. Filter listings by "Pet Friendly" or check specific "Rules" tab on apartment detail page. Additional fees may apply.', ar: 'تختلف سياسة الحيوانات الأليفة حسب المالك. قم بتصفية العقارات بـ "مسموح بالحيوانات الأليفة" أو تحقق من تبويب "القواعد" في صفحة تفاصيل الشقة. قد يتم تطبيق رسوم إضافية.' }
      },
      {
        id: 4,
        category: 'Apartments',
        categoryName: { en: 'Apartments', ar: 'شقق وإيجار' },
        title: { en: 'How do I pay my rent?', ar: 'كيف أدفع الإيجار؟' },
        summary: { en: 'Online payment methods and scheduling.', ar: 'طرق الدفع الإلكتروني وجدولة المدفوعات.' },
        answer: { en: 'Rent can be paid via "My Account" section using Credit Card, Bank Transfer, or Apple Pay. You can also set up automatic monthly payments to avoid late fees.', ar: 'يمكن دفع الإيجار عبر قسم "حسابي" باستخدام بطاقة ائتمان، التحويل البنكي، أو آبل باي. يمكنك أيضًا إعداد مدفوعات شهرية تلقائية لتجنب رسوم التأخير.' }
      },
      {
        id: 5,
        category: 'Apartments',
        categoryName: { en: 'Apartments', ar: 'شقق وإيجار' },
        title: { en: 'What if I need to break my lease early?', ar: 'ماذا احتجت لإنهاء عقد الإيجار مبكرًا؟' },
        summary: { en: 'Early termination policies and penalties.', ar: 'سياسات الإنهاء المبكر والعقوبات.' },
        answer: { en: 'Early termination usually requires a 60-day notice and a penalty fee equivalent to one month\'s rent. Please contact our support team to review your specific contract terms.', ar: 'يتطلب الإنهاء المبكر عادة إشعارًا لمدة 60 يومً ورسوم غرامة تعادل شهر إيجار. يرجى التواصل مع فريق الدعم لدينا لمراجعة شروط العقد الخاصة بك.' }
      },
      {
        id: 6,
        category: 'Apartments',
        categoryName: { en: 'Apartments', ar: 'شقق وإيجار' },
        title: { en: 'Are utilities included in rent?', ar: 'هل المرافق مشمولة في الإيجار؟' },
        summary: { en: 'Details on water, electricity, and internet.', ar: 'تفاصيل المياه، الكهرباء، والإنترنت.' },
        answer: { en: 'This depends on the specific listing. Most "All-Inclusive" apartments cover water and electricity. Others require you to set up your own accounts. Check Amenities list.', ar: 'هذا يعتم على العقار المحدد. تشمل معظم الشقق "شاملة المرافق" المياه والكهرباء. يطلب البعض الآخرين إنشاء حساباتهم الخاصة. تحقق من قائمة المرافق.' }
      },
      {
        id: 7,
        category: 'Transport',
        categoryName: { en: 'Transport', ar: 'النقل' },
        title: { en: 'What happens if my moving truck is late?', ar: 'ماذا يحدث إذا تأخرت شاحنة النقل؟' },
        summary: { en: 'Compensation and updates for delays.', ar: 'التعويض والتحديثات للتأخير.' },
        answer: { en: 'If truck is more than 30 minutes late, you will receive an SMS. Delays over 2 hours qualify for a 10% refund or a discount voucher for future moves.', ar: 'إذا تأخرت الشاحنة أكثر من 30 دقيقة، ستصلك رسالة نصية. التأخيرات التي تزيد عن ساعتين مؤهلة لاسترداد 10% أو قسيمة خصم للحركات المستقبلية.' }
      },
      {
        id: 8,
        category: 'Transport',
        categoryName: { en: 'Transport', ar: 'النقل' },
        title: { en: 'How do I choose the right truck size?', ar: 'كيف أختار حجم الشاحنة المناسب؟' },
        summary: { en: 'Guide to truck sizes: Studio vs. 3-Bedroom.', ar: 'دليل أحجام الشاحنات: استوديو مقابل 3 غرف نوم.' },
        answer: { en: 'Use our Truck Calculator. Generally: Studio = 10ft truck, 1-2 Bedrooms = 15ft truck, 3+ Bedrooms = 20ft+ truck. Our team can also assist via chat.', ar: 'استخدم حاسبة الشاحنات الخاصة بنا. بشكل عام: استوديو = شاحنة 10 قدم، 1-2 غرفة نوم = شاحنة 15 قدم، 3+ غرف نوم = شاحنة 20 قدم+. يمكن لفريقنا المساعدة أيضًا عبر الدردشة.' }
      },
      {
        id: 9,
        category: 'Transport',
        categoryName: { en: 'Transport', ar: 'النقل' },
        title: { en: 'Is my furniture insured during move?', ar: 'هل أثاثي مؤمن أثناء النقل؟' },
        summary: { en: 'Liability coverage and premium insurance options.', ar: 'تغطية المسؤولية وخيارات التأمين المتازة.' },
        answer: { en: 'Basic liability coverage is included (covers $0.60 per pound). We highly recommend purchasing Full Value Protection for expensive items like electronics or art.', ar: 'تشمل تغطية المسؤولية الأساسية (تغطي 0.60 جنيه إسترليني للرطل). نوصي بشدة بشراء الحماية الكاملة للعناصر باهواتة مثل الإلكترونيات أو اللوحات الفنية.' }
      },
      {
        id: 10,
        category: 'Transport',
        categoryName: { en: 'Transport', ar: 'النقل' },
        title: { en: 'Can I track my shipment in real-time?', ar: 'هل يمكنني تتبع شحنتي في الوقت الفعلي؟' },
        summary: { en: 'Using GPS tracker for your move.', ar: 'استخدام متتبع GPS لحركتك.' },
        answer: { en: 'Yes! On day of move, go to "My Bookings" and click "Track Driver". You will see the truck\'s live location on a map.', ar: 'نعم! في يوم النقل، انتقل إلى "حجزوزاتي" وانقر على "تتبع السائق". سترى الموقع الفعلي للشاحنة على الخريطة.' }
      },
      {
        id: 11,
        category: 'Transport',
        categoryName: { en: 'Transport', ar: 'النقل' },
        title: { en: 'Do you provide packing materials?', ar: 'هل توفرن مواد التغليف؟' },
        summary: { en: 'Boxes, tape, and bubble wrap availability.', ar: 'توفير الصناديون والشريط والغلاف البلاستيكي.' },
        answer: { en: 'We sell moving kits (boxes, tape, bubble wrap) that can be delivered to your home 2 days before move. You can add this during checkout.', ar: 'نحن نبيع مجموعات نقل (صناديون، شريط، غلاف بلاستيكي) يمكن تسليمها إلى منزلك قبل يومين من النقل. يمكنك إضافتها أثناء الدفع.' }
      },
      {
        id: 12,
        category: 'Services',
        categoryName: { en: 'Services', ar: 'خدمات المنزل' },
        title: { en: 'Can I book a cleaning service after moving?', ar: 'هل يمكنني حجز خدمة تنظيف بعد النقل؟' },
        summary: { en: 'Move-in deep cleaning details.', ar: 'تفاصيل التنظيف العميق عند الاستلام.' },
        answer: { en: 'Absolutely. Select "Move-In Clean" in Services tab. This includes deep cleaning of floors, windows, and bathrooms to ensure your new home is spotless.', ar: 'بالتأكيد. اختر "التنظيف عند الاستلام" في تبويب الخدمات. يشمل ذلك التنظيف العميق للأرضيات والنوافذ والحمامات لضمان أن منزلك الجديد خالٍ تمامً من البقع.' }
      },
      {
        id: 13,
        category: 'Services',
        categoryName: { en: 'Services', ar: 'خدمات المنزل' },
        title: { en: 'How do I request painting services?', ar: 'كيف أطلب خدمات الدهان؟' },
        summary: { en: 'Color selection and booking process.', ar: 'اختيار الألوان وعملية الحجز.' },
        answer: { en: 'Choose "Painting" from Services. You can pick standard colors from our palette or enter a custom HEX code. We provide paint and tools.', ar: 'اختر "الدهان" من الخدمات. يمكنك اختيار الألوان القياسية من لوحتنا أو إدخال كود HEX مخصص. نحن نقدم الدهان والأدوات.' }
      },
      {
        id: 14,
        category: 'Services',
        categoryName: { en: 'Services', ar: 'خدمات المنزل' },
        title: { en: 'Do I need to be home during service?', ar: 'هل يجب أن أكون في المنزل أثناء الخدمة؟' },
        summary: { en: 'Access requirements for technicians.', ar: 'متطلبات الوصول للفنيين.' },
        answer: { en: 'For first-time services, yes, we recommend being there to show technician around. For recurring cleaning services, you can provide a key access code.', ar: 'لخدمات أول مرة، نعم، نوصي بأن تكون هناك لإرشاد الفني. لخدمات التنظيف المتكررة، يمكنك توفير رمز دخول.' }
      },
      {
        id: 15,
        category: 'Services',
        categoryName: { en: 'Services', ar: 'خدمات المنزل' },
        title: { en: 'What is included in AC Maintenance?', ar: 'ماذا يشمله صيانة المكيفات؟' },
        summary: { en: 'Filter cleaning and gas refilling.', ar: 'تنظيف الفلات وملء الغاز.' },
        answer: { en: 'Our AC service includes filter cleaning, gas top-up (Freon), and outdoor unit washing. If parts need replacement, technician will advise you before proceeding.', ar: 'تشمل خدمتنا للمكيفات تنظيف الفلات وتعبئة الغاز (فريون)، وغسل الوحدة الخارجية. إذا كانت الأجزاء بحاجة لاستبدال، سينصحك الفني قبل المتابعة.' }
      },
      {
        id: 16,
        category: 'Services',
        categoryName: { en: 'Services', ar: 'خدمات المنزل' },
        title: { en: 'How to reschedule a service appointment?', ar: 'كيف أقوم بإعادة جدولة موعد الخدمة؟' },
        summary: { en: 'Changing time or date.', ar: 'تغيير الوقت أو التاريخ.' },
        answer: { en: 'Go to "My Bookings", find service, and click "Reschedule". Changes are free up to 24 hours before appointment.', ar: 'انتقل إلى "حجزوزاتي"، وابحث عن الخدمة، وانقر على "إعادة الجدولة". التغييرات مجانية حتى 24 ساعة قبل الموعد.' }
      },
      {
        id: 17,
        category: 'Services',
        categoryName: { en: 'Services', ar: 'خدمات المنزل' },
        title: { en: 'Are your technicians vetted?', ar: 'هل فنيكتمت فحصهم؟' },
        summary: { en: 'Background checks and training.', ar: 'فحص الخلفية والتدريب.' },
        answer: { en: 'Yes, all Easy Sakan partners undergo a strict background check, ID verification, and practical skill assessment before joining platform.', ar: 'نعم، يخضع جميع شركاء إيزي سكن لفحص خلفية صارمة، والتحقق من الهوية، وتقييم المهارات العملية قبل الانضمام إلى المنصة.' }
      },
      {
        id: 18,
        category: 'Account',
        categoryName: { en: 'Account', ar: 'الدفع والحساب' },
        title: { en: 'How do I reset my password?', ar: 'كيف أقوم بإعادة تعيين كلمة المرور؟' },
        summary: { en: 'Recovering access to your account.', ar: 'استعادة الوصول إلى حسابك.' },
        answer: { en: 'Click "Login" and select "Forgot Password". Enter your email address, and we will send a reset link within 5 minutes.', ar: 'انقر على "تسجيل الدخول" واختر "نسيت كلمة المرور". أدخل عنوان بريدك الإلكتروني، وسنرسل لك رابط إعادة التعيين خلال 5 دقائق.' }
      },
      {
        id: 19,
        category: 'Account',
        categoryName: { en: 'Account', ar: 'الدفع والحساب' },
        title: { en: 'How to update my payment method?', ar: 'كيف أقوم بتحديث طريقة الدفع؟' },
        summary: { en: 'Changing credit card or bank details.', ar: 'تغيير تفاصيل بطاقة الائتمان أو البنك.' },
        answer: { en: 'Go to Profile > Billing Settings. Click "Add Method" to enter a new card. You can swipe it to set it as your primary payment method.', ar: 'انتقل إلى الملف الشخصي > إعدادات الفوترة. انقر على "إضافة طريقة" لإدخال بطاقة جديدة. يمكنك تمريرها لتعيينها كطريقة الدفع الأساسية.' }
      },
      {
        id: 20,
        category: 'Account',
        categoryName: { en: 'Account', ar: 'الدفع والحساب' },
        title: { en: 'Where can I see my invoices?', ar: 'أين يمكنني رؤية فواتيري؟' },
        summary: { en: 'Downloading past receipts.', ar: 'تنزيل الإيصالات السابقة.' },
        answer: { en: 'All invoices are stored in Profile > Billing History. You can download them as PDF for tax or reimbursement purposes.', ar: 'توجد جميع الفواتير في الملف الشخصي > سجل الفوترة. يمكنك تنزيلها بصيغة PDF لأغراض الضرائب أو التعويض.' }
      },
      {
        id: 21,
        category: 'Account',
        categoryName: { en: 'Account', ar: 'الدفع والحساب' },
        title: { en: 'How to delete my account?', ar: 'كيف أحذف حسابي؟' },
        summary: { en: 'Permanent removal of data.', ar: 'إزالة البيانات بشكل دائم.' },
        answer: { en: 'Go to Profile > Privacy > Delete Account. Please note this action is irreversible and all your booking history will be lost.', ar: 'انتقل إلى الملف الشخصي > الخصوصية > حذف الحساب. يرجى ملاحظة أن هذا الإجراء لا رجعة فيه وسيتم فقدان جميع سجلات الحجز الخاصة بك.' }
      },
      {
        id: 22,
        category: 'Account',
        categoryName: { en: 'Account', ar: 'الدفع والحساب' },
        title: { en: 'How do I change my notification settings?', ar: 'كيف أقوم بتغيير إعدادات الإشعارات؟' },
        summary: { en: 'SMS and Email preferences.', ar: 'تفضيلات الرسائل القصيرة والبريد الإلكتروني.' },
        answer: { en: 'In Profile > Notifications, you can toggle SMS updates, promotional emails, and booking reminders on or off.', ar: 'في الملف الشخصي > الإشعارات، يمكنك تبديل تحديثات الرسائل القصيرة، والرسائل الترويجية، وتذكيرات الحجز تشغيلًا أو إيقافًا.' }
      }
    ]
  }
};