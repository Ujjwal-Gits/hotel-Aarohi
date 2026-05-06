const API = import.meta.env.VITE_API_BASE_URL || '/api';

export const api = {
    // Listings / Rooms
    getListings: () => fetch(`${API}/listings`).then(r => r.json()),
    createListing: (data: FormData) => fetch(`${API}/listings`, { method: 'POST', body: data }).then(r => r.json()),
    updateListing: (id: string, data: FormData) => fetch(`${API}/listings/${id}`, { method: 'PUT', body: data }).then(r => r.json()),
    updateRoomStatus: (id: string, roomStatus: string) => fetch(`${API}/listings/${id}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ roomStatus }) }).then(r => r.json()),
    deleteListing: (id: string) => fetch(`${API}/listings/${id}`, { method: 'DELETE' }).then(r => r.json()),

    // Bookings
    getBookings: () => fetch(`${API}/bookings`).then(r => r.json()),
    updateBookingStatus: (id: string, status: string) => fetch(`${API}/bookings/${id}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) }).then(r => r.json()),
    deleteBooking: (id: string) => fetch(`${API}/bookings/${id}`, { method: 'DELETE' }).then(r => r.json()),

    // Gallery
    getGallery: (category?: string) => fetch(`${API}/gallery${category ? `?category=${category}` : ''}`).then(r => r.json()),
    createGallery: (data: FormData) => fetch(`${API}/gallery`, { method: 'POST', body: data }).then(r => r.json()),
    updateGallery: (id: string, data: FormData) => fetch(`${API}/gallery/${id}`, { method: 'PUT', body: data }).then(r => r.json()),
    deleteGallery: (id: string) => fetch(`${API}/gallery/${id}`, { method: 'DELETE' }).then(r => r.json()),

    // Customers
    getCustomers: (search?: string) => fetch(`${API}/customers${search ? `?search=${search}` : ''}`).then(r => r.json()),
    createCustomer: (data: any) => fetch(`${API}/customers`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json()),
    updateCustomer: (id: string, data: any) => fetch(`${API}/customers/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json()),
    deleteCustomer: (id: string) => fetch(`${API}/customers/${id}`, { method: 'DELETE' }).then(r => r.json()),

    // Notifications
    getNotifications: () => fetch(`${API}/notifications`).then(r => r.json()),
    getUnreadCount: () => fetch(`${API}/notifications/unread-count`).then(r => r.json()),
    markNotificationRead: (id: string) => fetch(`${API}/notifications/${id}/read`, { method: 'PATCH' }).then(r => r.json()),
    markAllRead: () => fetch(`${API}/notifications/mark-all-read`, { method: 'PATCH' }).then(r => r.json()),
    clearAllNotifications: () => fetch(`${API}/notifications/clear-all`, { method: 'DELETE' }).then(r => r.json()),

    // Dashboard
    getStats: () => fetch(`${API}/dashboard`).then(r => r.json()),
};
