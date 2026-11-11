-- Fictional sample records for Hospital / Clinic System.
BEGIN;
SET LOCAL standard_conforming_strings = on;
INSERT INTO portfolio."patient" ("patient_id", "display_name", "birth_date", "contact_email") VALUES (101, 'Avery Example', '1988-04-12', 'avery.example@example.test');
INSERT INTO portfolio."patient" ("patient_id", "display_name", "birth_date", "contact_email") VALUES (102, 'Morgan Sample', '1975-09-03', 'morgan.sample@example.test');
INSERT INTO portfolio."clinician" ("clinician_id", "full_name", "specialty", "license_code") VALUES (201, 'Taylor Clinician', 'Family Medicine', 'LIC-SYN-201');
INSERT INTO portfolio."clinician" ("clinician_id", "full_name", "specialty", "license_code") VALUES (202, 'Jordan Provider', 'Dermatology', 'LIC-SYN-202');
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "clinician_id", "starts_at", "ends_at", "status") VALUES (301, 101, 201, '2026-12-01T09:00:00+00:00', '2026-12-01T09:30:00+00:00', 'scheduled');
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "clinician_id", "starts_at", "ends_at", "status") VALUES (302, 102, 202, '2026-12-01T10:00:00+00:00', '2026-12-01T10:45:00+00:00', 'scheduled');
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "clinician_id", "starts_at", "ends_at", "status") VALUES (303, 101, 201, '2026-12-02T09:00:00+00:00', '2026-12-02T09:30:00+00:00', 'completed');
COMMIT;
