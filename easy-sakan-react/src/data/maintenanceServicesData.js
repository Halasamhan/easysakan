// Maintenance Services Dashboard - Mock Data

export const technicians = [
  {
    id: 1,
    name: 'Ahmed Hassan',
    photo: '👨‍🔧',
    specialty: 'Plumbing',
    status: 'available', // available, busy, on-the-way
    rating: 4.9,
    completedJobs: 156,
    latitude: 30.0444,
    longitude: 31.2357
  },
  {
    id: 2,
    name: 'Fatima Al-Zahra',
    photo: '👩‍🔧',
    specialty: 'Electrical',
    status: 'busy',
    rating: 4.8,
    completedJobs: 203,
    latitude: 30.0500,
    longitude: 31.2400
  },
  {
    id: 3,
    name: 'Mohammed Ali',
    photo: '👨‍🔧',
    specialty: 'AC & Cooling',
    status: 'on-the-way',
    rating: 4.7,
    completedJobs: 189,
    latitude: 30.0520,
    longitude: 31.2320
  },
  {
    id: 4,
    name: 'Layla Ibrahim',
    photo: '👩‍🔧',
    specialty: 'Painting & Drywall',
    status: 'available',
    rating: 4.6,
    completedJobs: 142,
    latitude: 30.0380,
    longitude: 31.2450
  },
  {
    id: 5,
    name: 'Omar Karim',
    photo: '👨‍🔧',
    specialty: 'Carpentry',
    status: 'available',
    rating: 4.9,
    completedJobs: 178,
    latitude: 30.0600,
    longitude: 31.2200
  }
];

export const serviceCategories = [
  { id: 1, name: 'Plumbing', icon: '🚰', color: '#3b82f6' },
  { id: 2, name: 'Electrical', icon: '⚡', color: '#f59e0b' },
  { id: 3, name: 'AC & Cooling', icon: '❄️', color: '#06b6d4' },
  { id: 4, name: 'Painting', icon: '🎨', color: '#ec4899' },
  { id: 5, name: 'Carpentry', icon: '🪛', color: '#8b5cf6' },
  { id: 6, name: 'General Repair', icon: '🔧', color: '#6366f1' }
];

export const jobs = [
  {
    id: 'JOB-001',
    customerId: 'C001',
    customerName: 'محمد العربي',
    phone: '+20 100 123 4567',
    serviceType: 'Plumbing',
    description: 'Leaking tap in kitchen',
    location: 'Nasr City, Cairo',
    address: '25 Street, Apt 302',
    latitude: 30.0444,
    longitude: 31.2357,
    dateTime: '2026-04-27 10:00 AM',
    status: 'pending', // pending, assigned, in-progress, completed, cancelled
    assignedTechnician: null,
    priority: 'high',
    createdAt: '2026-04-27 08:30 AM',
    completedAt: null,
    rating: null,
    notes: '',
    photos: []
  },
  {
    id: 'JOB-002',
    customerId: 'C002',
    customerName: 'فاطمة محمود',
    phone: '+20 100 234 5678',
    serviceType: 'Electrical',
    description: 'Broken light fixture',
    location: 'Downtown Cairo',
    address: '42 Tahrir Street, Apt 105',
    latitude: 30.0500,
    longitude: 31.2400,
    dateTime: '2026-04-27 02:00 PM',
    status: 'assigned',
    assignedTechnician: 2,
    priority: 'medium',
    createdAt: '2026-04-27 09:15 AM',
    completedAt: null,
    rating: null,
    notes: 'Customer prefers afternoon visit',
    photos: []
  },
  {
    id: 'JOB-003',
    customerId: 'C003',
    customerName: 'علي أحمد',
    phone: '+20 100 345 6789',
    serviceType: 'AC & Cooling',
    description: 'AC not cooling properly',
    location: 'Heliopolis',
    address: '15 El-Nile Street, Apt 401',
    latitude: 30.0520,
    longitude: 31.2320,
    dateTime: '2026-04-27 11:30 AM',
    status: 'in-progress',
    assignedTechnician: 3,
    priority: 'high',
    createdAt: '2026-04-26 04:00 PM',
    completedAt: null,
    rating: null,
    notes: 'Emergency repair needed',
    photos: ['photo1.jpg']
  },
  {
    id: 'JOB-004',
    customerId: 'C004',
    customerName: 'سارة إبراهيم',
    phone: '+20 100 456 7890',
    serviceType: 'Painting',
    description: 'Repaint bedroom walls',
    location: 'Maadi',
    address: '88 Road 9, Villa 5',
    latitude: 30.0380,
    longitude: 31.2450,
    dateTime: '2026-04-27 09:00 AM',
    status: 'completed',
    assignedTechnician: 4,
    priority: 'low',
    createdAt: '2026-04-26 02:00 PM',
    completedAt: '2026-04-27 01:30 PM',
    rating: 5,
    notes: 'Customer very satisfied',
    photos: ['before.jpg', 'after.jpg']
  },
  {
    id: 'JOB-005',
    customerId: 'C005',
    customerName: 'أحمد خالد',
    phone: '+20 100 567 8901',
    serviceType: 'Carpentry',
    description: 'Fix cabinet doors',
    location: 'Sheikh Zayed',
    address: '12 Compound A, Building 2',
    latitude: 30.0600,
    longitude: 31.2200,
    dateTime: '2026-04-28 10:00 AM',
    status: 'pending',
    assignedTechnician: null,
    priority: 'medium',
    createdAt: '2026-04-27 10:00 AM',
    completedAt: null,
    rating: null,
    notes: 'Wooden doors need adjustment',
    photos: []
  },
  {
    id: 'JOB-006',
    customerId: 'C006',
    customerName: 'ليلى حسن',
    phone: '+20 100 678 9012',
    serviceType: 'Plumbing',
    description: 'Clogged drain in bathroom',
    location: 'New Cairo',
    address: '5 Oasis, Apt 602',
    latitude: 30.0450,
    longitude: 31.2300,
    dateTime: '2026-04-27 03:00 PM',
    status: 'assigned',
    assignedTechnician: 1,
    priority: 'high',
    createdAt: '2026-04-27 09:45 AM',
    completedAt: null,
    rating: null,
    notes: 'Multiple drains affected',
    photos: []
  }
];

