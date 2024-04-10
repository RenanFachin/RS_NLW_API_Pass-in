-- DropForeignKey
ALTER TABLE "check_ins" DROP CONSTRAINT "check_ins_attendee_id_fkey";

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_attendee_id_fkey" FOREIGN KEY ("attendee_id") REFERENCES "attendees"("id") ON DELETE CASCADE ON UPDATE CASCADE;
