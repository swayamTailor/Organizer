# Database Schema Documentation

## Entity Relationship Diagram (Conceptual)

```
User (Django Built-in)
  ├── 1 ----------- 1 UserProfile
  ├── 1 ----------- * Booking
  ├── 1 ----------- * Event (as organizer)
  └── 1 ----------- * Payment (through Booking)

Event
  ├── * ----------- 1 Category
  ├── * ----------- 1 User (organizer)
  ├── 1 ----------- * Booking
  ├── 1 ----------- * EventImage
  └── 1 ----------- * Payment (through Booking)

Booking
  ├── * ----------- 1 User
  ├── * ----------- 1 Event
  ├── 1 ----------- 1 Attendee
  └── 1 ----------- 1 Payment

Payment
  ├── 1 ----------- 1 Booking
  ├── 1 ----------- * PaymentHistory
  └── 1 ----------- 1 Refund

Category
  └── 1 ----------- * Event
```

---

## Table Schemas

### 1. UserProfile

Extends Django's built-in `auth_user` with additional profile information.

```sql
CREATE TABLE user_profiles (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL UNIQUE,
  role VARCHAR(20) NOT NULL DEFAULT 'user',
  phone VARCHAR(15),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  postal_code VARCHAR(10),
  profile_picture VARCHAR(255),
  bio TEXT,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES auth_user(id),
  INDEX (role),
  INDEX (created_at)
);
```

**Fields:**
- `id` - Primary key
- `user_id` - Foreign key to Django User model
- `role` - User role: 'user', 'admin', 'organizer'
- `phone` - Contact phone number
- `address` - Street address
- `city` - City name
- `state` - State/province
- `postal_code` - Postal/ZIP code
- `profile_picture` - Path to profile image
- `bio` - User biography
- `created_at` - Account creation timestamp
- `updated_at` - Last update timestamp

---

### 2. Category

Event categories for classification.

```sql
CREATE TABLE categories (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  created_at DATETIME NOT NULL,
  INDEX (name)
);
```

**Fields:**
- `id` - Primary key
- `name` - Category name (e.g., "Technology", "Sports")
- `description` - Category description
- `icon` - Icon name/reference
- `created_at` - Creation timestamp

---

### 3. Event

Main events table with all event details.

```sql
CREATE TABLE events (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description LONGTEXT NOT NULL,
  category_id BIGINT,
  organizer_id INT NOT NULL,
  location VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  latitude FLOAT,
  longitude FLOAT,
  start_date DATETIME NOT NULL,
  end_date DATETIME NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  capacity INT NOT NULL,
  current_attendees INT DEFAULT 0,
  image VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'upcoming',
  is_featured BOOLEAN DEFAULT FALSE,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (organizer_id) REFERENCES auth_user(id),
  INDEX (status, start_date),
  INDEX (category_id, start_date),
  INDEX (organizer_id)
);
```

**Fields:**
- `id` - Primary key
- `title` - Event title
- `description` - Detailed event description
- `category_id` - Foreign key to Category
- `organizer_id` - Foreign key to User (event organizer)
- `location` - Event location/venue
- `city` - City where event is held
- `state` - State where event is held
- `latitude` - Venue latitude
- `longitude` - Venue longitude
- `start_date` - Event start date/time
- `end_date` - Event end date/time
- `price` - Ticket price
- `capacity` - Maximum number of attendees
- `current_attendees` - Current booking count
- `image` - Main event image
- `status` - Event status (upcoming, ongoing, completed, cancelled)
- `is_featured` - Whether event is featured on homepage
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

---

### 4. EventImage

Additional images for events (gallery).

```sql
CREATE TABLE event_images (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  event_id BIGINT NOT NULL,
  image VARCHAR(255) NOT NULL,
  uploaded_at DATETIME NOT NULL,
  FOREIGN KEY (event_id) REFERENCES events(id),
  INDEX (event_id, uploaded_at)
);
```

**Fields:**
- `id` - Primary key
- `event_id` - Foreign key to Event
- `image` - Path to image file
- `uploaded_at` - Upload timestamp

---

### 5. Booking

User bookings for events.

```sql
CREATE TABLE bookings (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  event_id BIGINT NOT NULL,
  number_of_tickets INT DEFAULT 1,
  total_price DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  booking_date DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  notes TEXT,
  FOREIGN KEY (user_id) REFERENCES auth_user(id),
  FOREIGN KEY (event_id) REFERENCES events(id),
  UNIQUE KEY (user_id, event_id),
  INDEX (status, booking_date),
  INDEX (event_id)
);
```

