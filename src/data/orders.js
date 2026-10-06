export const orders = [
  {
    id: "DF10248",
    customerId: "cust-1",
    customerName: "Satyam Kumar",
    customerPhone: "+91 98765 43210",
    customerEmail: "satyam@example.com",
    address: {
      houseNo: "House No. 21, Sector 5",
      street: "Vipul Khand, Gomti Nagar",
      city: "Lucknow",
      state: "Uttar Pradesh",
      pincode: "226010",
      landmark: "Near CMS School"
    },
    items: [
      {
        productId: "prod-1",
        name: "Farm Fresh Cow Milk",
        unit: "1 Litre",
        price: 65,
        quantity: 2,
        total: 130,
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80"
      },
      {
        productId: "prod-6",
        name: "Premium Farm Curd (Dahi)",
        unit: "500g",
        price: 90,
        quantity: 1,
        total: 90,
        image: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=300&q=80"
      }
    ],
    subtotal: 220,
    deliveryFee: 0,
    discount: 0,
    total: 220,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    status: "Out for Delivery",
    orderDate: "Today, 05:45 AM",
    expectedDelivery: "Today, 6:00 PM – 8:00 PM",
    deliveryBoyId: "db-1",
    deliveryBoyName: "Rahul Verma",
    deliveryBoyPhone: "+91 91234 56789",
    deliveryBoyVehicle: "UP32 AB 1234 (Bike)",
    deliveryNotes: "Ring the calling bell twice. Leave at the doorstep if no response.",
    distanceKm: 1.8,
    etaMins: 12,
    timeline: [
      { status: "Order Confirmed", time: "05:45 AM", completed: true },
      { status: "Preparing at Farm Hub", time: "06:10 AM", completed: true },
      { status: "Assigned to Rahul Verma", time: "06:30 AM", completed: true },
      { status: "Out for Delivery", time: "06:42 AM", completed: true },
      { status: "Delivered", time: "Expected 07:00 AM", completed: false }
    ]
  },
  {
    id: "DF10250",
    customerId: "cust-2",
    customerName: "Priya Singh",
    customerPhone: "+91 94150 11223",
    customerEmail: "priya.singh@gmail.com",
    address: {
      houseNo: "Flat 302, Green Valley Apts",
      street: "Aliganj Extension",
      city: "Lucknow",
      state: "Uttar Pradesh",
      pincode: "226024",
      landmark: "Near Kapoorthala Crossing"
    },
    items: [
      {
        productId: "prod-4",
        name: "Artisanal Fresh Paneer",
        unit: "500g",
        price: 320,
        quantity: 1,
        total: 320,
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=300&q=80"
      },
      {
        productId: "prod-14",
        name: "Spiced Masala Buttermilk (Chaas)",
        unit: "300ml",
        price: 35,
        quantity: 2,
        total: 70,
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=300&q=80"
      }
    ],
    subtotal: 390,
    deliveryFee: 0,
    discount: 30,
    total: 360,
    paymentMethod: "UPI (Google Pay)",
    paymentStatus: "Paid",
    status: "Out for Delivery",
    orderDate: "Today, 06:15 AM",
    expectedDelivery: "Today, 7:15 AM",
    deliveryBoyId: "db-2",
    deliveryBoyName: "Amit Singh",
    deliveryBoyPhone: "+91 98765 11223",
    deliveryBoyVehicle: "UP32 CD 5678",
    deliveryNotes: "Call security guard at gate.",
    distanceKm: 2.4,
    etaMins: 15,
    timeline: [
      { status: "Order Confirmed", time: "06:15 AM", completed: true },
      { status: "Preparing at Farm Hub", time: "06:30 AM", completed: true },
      { status: "Assigned to Amit Singh", time: "06:40 AM", completed: true },
      { status: "Out for Delivery", time: "06:50 AM", completed: true },
      { status: "Delivered", time: "Expected 07:15 AM", completed: false }
    ]
  },
  {
    id: "DF10252",
    customerId: "cust-3",
    customerName: "Ankit Sharma",
    customerPhone: "+91 98390 44556",
    customerEmail: "ankit.sharma@outlook.com",
    address: {
      houseNo: "Villa 18, Omaxe Residency",
      street: "Amar Shaheed Path",
      city: "Lucknow",
      state: "Uttar Pradesh",
      pincode: "226002",
      landmark: "Gate No. 2"
    },
    items: [
      {
        productId: "prod-8",
        name: "Pure Desi Cow Ghee (Bilona Method)",
        unit: "500ml",
        price: 650,
        quantity: 1,
        total: 650,
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300&q=80"
      },
      {
        productId: "prod-3",
        name: "A2 Gir Cow Vedic Milk",
        unit: "1 Litre",
        price: 95,
        quantity: 2,
        total: 190,
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=300&q=80"
      }
    ],
    subtotal: 840,
    deliveryFee: 0,
    discount: 50,
    total: 790,
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    status: "Out for Delivery",
    orderDate: "Today, 06:20 AM",
    expectedDelivery: "Today, 7:30 AM",
    deliveryBoyId: "db-3",
    deliveryBoyName: "Mohit Kumar",
    deliveryBoyPhone: "+91 94510 22334",
    deliveryBoyVehicle: "UP32 EF 9012",
    deliveryNotes: "Security pass needed at main entrance.",
    distanceKm: 3.1,
    etaMins: 18,
    timeline: [
      { status: "Order Confirmed", time: "06:20 AM", completed: true },
      { status: "Preparing at Farm Hub", time: "06:35 AM", completed: true },
      { status: "Assigned to Mohit Kumar", time: "06:45 AM", completed: true },
      { status: "Out for Delivery", time: "06:55 AM", completed: true },
      { status: "Delivered", time: "Expected 07:30 AM", completed: false }
    ]
  },
  {
    id: "DF10255",
    customerId: "cust-5",
    customerName: "Ravi Gupta",
    customerPhone: "+91 91610 99881",
    customerEmail: "ravi.gupta@biztech.in",
    address: {
      houseNo: "C-44, Nirala Nagar",
      street: "Ramakrishna Math Marg",
      city: "Lucknow",
      state: "Uttar Pradesh",
      pincode: "226020",
      landmark: "Near Vivekananda Polyclinic"
    },
    items: [
      {
        productId: "prod-2",
        name: "Pure Buffalo Milk (Full Cream)",
        unit: "1 Litre",
        price: 75,
        quantity: 2,
        total: 150,
        image: "https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=300&q=80"
      },
      {
        productId: "prod-10",
        name: "Fresh Artisanal Butter (Salted)",
        unit: "200g",
        price: 120,
        quantity: 1,
        total: 120,
        image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=300&q=80"
      }
    ],
    subtotal: 270,
    deliveryFee: 30,
    discount: 0,
    total: 300,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    status: "Out for Delivery",
    orderDate: "Today, 06:40 AM",
    expectedDelivery: "Today, 7:15 AM",
    deliveryBoyId: "db-4",
    deliveryBoyName: "Vijay Yadav",
    deliveryBoyPhone: "+91 93360 33445",
    deliveryBoyVehicle: "UP32 GH 3456",
    deliveryNotes: "Call when you reach gate.",
    distanceKm: 1.2,
    etaMins: 8,
    timeline: [
      { status: "Order Confirmed", time: "06:40 AM", completed: true },
      { status: "Preparing at Farm Hub", time: "06:50 AM", completed: true },
      { status: "Assigned to Vijay Yadav", time: "06:58 AM", completed: true },
      { status: "Out for Delivery", time: "07:05 AM", completed: true },
      { status: "Delivered", time: "Expected 07:20 AM", completed: false }
    ]
  },
  {
    id: "DF10245",
    customerId: "cust-4",
    customerName: "Neha Verma",
    customerPhone: "+91 97930 77889",
    customerEmail: "neha.verma@yahoo.com",
    address: {
      houseNo: "Plot 89, Sector B",
      street: "Mahanagar",
      city: "Lucknow",
      state: "Uttar Pradesh",
      pincode: "226006",
      landmark: "Near Gol Market"
    },
    items: [
      {
        productId: "prod-1",
        name: "Farm Fresh Cow Milk",
        unit: "1 Litre",
        price: 65,
        quantity: 1,
        total: 65,
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80"
      },
      {
        productId: "prod-12",
        name: "Traditional Sweet Lassi",
        unit: "300ml",
        price: 55,
        quantity: 2,
        total: 110,
        image: "https://images.unsplash.com/photo-1570696516188-ade861b84a49?auto=format&fit=crop&w=300&q=80"
      }
    ],
    subtotal: 175,
    deliveryFee: 30,
    discount: 0,
    total: 205,
    paymentMethod: "UPI (PhonePe)",
    paymentStatus: "Paid",
    status: "Delivered",
    orderDate: "Today, 05:10 AM",
    expectedDelivery: "Delivered at 06:25 AM",
    deliveryBoyId: "db-1",
    deliveryBoyName: "Rahul Verma",
    deliveryBoyPhone: "+91 91234 56789",
    deliveryBoyVehicle: "UP32 AB 1234",
    deliveryNotes: "Delivered to customer.",
    distanceKm: 0,
    etaMins: 0,
    timeline: [
      { status: "Order Confirmed", time: "05:10 AM", completed: true },
      { status: "Preparing at Farm Hub", time: "05:30 AM", completed: true },
      { status: "Assigned to Rahul Verma", time: "05:45 AM", completed: true },
      { status: "Out for Delivery", time: "06:00 AM", completed: true },
      { status: "Delivered", time: "06:25 AM", completed: true }
    ]
  },
  {
    id: "DF10240",
    customerId: "cust-7",
    customerName: "Rajesh Khanna",
    customerPhone: "+91 93350 88776",
    customerEmail: "rkhanna.lucknow@rediffmail.com",
    address: {
      houseNo: "12, Park Road",
      street: "Hazratganj",
      city: "Lucknow",
      state: "Uttar Pradesh",
      pincode: "226001",
      landmark: "Near Governor House"
    },
    items: [
      {
        productId: "prod-4",
        name: "Artisanal Fresh Paneer",
        unit: "500g",
        price: 320,
        quantity: 1,
        total: 320,
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=300&q=80"
      },
      {
        productId: "prod-6",
        name: "Premium Farm Curd (Dahi)",
        unit: "500g",
        price: 90,
        quantity: 2,
        total: 180,
        image: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=300&q=80"
      }
    ],
    subtotal: 500,
    deliveryFee: 0,
    discount: 50,
    total: 450,
    paymentMethod: "UPI (Paytm)",
    paymentStatus: "Paid",
    status: "Delivered",
    orderDate: "Today, 05:00 AM",
    expectedDelivery: "Delivered at 06:10 AM",
    deliveryBoyId: "db-5",
    deliveryBoyName: "Deepak Chauhan",
    deliveryBoyPhone: "+91 97920 44556",
    deliveryBoyVehicle: "UP32 JK 7890",
    deliveryNotes: "Handed over to customer.",
    distanceKm: 0,
    etaMins: 0,
    timeline: [
      { status: "Order Confirmed", time: "05:00 AM", completed: true },
      { status: "Preparing at Farm Hub", time: "05:15 AM", completed: true },
      { status: "Assigned to Deepak Chauhan", time: "05:25 AM", completed: true },
      { status: "Out for Delivery", time: "05:40 AM", completed: true },
      { status: "Delivered", time: "06:10 AM", completed: true }
    ]
  },
  {
    id: "DF10260",
    customerId: "cust-6",
    customerName: "Pooja Patel",
    customerPhone: "+91 96510 33445",
    customerEmail: "pooja.patel@gmail.com",
    address: {
      houseNo: "Flat 104, Eldeco Elegance",
      street: "Vibhuti Khand",
      city: "Lucknow",
      state: "Uttar Pradesh",
      pincode: "226010",
      landmark: "Near High Court"
    },
    items: [
      {
        productId: "prod-13",
        name: "Alphonso Mango Lassi",
        unit: "300ml",
        price: 75,
        quantity: 2,
        total: 150,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80"
      },
      {
        productId: "prod-11",
        name: "Pure White Makhan (Desi Butter)",
        unit: "250g",
        price: 160,
        quantity: 1,
        total: 160,
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80"
      }
    ],
    subtotal: 310,
    deliveryFee: 0,
    discount: 0,
    total: 310,
    paymentMethod: "UPI (Google Pay)",
    paymentStatus: "Paid",
    status: "Preparing",
    orderDate: "Today, 07:05 AM",
    expectedDelivery: "Today, 8:00 AM",
    deliveryBoyId: "db-1",
    deliveryBoyName: "Rahul Verma",
    deliveryBoyPhone: "+91 91234 56789",
    deliveryBoyVehicle: "UP32 AB 1234",
    deliveryNotes: "Call when reached.",
    distanceKm: 2.1,
    etaMins: 25,
    timeline: [
      { status: "Order Confirmed", time: "07:05 AM", completed: true },
      { status: "Preparing at Farm Hub", time: "07:15 AM", completed: true },
      { status: "Assigned to Rahul Verma", time: "In queue", completed: false },
      { status: "Out for Delivery", time: "Pending", completed: false },
      { status: "Delivered", time: "Pending", completed: false }
    ]
  },
  {
    id: "DF10262",
    customerId: "cust-8",
    customerName: "Sunita Devi",
    customerPhone: "+91 94500 66554",
    customerEmail: "sunita.devi88@gmail.com",
    address: {
      houseNo: "H-202, Sushant Golf City",
      street: "Sultanpur Road",
      city: "Lucknow",
      state: "Uttar Pradesh",
      pincode: "226030",
      landmark: "Near Medanta Hospital"
    },
    items: [
      {
        productId: "prod-1",
        name: "Farm Fresh Cow Milk",
        unit: "1 Litre",
        price: 65,
        quantity: 2,
        total: 130,
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80"
      }
    ],
    subtotal: 130,
    deliveryFee: 30,
    discount: 0,
    total: 160,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    status: "Confirmed",
    orderDate: "Today, 07:15 AM",
    expectedDelivery: "Today, 8:30 AM",
    deliveryBoyId: null,
    deliveryBoyName: "Unassigned",
    deliveryBoyPhone: null,
    deliveryBoyVehicle: null,
    deliveryNotes: "Leave in milk crate outside door.",
    distanceKm: 4.5,
    etaMins: 40,
    timeline: [
      { status: "Order Confirmed", time: "07:15 AM", completed: true },
      { status: "Preparing at Farm Hub", time: "Pending", completed: false },
      { status: "Assigned", time: "Pending", completed: false },
      { status: "Out for Delivery", time: "Pending", completed: false },
      { status: "Delivered", time: "Pending", completed: false }
    ]
  },
  {
    id: "DF10265",
    customerId: "cust-1",
    customerName: "Satyam Kumar",
    customerPhone: "+91 98765 43210",
    customerEmail: "satyam@example.com",
    address: {
      houseNo: "House No. 21, Sector 5",
      street: "Vipul Khand, Gomti Nagar",
      city: "Lucknow",
      state: "Uttar Pradesh",
      pincode: "226010",
      landmark: "Near CMS School"
    },
    items: [
      {
        productId: "prod-8",
        name: "Pure Desi Cow Ghee (Bilona Method)",
        unit: "500ml",
        price: 650,
        quantity: 1,
        total: 650,
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300&q=80"
      }
    ],
    subtotal: 650,
    deliveryFee: 0,
    discount: 50,
    total: 600,
    paymentMethod: "Online (Netbanking)",
    paymentStatus: "Paid",
    status: "Pending",
    orderDate: "Today, 07:22 AM",
    expectedDelivery: "Today, 9:00 AM",
    deliveryBoyId: null,
    deliveryBoyName: "Unassigned",
    deliveryBoyPhone: null,
    deliveryBoyVehicle: null,
    deliveryNotes: "Please handle glass jar with care.",
    distanceKm: 1.8,
    etaMins: 45,
    timeline: [
      { status: "Order Placed", time: "07:22 AM", completed: true },
      { status: "Confirmed", time: "Pending", completed: false },
      { status: "Preparing", time: "Pending", completed: false },
      { status: "Out for Delivery", time: "Pending", completed: false },
      { status: "Delivered", time: "Pending", completed: false }
    ]
  },
  {
    id: "DF10235",
    customerId: "cust-3",
    customerName: "Ankit Sharma",
    customerPhone: "+91 98390 44556",
    customerEmail: "ankit.sharma@outlook.com",
    address: {
      houseNo: "Villa 18, Omaxe Residency",
      street: "Amar Shaheed Path",
      city: "Lucknow",
      state: "Uttar Pradesh",
      pincode: "226002",
      landmark: "Gate No. 2"
    },
    items: [
      {
        productId: "prod-7",
        name: "Earthen Pot Matka Dahi",
        unit: "400g",
        price: 130,
        quantity: 2,
        total: 260,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80"
      }
    ],
    subtotal: 260,
    deliveryFee: 30,
    discount: 0,
    total: 290,
    paymentMethod: "UPI (Paytm)",
    paymentStatus: "Refunded",
    status: "Cancelled",
    orderDate: "Yesterday, 04:30 PM",
    expectedDelivery: "Cancelled by User",
    deliveryBoyId: null,
    deliveryBoyName: "None",
    deliveryBoyPhone: null,
    deliveryBoyVehicle: null,
    deliveryNotes: "Customer requested cancellation due to travel plan.",
    distanceKm: 0,
    etaMins: 0,
    timeline: [
      { status: "Order Placed", time: "04:30 PM", completed: true },
      { status: "Cancelled", time: "04:45 PM", completed: true }
    ]
  },
  {
    id: "DF10220",
    customerId: "cust-1",
    customerName: "Satyam Kumar",
    customerPhone: "+91 98765 43210",
    customerEmail: "satyam@example.com",
    address: {
      houseNo: "House No. 21, Sector 5",
      street: "Vipul Khand, Gomti Nagar",
      city: "Lucknow",
      state: "Uttar Pradesh",
      pincode: "226010",
      landmark: "Near CMS School"
    },
    items: [
      {
        productId: "prod-1",
        name: "Farm Fresh Cow Milk",
        unit: "1 Litre",
        price: 65,
        quantity: 2,
        total: 130,
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80"
      },
      {
        productId: "prod-4",
        name: "Artisanal Fresh Paneer",
        unit: "500g",
        price: 320,
        quantity: 1,
        total: 320,
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=300&q=80"
      }
    ],
    subtotal: 450,
    deliveryFee: 0,
    discount: 50,
    total: 400,
    paymentMethod: "UPI (Google Pay)",
    paymentStatus: "Paid",
    status: "Delivered",
    orderDate: "Yesterday, 06:00 AM",
    expectedDelivery: "Delivered at 06:45 AM",
    deliveryBoyId: "db-1",
    deliveryBoyName: "Rahul Verma",
    deliveryBoyPhone: "+91 91234 56789",
    deliveryBoyVehicle: "UP32 AB 1234",
    deliveryNotes: "Smooth doorstep delivery.",
    distanceKm: 0,
    etaMins: 0,
    timeline: [
      { status: "Order Confirmed", time: "06:00 AM", completed: true },
      { status: "Preparing at Farm Hub", time: "06:15 AM", completed: true },
      { status: "Assigned to Rahul Verma", time: "06:25 AM", completed: true },
      { status: "Out for Delivery", time: "06:35 AM", completed: true },
      { status: "Delivered", time: "06:45 AM", completed: true }
    ]
  },
  {
    id: "DF10215",
    customerId: "cust-2",
    customerName: "Priya Singh",
    customerPhone: "+91 94150 11223",
    customerEmail: "priya.singh@gmail.com",
    address: {
      houseNo: "Flat 302, Green Valley Apts",
      street: "Aliganj Extension",
      city: "Lucknow",
      state: "Uttar Pradesh",
      pincode: "226024",
      landmark: "Near Kapoorthala Crossing"
    },
    items: [
      {
        productId: "prod-6",
        name: "Premium Farm Curd (Dahi)",
        unit: "500g",
        price: 90,
        quantity: 2,
        total: 180,
        image: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=300&q=80"
      }
    ],
    subtotal: 180,
    deliveryFee: 30,
    discount: 0,
    total: 210,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Paid",
    status: "Delivered",
    orderDate: "Sep 06, 2026",
    expectedDelivery: "Delivered at 07:10 AM",
    deliveryBoyId: "db-2",
    deliveryBoyName: "Amit Singh",
    deliveryBoyPhone: "+91 98765 11223",
    deliveryBoyVehicle: "UP32 CD 5678",
    deliveryNotes: "Cash collected ₹210.",
    distanceKm: 0,
    etaMins: 0,
    timeline: [
      { status: "Order Confirmed", time: "06:30 AM", completed: true },
      { status: "Delivered", time: "07:10 AM", completed: true }
    ]
  },
  {
    id: "DF10210",
    customerId: "cust-5",
    customerName: "Ravi Gupta",
    customerPhone: "+91 91610 99881",
    customerEmail: "ravi.gupta@biztech.in",
    address: {
      houseNo: "C-44, Nirala Nagar",
      street: "Ramakrishna Math Marg",
      city: "Lucknow",
      state: "Uttar Pradesh",
      pincode: "226020",
      landmark: "Near Vivekananda Polyclinic"
    },
    items: [
      {
        productId: "prod-8",
        name: "Pure Desi Cow Ghee (Bilona Method)",
        unit: "500ml",
        price: 650,
        quantity: 2,
        total: 1300,
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300&q=80"
      }
    ],
    subtotal: 1300,
    deliveryFee: 0,
    discount: 100,
    total: 1200,
    paymentMethod: "UPI (Paytm)",
    paymentStatus: "Paid",
    status: "Delivered",
    orderDate: "Sep 05, 2026",
    expectedDelivery: "Delivered at 07:05 AM",
    deliveryBoyId: "db-4",
    deliveryBoyName: "Vijay Yadav",
    deliveryBoyPhone: "+91 93360 33445",
    deliveryBoyVehicle: "UP32 GH 3456",
    deliveryNotes: "Customer satisfied.",
    distanceKm: 0,
    etaMins: 0,
    timeline: [
      { status: "Order Confirmed", time: "06:10 AM", completed: true },
      { status: "Delivered", time: "07:05 AM", completed: true }
    ]
  },
  {
    id: "DF10205",
    customerId: "cust-4",
    customerName: "Neha Verma",
    customerPhone: "+91 97930 77889",
    customerEmail: "neha.verma@yahoo.com",
    address: {
      houseNo: "Plot 89, Sector B",
      street: "Mahanagar",
      city: "Lucknow",
      state: "Uttar Pradesh",
      pincode: "226006",
      landmark: "Near Gol Market"
    },
    items: [
      {
        productId: "prod-1",
        name: "Farm Fresh Cow Milk",
        unit: "1 Litre",
        price: 65,
        quantity: 2,
        total: 130,
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80"
      },
      {
        productId: "prod-10",
        name: "Fresh Artisanal Butter (Salted)",
        unit: "200g",
        price: 120,
        quantity: 1,
        total: 120,
        image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=300&q=80"
      }
    ],
    subtotal: 250,
    deliveryFee: 30,
    discount: 0,
    total: 280,
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    status: "Delivered",
    orderDate: "Sep 04, 2026",
    expectedDelivery: "Delivered at 06:40 AM",
    deliveryBoyId: "db-1",
    deliveryBoyName: "Rahul Verma",
    deliveryBoyPhone: "+91 91234 56789",
    deliveryBoyVehicle: "UP32 AB 1234",
    deliveryNotes: "Prompt delivery.",
    distanceKm: 0,
    etaMins: 0,
    timeline: [
      { status: "Order Confirmed", time: "05:50 AM", completed: true },
      { status: "Delivered", time: "06:40 AM", completed: true }
    ]
  },
  {
    id: "DF10198",
    customerId: "cust-7",
    customerName: "Rajesh Khanna",
    customerPhone: "+91 93350 88776",
    customerEmail: "rkhanna.lucknow@rediffmail.com",
    address: {
      houseNo: "12, Park Road",
      street: "Hazratganj",
      city: "Lucknow",
      state: "Uttar Pradesh",
      pincode: "226001",
      landmark: "Near Governor House"
    },
    items: [
      {
        productId: "prod-3",
        name: "A2 Gir Cow Vedic Milk",
        unit: "1 Litre",
        price: 95,
        quantity: 1,
        total: 95,
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=300&q=80"
      }
    ],
    subtotal: 95,
    deliveryFee: 30,
    discount: 0,
    total: 125,
    paymentMethod: "UPI (Google Pay)",
    paymentStatus: "Paid",
    status: "Delivered",
    orderDate: "Sep 03, 2026",
    expectedDelivery: "Delivered at 06:15 AM",
    deliveryBoyId: "db-5",
    deliveryBoyName: "Deepak Chauhan",
    deliveryBoyPhone: "+91 97920 44556",
    deliveryBoyVehicle: "UP32 JK 7890",
    deliveryNotes: "Delivered on time.",
    distanceKm: 0,
    etaMins: 0,
    timeline: [
      { status: "Order Confirmed", time: "05:30 AM", completed: true },
      { status: "Delivered", time: "06:15 AM", completed: true }
    ]
  },
  {
    id: "DF10190",
    customerId: "cust-1",
    customerName: "Satyam Kumar",
    customerPhone: "+91 98765 43210",
    customerEmail: "satyam@example.com",
    address: {
      houseNo: "House No. 21, Sector 5",
      street: "Vipul Khand, Gomti Nagar",
      city: "Lucknow",
      state: "Uttar Pradesh",
      pincode: "226010",
      landmark: "Near CMS School"
    },
    items: [
      {
        productId: "prod-2",
        name: "Pure Buffalo Milk (Full Cream)",
        unit: "1 Litre",
        price: 75,
        quantity: 3,
        total: 225,
        image: "https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=300&q=80"
      },
      {
        productId: "prod-6",
        name: "Premium Farm Curd (Dahi)",
        unit: "500g",
        price: 90,
        quantity: 1,
        total: 90,
        image: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=300&q=80"
      }
    ],
    subtotal: 315,
    deliveryFee: 0,
    discount: 25,
    total: 290,
    paymentMethod: "UPI (PhonePe)",
    paymentStatus: "Paid",
    status: "Delivered",
    orderDate: "Sep 02, 2026",
    expectedDelivery: "Delivered at 06:50 AM",
    deliveryBoyId: "db-1",
    deliveryBoyName: "Rahul Verma",
    deliveryBoyPhone: "+91 91234 56789",
    deliveryBoyVehicle: "UP32 AB 1234",
    deliveryNotes: "Customer rated 5 stars.",
    distanceKm: 0,
    etaMins: 0,
    timeline: [
      { status: "Order Confirmed", time: "06:05 AM", completed: true },
      { status: "Delivered", time: "06:50 AM", completed: true }
    ]
  }
];

export default orders;

