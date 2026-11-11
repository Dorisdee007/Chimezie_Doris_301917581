# Hospital / Clinic System — database design

My case study records patient, clinician, appointment.

## Users

- Clinic reception staff
- Clinicians
- Database students

## Main operations

- Register patients and clinicians with unique contact or license details.
- Book and manage appointments while preserving patient and clinician references.
- Benchmark a date-range appointment filter on a fixed synthetic dataset, comparing plans with and without a B-tree index on starts_at.

## Entities

| Entity | Information stored |
| --- | --- |
| patient | Stores a patient's synthetic identity and contact details. |
| clinician | Stores a clinician's synthetic identity, specialty, and license reference. |
| appointment | Stores scheduled appointments and references their patient and clinician. |

## patient

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| patient_id | BIGINT | PK | Yes |
| display_name | TEXT |  | Yes |
| birth_date | DATE |  | Yes |
| contact_email | TEXT | Unique | Yes |
- Unique key: (contact_email).

## clinician

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| clinician_id | BIGINT | PK | Yes |
| full_name | TEXT |  | Yes |
| specialty | TEXT |  | Yes |
| license_code | TEXT | Unique | Yes |
- Unique key: (license_code).

## appointment

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| appointment_id | BIGINT | PK | Yes |
| patient_id | BIGINT | FK | Yes |
| clinician_id | BIGINT | FK | Yes |
| starts_at | TIMESTAMPTZ |  | Yes |
| ends_at | TIMESTAMPTZ |  | Yes |
| status | TEXT |  | Yes |
- patient_id → patient.patient_id
- clinician_id → clinician.clinician_id
- Unique key: (clinician_id, starts_at).

## Relationships and business rules

- Each patient contact email must be unique.
- Each clinician license code must be unique.
- Every appointment must reference an existing patient.
- Every appointment must reference an existing clinician.
- A clinician may have no more than one appointment at a given start timestamp.
- An appointment end timestamp must be later than its start timestamp.
- Appointment status must be one of scheduled, completed, or cancelled.

## Assumptions

- Each appointment has exactly one patient and one clinician.
- An appointment is identified by its start timestamp and clinician for slot-conflict prevention.
- Appointment times use a consistent clinic-local convention for this exercise.
- Student names and IDs are not part of the modeled data.

