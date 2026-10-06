export const dashboardStats = {
  totalOrders: "1,248",
  todayOrders: "86",
  pendingOrders: "18",
  outForDelivery: "24",
  delivered: "44",
  cancelled: "3",
  totalCustomers: "892",
  activeDeliveryBoys: "12",
  todayRevenue: "48,650",
  monthlyRevenue: "14,20,500",
  growthPercent: "+14.8%",
  avgOrderValue: "₹425",
  subscriptionRevenue: "₹6,84,000"
};

export const weeklySalesData = [
  { day: "Mon", orders: 68, revenue: 38400, deliveries: 65 },
  { day: "Tue", orders: 74, revenue: 41200, deliveries: 72 },
  { day: "Wed", orders: 71, revenue: 39800, deliveries: 70 },
  { day: "Thu", orders: 82, revenue: 45600, deliveries: 80 },
  { day: "Fri", orders: 88, revenue: 49200, deliveries: 85 },
  { day: "Sat", orders: 104, revenue: 58900, deliveries: 101 },
  { day: "Sun", orders: 118, revenue: 67300, deliveries: 114 }
];

export const topProductsData = [
  { name: "Farm Fresh Cow Milk", salesCount: "4,820 L", revenue: "₹3,13,300", share: 38 },
  { name: "Pure Buffalo Milk", salesCount: "3,250 L", revenue: "₹2,43,750", share: 29 },
  { name: "Pure Desi Cow Ghee", salesCount: "420 Jars", revenue: "₹2,73,000", share: 18 },
  { name: "Artisanal Fresh Paneer", salesCount: "680 kg", revenue: "₹2,17,600", share: 15 }
];

export const deliveryBoyPerformance = [
  { name: "Rahul Verma", trips: 18, onTimePercent: 98, rating: 4.9, earnings: "₹1,440" },
  { name: "Amit Singh", trips: 16, onTimePercent: 95, rating: 4.8, earnings: "₹1,280" },
  { name: "Mohit Kumar", trips: 20, onTimePercent: 99, rating: 4.9, earnings: "₹1,600" },
  { name: "Vijay Yadav", trips: 14, onTimePercent: 92, rating: 4.7, earnings: "₹1,120" },
  { name: "Deepak Chauhan", trips: 12, onTimePercent: 94, rating: 4.8, earnings: "₹960" }
];

export const notificationsList = [
  {
    id: "notif-1",
    title: "High Morning Demand Spike",
    description: "Cow Milk morning orders exceeded daily forecast by 18%. Extra crates dispatched from hub.",
    time: "10 mins ago",
    unread: true,
    type: "alert"
  },
  {
    id: "notif-2",
    title: "New Subscription Added",
    description: "Customer Satyam Kumar started Daily 2L Cow Milk subscription.",
    time: "25 mins ago",
    unread: true,
    type: "subscription"
  },
  {
    id: "notif-3",
    title: "Delivery Completed",
    description: "Rahul Verma delivered Order #DF10245 in Mahanagar.",
    time: "45 mins ago",
    unread: false,
    type: "delivery"
  },
  {
    id: "notif-4",
    title: "Low Inventory Alert",
    description: "Artisanal Paneer stock below 30kg threshold at Gomti Nagar Hub.",
    time: "1 hour ago",
    unread: false,
    type: "inventory"
  }
];

