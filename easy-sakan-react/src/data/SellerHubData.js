export const seller = {
  name: "Marcus Rivera",
  name_ar: "ماركوس ريبييرا",
  title: "Licensed Real Estate Broker",
  title_ar: "وسيط عقارات مرخص",
  agency: "PrimeHorizon Realty Group",
  agency_ar: "مجموعة برايم هوريزون العقارية",
  email: "marcus@primehorizon.com",
  phone: "+1 (555) 824-9017",
  license: "BR-0584721",
  since: "2019",
  avatar: "https://picsum.photos/seed/broker-marcus/200/200.jpg",
  cover: "https://picsum.photos/seed/cover-skyline/1400/400.jpg",
  rating: 4.9,
  reviews: 38,
  deals: 47,
  revenue: "$12.4M",
  specialties: ["Apartments", "Condos", "Luxury Units", "Investment Props"],
  specialties_ar: ["شقق", "شقق فندقية", "وحدات فاخرة", "عقارات استثمارية"],
};

export const soldProperties = [
  { id: 1, name: "Skyline Loft #12A", name_ar: "شقة سكاي لاين #12A", type: "Apartment", type_ar: "شقة", location: "Downtown, Manhattan", location_ar: "وسط المدينة، مانهاتن", price: 875000, soldPrice: 860000, soldDate: "Nov 15, 2024", beds: 2, baths: 2, sqft: 1150, img: "https://picsum.photos/seed/loft12a/600/400.jpg", buyer: "Jonathan & Lisa Park", buyer_ar: "جوناثان وليزا بارك", daysOnMarket: 22 },
  { id: 2, name: "Harbor View Unit 8B", name_ar: "وحدة هاربور فيو 8B", type: "Condo", type_ar: "شقة فندقية", location: "Brooklyn Heights, NY", location_ar: "بروكلين هايتس، نيويورك", price: 1240000, soldPrice: 1215000, soldDate: "Oct 28, 2024", beds: 3, baths: 2, sqft: 1580, img: "https://picsum.photos/seed/harbor8b/600/400.jpg", buyer: "Diana Chen", buyer_ar: "ديانا تشن", daysOnMarket: 34 },
  { id: 3, name: "The Meridian #305", name_ar: "ميريديان #305", type: "Apartment", type_ar: "شقة", location: "Williamsburg, Brooklyn", location_ar: "ويليامزبرج، بروكلين", price: 620000, soldPrice: 635000, soldDate: "Sep 10, 2024", beds: 1, baths: 1, sqft: 780, img: "https://picsum.photos/seed/meridian305/600/400.jpg", buyer: "Tyler Morrison", buyer_ar: "تايلر موريسون", daysOnMarket: 11 },
  { id: 4, name: "Riverside Penthouse B", name_ar: "بينتهاوس ريفيرسايد B", type: "Penthouse", type_ar: "بنتهاوس", location: "Upper West Side, NY", location_ar: "الجانب الغربي العلوي، نيويورك", price: 2450000, soldPrice: 2380000, soldDate: "Aug 02, 2024", beds: 4, baths: 3, sqft: 2800, img: "https://picsum.photos/seed/penthouse-b/600/400.jpg", buyer: "Reynolds Family Trust", buyer_ar: "صندوق رينولدز العائلي", daysOnMarket: 58 },
  { id: 5, name: "NoHo Studio #7", name_ar: "استوديو نوهو #7", type: "Studio", type_ar: "استوديو", location: "NoHo, Manhattan", location_ar: "نوهو، مانهاتن", price: 410000, soldPrice: 405000, soldDate: "Jul 19, 2024", beds: 0, baths: 1, sqft: 520, img: "https://picsum.photos/seed/noho-studio7/600/400.jpg", buyer: "Aisha Williams", buyer_ar: "عائشة ويليامز", daysOnMarket: 8 },
];

export const forSaleProperties = [
  { id: 6, name: "Tribeca Loft #3C", name_ar: "لوفت تريبيكا #3C", type: "Apartment", type_ar: "شقة", location: "Tribeca, Manhattan", location_ar: "تربيكا، مانهاتن", price: 1650000, beds: 3, baths: 2, sqft: 1800, img: "https://picsum.photos/seed/tribeca3c/600/400.jpg", listed: "Dec 01, 2024", views: 284, inquiries: 12 },
  { id: 7, name: "Chelsea Micro-Unit #14", name_ar: "وحدة تشيلسي المصغرة #14", type: "Studio", type_ar: "استوديو", location: "Chelsea, Manhattan", location_ar: "تشيلسي، مانهاتن", price: 495000, beds: 0, baths: 1, sqft: 480, img: "https://picsum.photos/seed/chelsea14/600/400.jpg", listed: "Nov 22, 2024", views: 156, inquiries: 5 },
  { id: 8, name: "East Village 2BR #6A", name_ar: "غرفتين في القرية الشرقية #6A", type: "Apartment", type_ar: "شقة", location: "East Village, NY", location_ar: "القرية الشرقية، نيويورك", price: 890000, beds: 2, baths: 1, sqft: 1050, img: "https://picsum.photos/seed/eastvill6a/600/400.jpg", listed: "Dec 05, 2024", views: 98, inquiries: 7 },
  { id: 9, name: "Park Slope Townhome", name_ar: "تاون هاوس بارك سلوب", type: "Townhome", type_ar: "منزل مستقل", location: "Park Slope, Brooklyn", location_ar: "بارك سلوب، بروكلين", price: 2100000, beds: 4, baths: 3, sqft: 2400, img: "https://picsum.photos/seed/parkslope-th/600/400.jpg", listed: "Nov 10, 2024", views: 412, inquiries: 19 },
];

export const forRentProperties = [
  { id: 10, name: "FiDi Flat #22D", name_ar: "شقة فيدي #22D", type: "Apartment", type_ar: "شقة", location: "Financial District, NY", location_ar: "الحي المالي، نيويورك", rent: 4200, deposit: 8400, beds: 1, baths: 1, sqft: 720, img: "https://picsum.photos/seed/fidi22d/600/400.jpg", listed: "Dec 08, 2024", leaseTerm: "12 months", leaseTerm_ar: "12 شهر", views: 203, inquiries: 9 },
  { id: 11, name: "Midtown Suite #9B", name_ar: "جناح ميدتاون #9B", type: "Condo", type_ar: "شقة فندقية", location: "Midtown, Manhattan", location_ar: "ميدتاون، مانهاتن", rent: 6800, deposit: 13600, beds: 2, baths: 2, sqft: 1200, img: "https://picsum.photos/seed/midtown9b/600/400.jpg", listed: "Nov 30, 2024", leaseTerm: "6 months", leaseTerm_ar: "6 أشهر", views: 345, inquiries: 14 },
  { id: 12, name: "Bushwick Artist Loft", name_ar: "لوفت بوشويك الفني", type: "Loft", type_ar: "لوفت", location: "Bushwick, Brooklyn", location_ar: "بوشويك، بروكلين", rent: 3100, deposit: 6200, beds: 1, baths: 1, sqft: 900, img: "https://picsum.photos/seed/bushwick-loft/600/400.jpg", listed: "Dec 12, 2024", leaseTerm: "12 months", leaseTerm_ar: "12 شهر", views: 128, inquiries: 6 },
];