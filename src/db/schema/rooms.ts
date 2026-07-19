import { integer, varchar, date, pgTable, numeric, pgEnum, timestamp, check } from 'drizzle-orm/pg-core'
import { defineRelations, sql } from 'drizzle-orm'



export const roomTypeEnum = pgEnum('roomType', [
  'Deluxe',
  'Double Deluxe',
  'Executive',
  'Executive Studio',
  'Saphire',
  'Pearl',
  'Ruby Suite',
  'Emerald',
  'Penthouse',
  'Ruby Studio',
  'Diamond',
  'Blue Diamond'
])

export const room = pgTable('room', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: roomTypeEnum(),
  price: numeric({ precision: 19, scale: 2 })
})

const bookingStatusEnum = pgEnum('bookingStatus', ['confirmed', 'cancelled', 'pending'])

export const roomBooking = pgTable('room_booking', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  roomId: integer('room_id').references(() => room.id),
  phoneNumber: varchar({ length: 255 }).notNull(),
  checkInDate: date(),
  checkOutDate: date(),
  depositAmount: numeric({ precision: 19, scale: 2 }),
  status: bookingStatusEnum(),
  bookedBy: varchar({ length: 255 }),
  confirmedBy: varchar({ length: 255 }),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow()
}, (table) => [
  check('checkin_range', sql`${table.checkOutDate} > ${table.checkInDate}`)
])

export const relations = defineRelations({room, roomBooking}, (r) => ({
  roomBooking : {
    booking: r.one.room({
      from: r.roomBooking.roomId,
      to: r.room.id
    })
  }
}))