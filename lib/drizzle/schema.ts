import { pgEnum, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
export const statusEnum = pgEnum('status', ['active', 'inactive', 'pending']);
export const packageEnum = pgEnum('package', ['1','2','3','4','5','6','7','8','9','10','11','12']);
export const roleEnum = pgEnum('role', ['admin', 'sport_center']);

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    username: text('username'),
    password: text('password'),
    phone: varchar('phone', { length: 256 }),
    status: statusEnum('status').default('pending'),
    role: roleEnum('role').default('sport_center'),
});

export const customers = pgTable('customers', {
  id: uuid('id').primaryKey().defaultRandom(),
  fullName: text('full_name'),
  phone: varchar('phone', { length: 256 }),
  package: packageEnum('package').default('1'),
  status: statusEnum('status').default('pending'),
  userId: uuid('user_id').references(() => users.id),
});

export const notes = pgTable('notes', {
    id: uuid('id').primaryKey().defaultRandom(),
    customerId: uuid('customer_id').references(() => customers.id),
    note: text('note'),
});
