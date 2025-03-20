CREATE TABLE `entity` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text,
	`desc` text,
	`phoneNumber` text,
	`note` text,
	`createdAt` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `titleIndex` ON `entity` (`title`);