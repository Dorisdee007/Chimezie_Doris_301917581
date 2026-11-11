-- Run these deliberately invalid statements one at a time, outside a transaction.
-- Each should fail at the named constraint; the sample rows should remain unchanged.

-- 1. patient primary key. Expected: pk_patient, SQLSTATE 23505.
INSERT INTO portfolio."patient" ("patient_id", "display_name", "birth_date", "contact_email")
VALUES (101, 'Duplicate Key Patient', '1990-01-01', 'duplicate.patient.pk@example.test');

-- 2. patient unique. Expected: uq_patient_0, SQLSTATE 23505.
INSERT INTO portfolio."patient" ("patient_id", "display_name", "birth_date", "contact_email")
VALUES (901, 'Duplicate Email Patient', '1990-01-01', 'avery.example@example.test');

-- 3. patient null id. Expected: patient_id, SQLSTATE 23502.
INSERT INTO portfolio."patient" ("patient_id", "display_name", "birth_date", "contact_email")
VALUES (NULL, 'Null ID Patient', '1990-01-01', 'null.id.patient@example.test');

-- 4. patient null name. Expected: display_name, SQLSTATE 23502.
INSERT INTO portfolio."patient" ("patient_id", "display_name", "birth_date", "contact_email")
VALUES (902, NULL, '1990-01-01', 'null.name.patient@example.test');

-- 5. patient null birth date. Expected: birth_date, SQLSTATE 23502.
INSERT INTO portfolio."patient" ("patient_id", "display_name", "birth_date", "contact_email")
VALUES (903, 'Null Birth Date Patient', NULL, 'null.birth.patient@example.test');

-- 6. patient null email. Expected: contact_email, SQLSTATE 23502.
INSERT INTO portfolio."patient" ("patient_id", "display_name", "birth_date", "contact_email")
VALUES (904, 'Null Email Patient', '1990-01-01', NULL);

-- 7. clinician primary key. Expected: pk_clinician, SQLSTATE 23505.
INSERT INTO portfolio."clinician" ("clinician_id", "full_name", "specialty", "license_code")
VALUES (201, 'Duplicate Key Clinician', 'Family Medicine', 'LIC-SYN-903');

-- 8. clinician unique. Expected: uq_clinician_0, SQLSTATE 23505.
INSERT INTO portfolio."clinician" ("clinician_id", "full_name", "specialty", "license_code")
VALUES (905, 'Duplicate License Clinician', 'Family Medicine', 'LIC-SYN-201');

-- 9. clinician null id. Expected: clinician_id, SQLSTATE 23502.
INSERT INTO portfolio."clinician" ("clinician_id", "full_name", "specialty", "license_code")
VALUES (NULL, 'Null ID Clinician', 'Family Medicine', 'LIC-SYN-906');

-- 10. clinician null name. Expected: full_name, SQLSTATE 23502.
INSERT INTO portfolio."clinician" ("clinician_id", "full_name", "specialty", "license_code")
VALUES (907, NULL, 'Family Medicine', 'LIC-SYN-907');

-- 11. clinician null specialty. Expected: specialty, SQLSTATE 23502.
INSERT INTO portfolio."clinician" ("clinician_id", "full_name", "specialty", "license_code")
VALUES (908, 'Null Specialty Clinician', NULL, 'LIC-SYN-908');

-- 12. clinician null license. Expected: license_code, SQLSTATE 23502.
INSERT INTO portfolio."clinician" ("clinician_id", "full_name", "specialty", "license_code")
VALUES (909, 'Null License Clinician', 'Family Medicine', NULL);

-- 13. appointment primary key. Expected: pk_appointment, SQLSTATE 23505.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "clinician_id", "starts_at", "ends_at", "status")
VALUES (301, 102, 202, '2026-12-03T11:00:00+00:00', '2026-12-03T11:30:00+00:00', 'scheduled');

-- 14. appointment unique. Expected: uq_appointment_0, SQLSTATE 23505.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "clinician_id", "starts_at", "ends_at", "status")
VALUES (910, 102, 201, '2026-12-01T09:00:00+00:00', '2026-12-01T09:30:00+00:00', 'scheduled');

-- 15. appointment patient fk. Expected: fk_appointment_0, SQLSTATE 23503.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "clinician_id", "starts_at", "ends_at", "status")
VALUES (911, 9991, 202, '2026-12-03T12:00:00+00:00', '2026-12-03T12:30:00+00:00', 'scheduled');

-- 16. appointment clinician fk. Expected: fk_appointment_1, SQLSTATE 23503.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "clinician_id", "starts_at", "ends_at", "status")
VALUES (912, 101, 9992, '2026-12-03T13:00:00+00:00', '2026-12-03T13:30:00+00:00', 'scheduled');

-- 17. appointment null id. Expected: appointment_id, SQLSTATE 23502.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "clinician_id", "starts_at", "ends_at", "status")
VALUES (NULL, 101, 202, '2026-12-03T14:00:00+00:00', '2026-12-03T14:30:00+00:00', 'scheduled');

-- 18. appointment null patient. Expected: patient_id, SQLSTATE 23502.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "clinician_id", "starts_at", "ends_at", "status")
VALUES (913, NULL, 202, '2026-12-03T15:00:00+00:00', '2026-12-03T15:30:00+00:00', 'scheduled');

-- 19. appointment null clinician. Expected: clinician_id, SQLSTATE 23502.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "clinician_id", "starts_at", "ends_at", "status")
VALUES (914, 101, NULL, '2026-12-03T16:00:00+00:00', '2026-12-03T16:30:00+00:00', 'scheduled');

-- 20. appointment null start. Expected: starts_at, SQLSTATE 23502.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "clinician_id", "starts_at", "ends_at", "status")
VALUES (915, 101, 202, NULL, '2026-12-03T17:30:00+00:00', 'scheduled');

-- 21. appointment null end. Expected: ends_at, SQLSTATE 23502.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "clinician_id", "starts_at", "ends_at", "status")
VALUES (916, 101, 202, '2026-12-03T18:00:00+00:00', NULL, 'scheduled');

-- 22. appointment null status. Expected: status, SQLSTATE 23502.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "clinician_id", "starts_at", "ends_at", "status")
VALUES (917, 101, 202, '2026-12-03T19:00:00+00:00', '2026-12-03T19:30:00+00:00', NULL);

-- 23. appointment time order check. Expected: appointment_time_order, SQLSTATE 23514.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "clinician_id", "starts_at", "ends_at", "status")
VALUES (918, 101, 202, '2026-12-03T20:00:00+00:00', '2026-12-03T19:30:00+00:00', 'scheduled');

-- 24. appointment status check. Expected: appointment_status_check, SQLSTATE 23514.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "clinician_id", "starts_at", "ends_at", "status")
VALUES (919, 101, 202, '2026-12-03T21:00:00+00:00', '2026-12-03T21:30:00+00:00', 'pending');
