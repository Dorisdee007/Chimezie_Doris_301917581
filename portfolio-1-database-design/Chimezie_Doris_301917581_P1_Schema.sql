-- Hospital / Clinic System: tables, keys and business constraints.
-- Run once in a fresh PostgreSQL database.
BEGIN;
SET LOCAL standard_conforming_strings = on;
CREATE SCHEMA portfolio;
CREATE TABLE portfolio."patient" (
  "patient_id" bigint NOT NULL,
  "display_name" text NOT NULL,
  "birth_date" date NOT NULL,
  "contact_email" text NOT NULL,
  CONSTRAINT "pk_patient" PRIMARY KEY ("patient_id"),
  CONSTRAINT "uq_patient_0" UNIQUE ("contact_email")
);
CREATE TABLE portfolio."clinician" (
  "clinician_id" bigint NOT NULL,
  "full_name" text NOT NULL,
  "specialty" text NOT NULL,
  "license_code" text NOT NULL,
  CONSTRAINT "pk_clinician" PRIMARY KEY ("clinician_id"),
  CONSTRAINT "uq_clinician_0" UNIQUE ("license_code")
);
CREATE TABLE portfolio."appointment" (
  "appointment_id" bigint NOT NULL,
  "patient_id" bigint NOT NULL,
  "clinician_id" bigint NOT NULL,
  "starts_at" timestamptz NOT NULL,
  "ends_at" timestamptz NOT NULL,
  "status" text NOT NULL,
  CONSTRAINT "pk_appointment" PRIMARY KEY ("appointment_id"),
  CONSTRAINT "uq_appointment_0" UNIQUE ("clinician_id", "starts_at")
);
ALTER TABLE portfolio."appointment" ADD CONSTRAINT "fk_appointment_0" FOREIGN KEY ("patient_id") REFERENCES portfolio."patient" ("patient_id");
ALTER TABLE portfolio."appointment" ADD CONSTRAINT "fk_appointment_1" FOREIGN KEY ("clinician_id") REFERENCES portfolio."clinician" ("clinician_id");
ALTER TABLE portfolio."appointment" ADD CONSTRAINT "appointment_time_order" CHECK ("ends_at" > "starts_at");
ALTER TABLE portfolio."appointment" ADD CONSTRAINT "appointment_status_check" CHECK (("status" = 'scheduled') OR ("status" = 'completed') OR ("status" = 'cancelled'));
COMMIT;
