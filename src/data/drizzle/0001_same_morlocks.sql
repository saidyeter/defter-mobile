CREATE TABLE `transaction` (
	`id` integer PRIMARY KEY NOT NULL,
	`entityId` integer,
	`amount` real,
	`type` text,
	`note` text,
	`createdAt` integer DEFAULT (CURRENT_TIMESTAMP),
	`updatedAt` integer DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_entity` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text,
	`desc` text,
	`phoneNumber` text,
	`note` text,
	`createdAt` integer DEFAULT (CURRENT_TIMESTAMP),
	`updatedAt` integer DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
INSERT INTO `__new_entity`("id", "title", "desc", "phoneNumber", "note", "createdAt", "updatedAt") SELECT "id", "title", "desc", "phoneNumber", "note", "createdAt", "updatedAt" FROM `entity`;--> statement-breakpoint
DROP TABLE `entity`;--> statement-breakpoint
ALTER TABLE `__new_entity` RENAME TO `entity`;--> statement-breakpoint
PRAGMA foreign_keys=ON;