import React, { createContext, useContext, useState, useEffect } from 'react';
import { orders as initialOrders } from '../data/orders';
import { products as initialProducts } from '../data/products';
import { deliveryBoys as initialDeliveryBoys } from '../data/deliveryBoys';
import { customers as initialCustomers } from '../data/customers';
import { initialSubscriptions } from '../data/subscriptions';
import { payments as initialPayments } from '../data/payments';
import { useToast } from './ToastContext';

const AppDataContext = createContext(null);

export const AppDataProvider = ({ children }) => {
  const { showToast } = useToast();

  // Orders State
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('amritadairy_orders') || localStorage.getItem('dairyfresh_orders');
      return saved ? JSON.parse(saved) : initialOrders;
    } catch {
      return initialOrders;
    }
  });

  // Products State
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('amritadairy_products') || localStorage.getItem('dairyfresh_products');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  // Delivery Boys State
  const [deliveryBoys, setDeliveryBoys] = useState(() => {
    try {
      const saved = localStorage.getItem('amritadairy_delivery_boys') || localStorage.getItem('dairyfresh_delivery_boys');
      return saved ? JSON.parse(saved) : initialDeliveryBoys;
    } catch {
      return initialDeliveryBoys;
    }
  });

  // Subscriptions State
  const [subscriptions, setSubscriptions] = useState(() => {
    try {
      const saved = localStorage.getItem('amritadairy_subscriptions') || localStorage.getItem('dairyfresh_subscriptions');
      return saved ? JSON.parse(saved) : initialSubscriptions;
    } catch {
      return initialSubscriptions;
    }
  });

  // Customers State
  const [customers, setCustomers] = useState(() => {
    try {
      const saved = localStorage.getItem('amritadairy_customers') || localStorage.getItem('dairyfresh_customers');
      return saved ? JSON.parse(saved) : initialCustomers;
    } catch {
      return initialCustomers;
    }
  });

  // Payments State
  const [payments, setPayments] = useState(() => {
    try {
      const saved = localStorage.getItem('amritadairy_payments') || localStorage.getItem('dairyfresh_payments');
      return saved ? JSON.parse(saved) : initialPayments;
    } catch {
      return initialPayments;
    }
  });

  // Active current user profile for customer portal (default Satyam Kumar)
  const currentCustomer = customers[0] || initialCustomers[0];

  // Active delivery executive for delivery portal (default Rahul Verma)
  const currentDeliveryBoy = deliveryBoys.find(db => db.id === "db-1") || deliveryBoys[0];

  // Persist state changes
  useEffect(() => {
    try {
      localStorage.setItem('amritadairy_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn("Storage quota error:", e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('amritadairy_products', JSON.stringify(products));
    } catch (e) {
      console.warn("Storage quota error:", e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('amritadairy_delivery_boys', JSON.stringify(deliveryBoys));
    } catch (e) {
      console.warn("Storage quota error:", e);
    }
  }, [deliveryBoys]);

  useEffect(() => {
    try {
      localStorage.setItem('amritadairy_subscriptions', JSON.stringify(subscriptions));
    } catch (e) {
      console.warn("Storage quota error:", e);
    }
  }, [subscriptions]);

  useEffect(() => {
    try {
      localStorage.setItem('amritadairy_customers', JSON.stringify(customers));
    } catch (e) {
      console.warn("Storage quota error:", e);
    }
  }, [customers]);

  // Order Operations
  const placeOrder = (newOrderData) => {
    const orderId = `DF${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const timeStr = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newOrder = {
      id: orderId,
      customerId: currentCustomer.id,
      customerName: currentCustomer.name,
      customerPhone: currentCustomer.phone,
      customerEmail: currentCustomer.email,
      address: newOrderData.address || currentCustomer.addresses[0],
      items: newOrderData.items,
      subtotal: newOrderData.subtotal,
      deliveryFee: newOrderData.deliveryFee,
      discount: newOrderData.discount || 0,
      total: newOrderData.total,
      paymentMethod: newOrderData.paymentMethod || "Cash on Delivery",
      paymentStatus: newOrderData.paymentMethod === "Cash on Delivery" ? "Pending" : "Paid",
      status: "Confirmed",
      orderDate: timeStr,
      expectedDelivery: newOrderData.deliverySlot || "Today, 6:00 PM – 8:00 PM",
      deliveryBoyId: "db-1", // default assign to Rahul for demo ease
      deliveryBoyName: "Rahul Verma",
      deliveryBoyPhone: "+91 91234 56789",
      deliveryBoyVehicle: "UP32 AB 1234 (Bike)",
      deliveryNotes: newOrderData.notes || "Please leave at door step.",
      distanceKm: 1.8,
      etaMins: 15,
      timeline: [
        { status: "Order Confirmed", time: timeStr, completed: true },
        { status: "Preparing at Farm Hub", time: "Pending", completed: false },
        { status: "Assigned to Rahul Verma", time: "Pending", completed: false },
        { status: "Out for Delivery", time: "Pending", completed: false },
        { status: "Delivered", time: "Pending", completed: false }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Add payment entry
    const newPayment = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      orderId: orderId,
      customerName: currentCustomer.name,
      amount: newOrder.total,
      method: newOrder.paymentMethod,
      status: newOrder.paymentMethod === "Cash on Delivery" ? "Pending Collection" : "Completed",
      date: timeStr,
      type: "Order Payment",
      referenceId: `REF${Math.floor(100000 + Math.random() * 900000)}`
    };
    setPayments((prev) => [newPayment, ...prev]);

    showToast(`Order #${orderId} placed successfully!`);
    return orderId;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;

        const updatedTimeline = order.timeline.map((step) => {
          if (step.status.toLowerCase().includes(newStatus.toLowerCase())) {
            return { ...step, time: timeStr, completed: true };
          }
          return step;
        });

        return {
          ...order,
          status: newStatus,
          paymentStatus: newStatus === "Delivered" && order.paymentMethod === "Cash on Delivery" ? "Paid" : order.paymentStatus,
          timeline: updatedTimeline
        };
      })
    );
    showToast(`Order #${orderId} status changed to ${newStatus}`);
  };

  const assignDeliveryBoy = (orderId, deliveryBoyId) => {
    const boy = deliveryBoys.find((b) => b.id === deliveryBoyId);
    if (!boy) return;

    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        return {
          ...order,
          status: order.status === "Pending" ? "Confirmed" : order.status,
          deliveryBoyId: boy.id,
          deliveryBoyName: boy.name,
          deliveryBoyPhone: boy.phone,
          deliveryBoyVehicle: `${boy.vehicleNumber} (${boy.vehicleType})`
        };
      })
    );

    // Also update delivery boy state
    setDeliveryBoys((prev) =>
      prev.map((b) => {
        if (b.id === deliveryBoyId) {
          return {
            ...b,
            status: "Busy",
            currentOrder: {
              orderId,
              customerName: "Satyam Kumar",
              customerPhone: "+91 98765 43210",
              customerAddress: "Gomti Nagar, Lucknow",
              distanceKm: 1.8,
              etaMins: 12,
              lastUpdated: "Just now"
            }
          };
        }
        return b;
      })
    );

    showToast(`Assigned ${boy.name} to order #${orderId}`);
  };

  // Delivery Boy Status Toggle
  const toggleDeliveryBoyOnline = (boyId) => {
    setDeliveryBoys((prev) =>
      prev.map((boy) => {
        if (boy.id !== boyId) return boy;
        const nextStatus = boy.status === "Offline" ? "Online" : "Offline";
        showToast(`${boy.name} is now ${nextStatus}`, nextStatus === "Online" ? "success" : "warning");
        return { ...boy, status: nextStatus };
      })
    );
  };

  // Subscription Operations
  const toggleSubscriptionStatus = (subId) => {
    setSubscriptions((prev) =>
      prev.map((sub) => {
        if (sub.id !== subId) return sub;
        const newStatus = sub.status === "Active" ? "Paused" : "Active";
        showToast(
          `Subscription ${sub.productName} is now ${newStatus}`,
          newStatus === "Active" ? "success" : "info"
        );
        return { ...sub, status: newStatus };
      })
    );
  };

  const addSubscription = (newSub) => {
    const id = `SUB-${Math.floor(800 + Math.random() * 200)}`;
    const sub = {
      id,
      customerId: currentCustomer.id,
      customerName: currentCustomer.name,
      customerPhone: currentCustomer.phone,
      address: currentCustomer.addresses[0].houseNo + ", " + currentCustomer.addresses[0].street,
      deliveredCount: 0,
      status: "Active",
      startDate: "Today",
      nextDelivery: "Tomorrow (5:30 AM)",
      paymentMethod: "UPI Autopay",
      ...newSub
    };
    setSubscriptions((prev) => [sub, ...prev]);
    showToast(`New subscription started for ${sub.productName}`);
  };

  const cancelSubscription = (subId) => {
    setSubscriptions((prev) => prev.filter((s) => s.id !== subId));
    showToast(`Subscription cancelled`, 'info');
  };

  // Product CRUD
  const addProduct = (productData) => {
    const newProd = {
      ...productData,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      inStock: true
    };
    setProducts((prev) => [newProd, ...prev]);
    showToast(`Added product "${newProd.name}"`);
  };

  const updateProduct = (productId, updatedData) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, ...updatedData } : p))
    );
    showToast(`Product updated successfully`);
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast(`Product removed`, 'info');
  };

  const toggleProductStock = (productId) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updated = !p.inStock;
          showToast(`${p.name} is now ${updated ? "In Stock" : "Out of Stock"}`);
          return { ...p, inStock: updated };
        }
        return p;
      })
    );
  };

  // Customer Address Operations
  const addCustomerAddress = (newAddress) => {
    const addressId = `addr-${Date.now()}`;
    const formatted = { ...newAddress, id: addressId, isDefault: false };
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === currentCustomer.id
          ? { ...c, addresses: [...c.addresses, formatted] }
          : c
      )
    );
    showToast("Address added successfully");
  };

  const deleteCustomerAddress = (addressId) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === currentCustomer.id
          ? { ...c, addresses: c.addresses.filter((a) => a.id !== addressId) }
          : c
      )
    );
    showToast("Address removed", "info");
  };

  const setDefaultAddress = (addressId) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === currentCustomer.id
          ? {
              ...c,
              addresses: c.addresses.map((a) => ({
                ...a,
                isDefault: a.id === addressId
              }))
            }
          : c
      )
    );
    showToast("Default address updated");
  };

  return (
    <AppDataContext.Provider
      value={{
        orders,
        products,
        deliveryBoys,
        subscriptions,
        customers,
        payments,
        currentCustomer,
        currentDeliveryBoy,
        placeOrder,
        updateOrderStatus,
        assignDeliveryBoy,
        toggleDeliveryBoyOnline,
        toggleSubscriptionStatus,
        addSubscription,
        cancelSubscription,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStock,
        addCustomerAddress,
        deleteCustomerAddress,
        setDefaultAddress
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    return {
      orders: initialOrders,
      products: initialProducts,
      deliveryBoys: initialDeliveryBoys,
      subscriptions: initialSubscriptions,
      customers: initialCustomers,
      payments: initialPayments,
      currentCustomer: initialCustomers[0],
      currentDeliveryBoy: initialDeliveryBoys[0],
      placeOrder: () => {},
      updateOrderStatus: () => {},
      assignDeliveryBoy: () => {},
      toggleDeliveryBoyOnline: () => {},
      toggleSubscriptionStatus: () => {},
      addSubscription: () => {},
      cancelSubscription: () => {},
      addProduct: () => {},
      updateProduct: () => {},
      deleteProduct: () => {},
      toggleProductStock: () => {},
      addCustomerAddress: () => {},
      deleteCustomerAddress: () => {},
      setDefaultAddress: () => {}
    };
  }
  return context;
};

