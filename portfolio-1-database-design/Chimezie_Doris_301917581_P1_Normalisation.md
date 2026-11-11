# Hospital / Clinic System — normalisation

The example uses the saved sample records. The full set of fields is in the design and schema.

## Starting grouped records

| patient_id | appointment records (list) |
| --- | --- |
| 101 | [301,303] |
| 102 | [302] |


The record IDs are grouped in a list. In 1NF, each record has its own row and each cell holds one value.

## 1NF: one value per cell

| appointment.appointment_id | appointment.patient_id | appointment.clinician_id | appointment.status | patient.patient_id | patient.display_name | clinician.clinician_id | clinician.full_name |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 301 | 101 | 201 | scheduled | 101 | Avery Example | 201 | Taylor Clinician |
| 302 | 102 | 202 | scheduled | 102 | Morgan Sample | 202 | Jordan Provider |
| 303 | 101 | 201 | completed | 101 | Avery Example | 201 | Taylor Clinician |

Key: appointment_id.

## 2NF: depend on the whole key

appointment: clinician_id is a proper part of candidate key (clinician_id, starts_at), and determines clinician details.

## clinician_example

| clinician.clinician_id | clinician.full_name |
| --- | --- |
| 201 | Taylor Clinician |
| 202 | Jordan Provider |

## appointment_example

| appointment.appointment_id | appointment.patient_id | appointment.clinician_id | appointment.status | patient.patient_id | patient.display_name |
| --- | --- | --- | --- | --- | --- |
| 301 | 101 | 201 | scheduled | 101 | Avery Example |
| 302 | 102 | 202 | scheduled | 102 | Morgan Sample |
| 303 | 101 | 201 | completed | 101 | Avery Example |

## 3NF: store each entity’s details once

The entity keys determine their own descriptions. Related records keep foreign keys rather than repeating those descriptions.

## patient

| patient_id | display_name | birth_date | contact_email |
| --- | --- | --- | --- |
| 101 | Avery Example | 1988-04-12 | avery.example@example.test |
| 102 | Morgan Sample | 1975-09-03 | morgan.sample@example.test |

## clinician

| clinician_id | full_name | specialty | license_code |
| --- | --- | --- | --- |
| 201 | Taylor Clinician | Family Medicine | LIC-SYN-201 |
| 202 | Jordan Provider | Dermatology | LIC-SYN-202 |

## appointment

| appointment_id | patient_id | clinician_id | starts_at | ends_at | status |
| --- | --- | --- | --- | --- | --- |
| 301 | 101 | 201 | 2026-12-01T09:00:00+00:00 | 2026-12-01T09:30:00+00:00 | scheduled |
| 302 | 102 | 202 | 2026-12-01T10:00:00+00:00 | 2026-12-01T10:45:00+00:00 | scheduled |
| 303 | 101 | 201 | 2026-12-02T09:00:00+00:00 | 2026-12-02T09:30:00+00:00 | completed |

## Dependencies

- patient: (patient_id) → display_name, birth_date, contact_email
- clinician: (clinician_id) → full_name, specialty, license_code
- appointment: (appointment_id) → patient_id, clinician_id, starts_at, ends_at, status

Joining the decomposed sample tables reproduces the original 3 example rows. The design assumes the declared keys describe the relevant business dependencies.