**Fields:**
- `id` - Primary key
- `user_id` - Foreign key to User
- `event_id` - Foreign key to Event
- `number_of_tickets` - Number of tickets booked
- `total_price` - Total booking price
- `status` - Booking status (pending, confirmed, cancelled, completed)
- `booking_date` - Booking creation timestamp
- `updated_at` - Last update timestamp
- `notes` - Additional booking notes
- **Constraint**: One booking per user per event

---

### 6. Attendee

Attendee information with ticket numbers.

```sql
CREATE TABLE attendees (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  booking_id BIGINT NOT NULL UNIQUE,
  ticket_number VARCHAR(50) NOT NULL UNIQUE,
  checked_in BOOLEAN DEFAULT FALSE,
  checked_in_at DATETIME,
  FOREIGN KEY (booking_id) REFERENCES bookings(id)
);
```

**Fields:**
- `id` - Primary key
- `booking_id` - Foreign key to Booking (1-to-1)
- `ticket_number` - Unique ticket identifier
- `checked_in` - Whether attendee has checked in
- `checked_in_at` - Check-in timestamp

---

### 7. Payment

Payment records for bookings.

```sql
CREATE TABLE payments (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  booking_id BIGINT NOT NULL UNIQUE,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  payment_method VARCHAR(20) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  transaction_id VARCHAR(255) UNIQUE,
  stripe_payment_intent_id VARCHAR(255),
  paid_at DATETIME,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  notes TEXT,
  FOREIGN KEY (booking_id) REFERENCES bookings(id),
  INDEX (status, created_at),
  INDEX (transaction_id)
);
```

**Fields:**
- `id` - Primary key
- `booking_id` - Foreign key to Booking (1-to-1)
- `amount` - Payment amount
- `currency` - Currency code (e.g., USD, EUR)
- `payment_method` - Payment method (stripe, paypal, card, upi)
- `status` - Payment status (pending, processing, completed, failed, refunded)
- `transaction_id` - External transaction ID
- `stripe_payment_intent_id` - Stripe payment intent ID
- `paid_at` - Payment completion timestamp
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp
- `notes` - Additional notes

---

### 8. PaymentHistory

Audit trail for payment status changes.

```sql
CREATE TABLE payment_history (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  payment_id BIGINT NOT NULL,
  old_status VARCHAR(20) NOT NULL,
  new_status VARCHAR(20) NOT NULL,
  reason TEXT,
  created_at DATETIME NOT NULL,
  FOREIGN KEY (payment_id) REFERENCES payments(id),
  INDEX (payment_id, created_at)
);
```

**Fields:**
- `id` - Primary key
- `payment_id` - Foreign key to Payment
- `old_status` - Previous status
- `new_status` - New status
- `reason` - Reason for status change
- `created_at` - Change timestamp

---

### 9. Refund

Refund requests and records.

```sql
CREATE TABLE refunds (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  payment_id BIGINT NOT NULL UNIQUE,
  amount DECIMAL(10, 2) NOT NULL,
  reason VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  refund_transaction_id VARCHAR(255),
  requested_at DATETIME NOT NULL,
  completed_at DATETIME,
  notes TEXT,
  FOREIGN KEY (payment_id) REFERENCES payments(id),
  INDEX (status, requested_at)
);
```

**Fields:**
- `id` - Primary key
- `payment_id` - Foreign key to Payment (1-to-1)
- `amount` - Refund amount
- `reason` - Refund reason (cancelled_event, user_request, duplicate_payment, system_error, other)
- `status` - Refund status (pending, processing, completed, failed)
- `refund_transaction_id` - External refund transaction ID
- `requested_at` - Refund request timestamp
- `completed_at` - Refund completion timestamp
- `notes` - Additional notes

---

## Relationships Summary