export const messages = [
  {
    id: 'MSG-001',
    jobId: 'JOB-002',
    type: 'technician', // customer, technician, system
    sender: 'Fatima Al-Zahra',
    content: 'On the way to your location. ETA 15 minutes.',
    timestamp: '2026-04-27 01:45 PM',
    read: false
  },
  {
    id: 'MSG-002',
    jobId: 'JOB-003',
    type: 'customer',
    sender: 'علي أحمد',
    content: 'Is the AC still not working? Please hurry',
    timestamp: '2026-04-27 12:30 PM',
    read: true
  },
  {
    id: 'MSG-003',
    jobId: 'JOB-004',
    type: 'customer',
    sender: 'سارة إبراهيم',
    content: 'The painting looks amazing! Thank you so much.',
    timestamp: '2026-04-27 01:45 PM',
    read: true
  },
  {
    id: 'MSG-004',
    jobId: 'JOB-001',
    type: 'system',
    sender: 'System',
    content: 'New service request received. Please assign to technician.',
    timestamp: '2026-04-27 08:35 AM',
    read: true
  },
  {
    id: 'MSG-005',
    jobId: 'JOB-006',
    type: 'technician',
    sender: 'Ahmed Hassan',
    content: 'I can start at 3:30 PM if that works for the customer.',
    timestamp: '2026-04-27 01:50 PM',
    read: false
  }
];

export const analyticsData = {
  today: {
    jobsCompleted: 3,
    avgResponseTime: '12 mins',
    todaysRevenue: 1250,
    satisfaction: 4.8
  },
  thisWeek: {
    jobsCompleted: 18,
    avgResponseTime: '14 mins',
    revenue: 8400,
    satisfaction: 4.7
  },
  thisMonth: {
    jobsCompleted: 67,
    avgResponseTime: '13 mins',
    revenue: 32500,
    satisfaction: 4.8
  },
  chartData: [
    { day: 'Mon', jobs: 8, revenue: 1200 },
    { day: 'Tue', jobs: 6, revenue: 950 },
    { day: 'Wed', jobs: 9, revenue: 1350 },
    { day: 'Thu', jobs: 7, revenue: 1100 },
    { day: 'Fri', jobs: 10, revenue: 1500 },
    { day: 'Sat', jobs: 12, revenue: 1800 },
    { day: 'Sun', jobs: 9, revenue: 1400 }
  ]
};

export const serviceAreas = [
  'Nasr City',
  'Downtown Cairo',
  'Heliopolis',
  'Maadi',
  'Sheikh Zayed',
  'New Cairo',
  'Zamalek',
  'Garden City'
];

export const workingHours = {
  startTime: '08:00 AM',
  endTime: '08:00 PM'
};

// Helper functions

export const getStatusColor = (status) => {
  const colors = {
    pending: '#eab308', // yellow
    assigned: '#3b82f6', // blue
    'in-progress': '#8b5cf6', // purple
    completed: '#22c55e', // green
    cancelled: '#ef4444' // red
  };
  return colors[status] || '#6b7280';
};

export const getStatusLabel = (status) => {
  const labels = {
    pending: '🟡 Pending',
    assigned: '🔵 Assigned',
    'in-progress': '🟣 In Progress',
    completed: '🟢 Completed',
    cancelled: '🔴 Cancelled'
  };
  return labels[status] || status;
};

export const getTechnicianStatusColor = (status) => {
  const colors = {
    available: '#22c55e', // green
    busy: '#ef4444', // red
    'on-the-way': '#3b82f6' // blue
  };
  return colors[status] || '#6b7280';
};

export const getTechnicianStatusLabel = (status) => {
  const labels = {
    available: '🟢 Available',
    busy: '🔴 Busy',
    'on-the-way': '🔵 On the way'
  };
  return labels[status] || status;
};

export const calculateStats = () => {
  const todayJobs = jobs.filter(j => j.dateTime.includes('2026-04-27'));
  const pendingJobs = todayJobs.filter(j => j.status === 'pending');
  const activeTechs = technicians.filter(t => t.status === 'available' || t.status === 'on-the-way');
  
  return {
    jobsToday: todayJobs.length,
    pendingRequests: pendingJobs.length,
    activeTechnicians: activeTechs.length,
    todaysRevenue: 1250
  };
};
