# Hospital / Clinic System — SQL queries

## 1. Show related appointment, patient, clinician records (up to 20).

```sql
SELECT t0."appointment_id" AS "appointment_appointment_id",
       t0."starts_at" AS "appointment_starts_at",
       t1."patient_id" AS "patient_patient_id",
       t1."display_name" AS "patient_display_name",
       t2."clinician_id" AS "clinician_clinician_id",
       t2."full_name" AS "clinician_full_name"
FROM portfolio."appointment" t0
JOIN portfolio."patient" t1 ON t0."patient_id" = t1."patient_id"
JOIN portfolio."clinician" t2 ON t0."clinician_id" = t2."clinician_id"
ORDER BY t0."appointment_id", t1."patient_id", t2."clinician_id"
LIMIT 20;
```

| appointment_appointment_id | appointment_starts_at | patient_patient_id | patient_display_name | clinician_clinician_id | clinician_full_name |
| --- | --- | --- | --- | --- | --- |
| 301 | 2026-12-01T09:00:00+00:00 | 101 | Avery Example | 201 | Taylor Clinician |
| 302 | 2026-12-01T10:00:00+00:00 | 102 | Morgan Sample | 202 | Jordan Provider |
| 303 | 2026-12-02T09:00:00+00:00 | 101 | Avery Example | 201 | Taylor Clinician |

## 2. Find appointment records where starts_at matches "2026-12-01T09:00:00+00:00" (up to 20).

```sql
SELECT * FROM portfolio."appointment"
WHERE "starts_at" IS NOT DISTINCT FROM '2026-12-01T09:00:00+00:00'
ORDER BY "appointment_id"
LIMIT 20;
```

| appointment_id | patient_id | clinician_id | starts_at | ends_at | status |
| --- | --- | --- | --- | --- | --- |
| 301 | 101 | 201 | 2026-12-01T09:00:00+00:00 | 2026-12-01T09:30:00+00:00 | scheduled |

## 3. Count appointment records for each patient_id (up to 20 groups).

```sql
SELECT "patient_id", count(*) AS record_count
FROM portfolio."appointment"
GROUP BY "patient_id"
ORDER BY record_count DESC, "patient_id" NULLS LAST
LIMIT 20;
```

| patient_id | record_count |
| --- | --- |
| 101 | 2 |
| 102 | 1 |


## Index comparison

| Phase | Median (ms) | Three runs (ms) | Plan nodes | Buffer hits |
| --- | --- | --- | --- | --- |
| Before index | 1.018 | 1.221, 1.018, 0.993 | Sort → Seq Scan | 112 |
| After index | 0.188 | 0.232, 0.188, 0.181 | Sort → Bitmap Heap Scan → Bitmap Index Scan | 25 |

The median execution time changed from 1.018 ms to 0.188 ms. The measured plan used p2_filter_idx. The results matched in both phases. An index adds storage and write-maintenance costs; timings depend on the selected lookup and environment.

## Execution plans

### Before index, run 1

```text
Sort (actual time=1.188..1.19 rows=20 loops=1)
  Seq Scan on appointment (actual time=0.016..1.153 rows=20 loops=1)
Planning Time: 0.402 ms
Execution Time: 1.221 ms
```

### Before index, run 2

```text
Sort (actual time=0.994..0.995 rows=20 loops=1)
  Seq Scan on appointment (actual time=0.016..0.96 rows=20 loops=1)
Planning Time: 0.36 ms
Execution Time: 1.018 ms
```

### Before index, run 3

```text
Sort (actual time=0.969..0.971 rows=20 loops=1)
  Seq Scan on appointment (actual time=0.016..0.935 rows=20 loops=1)
Planning Time: 0.365 ms
Execution Time: 0.993 ms
```

### After index, run 1

```text
Sort (actual time=0.167..0.17 rows=20 loops=1)
  Bitmap Heap Scan on appointment (actual time=0.037..0.123 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.018..0.019 rows=20 loops=1)
Planning Time: 0.782 ms
Execution Time: 0.232 ms
```

### After index, run 2

```text
Sort (actual time=0.136..0.137 rows=20 loops=1)
  Bitmap Heap Scan on appointment (actual time=0.028..0.1 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.015..0.015 rows=20 loops=1)
Planning Time: 0.587 ms
Execution Time: 0.188 ms
```

### After index, run 3

```text
Sort (actual time=0.131..0.133 rows=20 loops=1)
  Bitmap Heap Scan on appointment (actual time=0.028..0.097 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.015..0.015 rows=20 loops=1)
Planning Time: 0.555 ms
Execution Time: 0.181 ms
```

## Reproduce

Use a fresh database with the Portfolio 1 schema and sample data. Run Chimezie_Doris_301917581_P2_Queries.sql, then Chimezie_Doris_301917581_P2_Optimisation.sql. The optimisation script creates a separate performance table and runs EXPLAIN (ANALYZE, BUFFERS).

[Query screenshot](screenshots/Chimezie_Doris_301917581_P2_QueryResults.png) · [Index comparison](screenshots/Chimezie_Doris_301917581_P2_IndexComparison.png)

## References

- [PostgreSQL — EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)