| Table | Related Table | Type | Constraint |
|-------|---------------|------|-----------|
| UserProfile | User | 1-to-1 | ON DELETE CASCADE |
| Event | User | Many-to-1 | Foreign key (organizer) |
| Event | Category | Many-to-1 | Foreign key |
| EventImage | Event | Many-to-1 | Foreign key |
| Booking | User | Many-to-1 | Foreign key |
| Booking | Event | Many-to-1 | Foreign key |
| Attendee | Booking | 1-to-1 | Foreign key, UNIQUE |
| Payment | Booking | 1-to-1 | Foreign key, UNIQUE |
| PaymentHistory | Payment | Many-to-1 | Foreign key |
| Refund | Payment | 1-to-1 | Foreign key, UNIQUE |

---

## Indexes (Performance)

Indexes help queries execute faster:

```sql
-- Events
CREATE INDEX idx_events_status_date ON events(status, start_date);
CREATE INDEX idx_events_category_date ON events(category_id, start_date);
CREATE INDEX idx_events_organizer ON events(organizer_id);

-- Bookings
CREATE INDEX idx_bookings_status_date ON bookings(status, booking_date);
CREATE INDEX idx_bookings_event ON bookings(event_id);

-- Payments
CREATE INDEX idx_payments_status_date ON payments(status, created_at);
CREATE INDEX idx_payments_transaction ON payments(transaction_id);

-- UserProfile
CREATE INDEX idx_profile_role ON user_profiles(role);
CREATE INDEX idx_profile_created ON user_profiles(created_at);
```

---

## Database Constraints

### Primary Keys
All tables have auto-incrementing `id` as primary key.

### Foreign Keys
All foreign keys have `ON DELETE CASCADE` to maintain referential integrity.

### Unique Constraints
- `UserProfile.user_id` - One profile per user
- `Category.name` - Category names are unique
- `Booking (user_id, event_id)` - One booking per user per event
- `Attendee.booking_id` - One attendee per booking
- `Attendee.ticket_number` - Ticket numbers are unique
- `Payment.booking_id` - One payment per booking
- `Payment.transaction_id` - Transaction IDs are unique
- `Refund.payment_id` - One refund per payment

---

## Typical Data Flows

### User Registration
1. User created in `auth_user`
2. `UserProfile` automatically created with default role='user'

### Event Creation
1. Event inserted into `events` table
2. Organizer is the logged-in user

### Booking Creation
1. Booking inserted into `bookings` table
2. `current_attendees` in Event incremented
3. `Attendee` created with unique ticket number

### Payment Processing
1. Payment created in `pending` status
2. Payment processed (Stripe)
3. Payment status updated to `completed`
4. `PaymentHistory` records the change
5. Related Booking status updated to `confirmed`

### Refund Processing
1. Refund created in `pending` status
2. Refund processed
3. Refund status updated to `completed`
4. Payment status updated to `refunded`
5. `PaymentHistory` records the change

---

## Query Examples

### Get all bookings for an event
```sql
SELECT b.* FROM bookings b
WHERE b.event_id = 1
ORDER BY b.booking_date DESC;
```

### Get user's booking history with event details
```sql
SELECT b.*, e.title, e.start_date, p.status as payment_status
FROM bookings b
JOIN events e ON b.event_id = e.id
LEFT JOIN payments p ON b.id = p.booking_id
WHERE b.user_id = 1
ORDER BY b.booking_date DESC;
```

### Get upcoming events by category
```sql
SELECT e.* FROM events e
WHERE e.category_id = 1
AND e.start_date > NOW()
AND e.status = 'upcoming'
ORDER BY e.start_date ASC;
```

### Get payment statistics
```sql
SELECT 
  e.id, e.title,
  COUNT(p.id) as total_payments,
  SUM(p.amount) as total_revenue,
  SUM(CASE WHEN p.status = 'completed' THEN p.amount ELSE 0 END) as completed_revenue
FROM events e
LEFT JOIN bookings b ON e.id = b.event_id
LEFT JOIN payments p ON b.id = p.booking_id
GROUP BY e.id, e.title
ORDER BY completed_revenue DESC;
```

---

## Backup & Recovery

### Create Backup
```bash
mysqldump -u root -p ems_db > ems_db_backup.sql
```

### Restore from Backup
```bash
mysql -u root -p ems_db < ems_db_backup.sql
```

---

## Database Optimization Tips

1. **Add indexes** on frequently filtered columns
2. **Denormalize** read-heavy tables (e.g., cache event price in Payment)
3. **Partition large tables** by date (e.g., Payments by year)
4. **Archive old data** (events older than 2 years)
5. **Use connection pooling** in production
6. **Monitor query performance** with slow query logs
