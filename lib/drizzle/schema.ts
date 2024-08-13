import { pgEnum, pgTable, text, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum('status', ['active', 'inactive', 'pending', 'deleted']);
export const packageEnum = pgEnum('package', ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
export const roleEnum = pgEnum('role', ['admin', 'sport_center']);

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    username: text('username'),
    password: text('password'),
    phone: varchar('phone', { length: 256 }),
    status: statusEnum('status').default('pending'),
    role: roleEnum('role').default('sport_center'),
    commissionPercentage: text('commission_percentage').default('10'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    deletedAt: timestamp('deleted_at'),
});

export const customers = pgTable('customers', {
    id: uuid('id').primaryKey().defaultRandom(),
    fullName: text('full_name'),
    phone: varchar('phone', { length: 256 }),
    status: statusEnum('status').default('pending'),
    userId: uuid('user_id').references(() => users.id),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    deletedAt: timestamp('deleted_at'),
});

export const notes = pgTable('notes', {
    id: uuid('id').primaryKey().defaultRandom(),
    customerId: uuid('customer_id').references(() => customers.id),
    note: text('note'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    deletedAt: timestamp('deleted_at'),
});

export const packages = pgTable('packages', {
    id: uuid('id').primaryKey().defaultRandom(),
    price: text('price').default('0').notNull(),
    duration: packageEnum('duration').default('1'),
    status: statusEnum('status').default('active'),
    userId: uuid('user_id').references(() => users.id),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    deletedAt: timestamp('deleted_at'),
});

export const invoices = pgTable('invoices', {
    id: uuid('id').primaryKey().defaultRandom(),
    customerId: uuid('customer_id').references(() => customers.id),
    packageName: text('package_name'),
    packageStartDate: timestamp('package_start_date').defaultNow(),
    packageEndDate: timestamp('package_end_date').defaultNow(),
    sportCenterName: text('sport_center_name'),
    sportCenterPrice: text('package_price'),
    commissionPercentage: text('commission_percentage'),
    adminPrice: text('admin_price'),
    createdAt: timestamp('created_at').defaultNow(),
});
