# Hospital / Clinic System — ER diagram

```mermaid
erDiagram
    direction LR
    patient {
        bigint patient_id PK
        text display_name
        date birth_date
        text contact_email UK
    }
    clinician {
        bigint clinician_id PK
        text full_name
        text specialty
        text license_code UK
    }
    appointment {
        bigint appointment_id PK
        bigint patient_id FK
        bigint clinician_id FK
        timestamptz starts_at
        timestamptz ends_at
        text status
    }
    patient ||--o{ appointment : "patient_id"
    clinician ||--o{ appointment : "clinician_id"
```

PK identifies a record; FK links to another table; UK marks a single-field unique value. The relationship ends show exactly one, zero or one, or zero or many records. Composite unique keys and conditional rules are listed in the schema and design.

[Diagram image](../images/Chimezie_Doris_301917581_ERDiagram.png)
