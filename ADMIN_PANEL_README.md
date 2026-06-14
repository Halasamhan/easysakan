# Admin Panel Setup Guide

## Overview
The admin panel is now integrated into the Easy Sakan application. It provides full management capabilities for:
- Posters/Promotional Content
- Services
- Bookings/Orders
- Property Listings
- Users (Customers & Sellers)
- Dashboard with statistics

## Access Admin Panel

### Login URL
```
http://localhost:5173/admin/login
```

### Demo Credentials
- **Email:** admin@easysakan.com
- **Password:** admin123

## Database Setup

The admin panel requires the following database tables. Run these SQL commands to set up your database:

### 1. Create Posters Table
```sql
CREATE TABLE IF NOT EXISTS `posters` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `location` VARCHAR(100) NOT NULL,
  `image_path` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 2. Create Services Table
```sql
CREATE TABLE IF NOT EXISTS `services` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `icon` VARCHAR(10),
  `price` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 3. Create Bookings Table
```sql
CREATE TABLE IF NOT EXISTS `bookings` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `customer_id` INT,
  `service_id` INT,
  `amount` INT DEFAULT 0,
  `booking_date` DATE,
  `booking_time` VARCHAR(50),
  `status` VARCHAR(50) DEFAULT 'pending',
  `notes` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`),
  FOREIGN KEY (`service_id`) REFERENCES `services`(`id`)
);
```

### 4. Update Listings Table
```sql
ALTER TABLE `listings` ADD COLUMN IF NOT EXISTS `status` VARCHAR(50) DEFAULT 'pending';
ALTER TABLE `listings` ADD COLUMN IF NOT EXISTS `rejection_reason` TEXT;
ALTER TABLE `listings` ADD COLUMN IF NOT EXISTS `space` INT;
ALTER TABLE `listings` ADD COLUMN IF NOT EXISTS `seller_id` INT;
```

### 5. Update Customers Table
```sql
ALTER TABLE `customers` ADD COLUMN IF NOT EXISTS `status` VARCHAR(50) DEFAULT 'active';
ALTER TABLE `customers` ADD COLUMN IF NOT EXISTS `user_type` VARCHAR(50) DEFAULT 'customer';
```

## Admin Panel Features

### Dashboard
- View overall statistics:
  - Total bookings
  - Total listings
  - Total users
  - Total revenue
  - Pending listings count

### Posters Management
- Upload promotional posters
- Assign posters to specific locations (Services, Home, Listings pages)
- Edit and delete posters
- Image file management

### Services Management
- Add new services with:
  - Name/Title
  - Description
  - Icon (emoji)
  - Base price
- Edit existing services
- Delete services
- View all services in table format

### Bookings Management
- View all bookings
- Filter by status (Pending, Confirmed, Completed, Cancelled)
- Update booking status
- View customer and service details

### Listings Management
- Review pending property listings
- Approve listings for publication
- Reject listings with reasons
- Delete listings
- View seller information
- Property details (type, price, space, etc.)

### Users Management
- View all users (customers and sellers)
- Filter by user type
- View user registration date
- Activate/Deactivate users
- Delete users

## File Structure

```
Admin Panel Files Created:
├── React Components (src/pages/admin/)
│   ├── AdminLogin.jsx
│   ├── AdminDashboard.jsx
│   ├── AdminPosters.jsx
│   ├── AdminServices.jsx
│   ├── AdminBookings.jsx
│   ├── AdminListings.jsx
│   └── AdminUsers.jsx
├── Styling
│   └── src/styles/admin.css
├── PHP Handlers (Root)
│   ├── admin_login_handler.php
│   ├── admin_dashboard_handler.php
│   ├── admin_posters_handler.php
│   ├── admin_services_handler.php
│   ├── admin_bookings_handler.php
│   ├── admin_listings_handler.php
│   └── admin_users_handler.php
└── Routes (App.jsx updated)
```

## API Endpoints

All admin endpoints use the `/api/` proxy:

- `POST /api/admin_login_handler.php` - Admin login
- `POST /api/admin_dashboard_handler.php` - Get dashboard stats
- `GET/POST /api/admin_posters_handler.php` - Manage posters
- `GET/POST /api/admin_services_handler.php` - Manage services
- `GET/POST /api/admin_bookings_handler.php` - Manage bookings
- `GET/POST /api/admin_listings_handler.php` - Manage listings
- `GET/POST /api/admin_users_handler.php` - Manage users

## Security Notes

### Current Implementation
- Demo admin account (for development only)
- Token-based authentication (stored in localStorage)

### For Production
You should:
1. Move admin credentials to database
2. Implement proper password hashing (bcrypt)
3. Use secure session management
4. Add CSRF tokens
5. Implement role-based access control
6. Add admin activity logging
7. Implement two-factor authentication

## Troubleshooting

### Can't access admin panel
- Check if dev server is running: `npm run dev`
- Verify database connection
- Check browser console for errors

### Forms not submitting
- Verify API endpoints are accessible at `/api/admin_*_handler.php`
- Check CORS headers are properly set
- Verify database tables exist

### Images not uploading
- Ensure `/easy-sakan-react/public/assets/images/` folder exists and is writable
- Check file permissions on server
- Verify upload size limits in PHP config

## Next Steps

1. Run the SQL setup commands above
2. Navigate to `http://localhost:5173/admin/login`
3. Login with demo credentials
4. Start managing your platform!

## Customization

You can customize:
- Admin color scheme (edit root colors in admin.css)
- Sidebar menu items (edit App.jsx and AdminDashboard.jsx)
- Dashboard statistics
- Form fields for each management section
- Validation rules

For questions or modifications, refer to the component files in `src/pages/admin/`.
