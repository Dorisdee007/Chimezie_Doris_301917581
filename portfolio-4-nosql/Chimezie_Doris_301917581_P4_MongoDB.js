// Run once in mongosh against a fresh exercise database.
// These records are fictional events for the case study.
(async function () {
  db = db.getSiblingDB('portfolio_nosql');
  if ((await db.getCollectionNames()).includes("appointment_events")) {
    throw new Error('The exercise collection already exists. Use a fresh database.');
  }

  // The validator checks the stable event fields while details can vary.
  await db.createCollection("appointment_events", {
    validator: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": [
            "_id",
            "schemaVersion",
            "simulation",
            "eventType",
            "occurredAt",
            "source",
            "embedded",
            "references",
            "details"
        ],
        "properties": {
            "_id": {
                "bsonType": "string",
                "minLength": 1
            },
            "schemaVersion": {
                "enum": [
                    1
                ]
            },
            "simulation": {
                "enum": [
                    true
                ]
            },
            "eventType": {
                "bsonType": "string",
                "enum": [
                    "appointment_booked",
                    "appointment_rescheduled"
                ]
            },
            "occurredAt": {
                "bsonType": "date"
            },
            "source": {
                "bsonType": "object",
                "required": [
                    "entity",
                    "key",
                    "snapshot"
                ],
                "properties": {
                    "entity": {
                        "enum": [
                            "appointment"
                        ]
                    },
                    "key": {
                        "bsonType": "object",
                        "required": [
                            "appointment_id"
                        ]
                    },
                    "snapshot": {
                        "bsonType": "object"
                    }
                }
            },
            "embedded": {
                "bsonType": "object"
            },
            "references": {
                "bsonType": "object"
            },
            "details": {
                "bsonType": "object"
            }
        }
    }
},
    validationLevel: 'strict', validationAction: 'error'
  });

  // Insert the four example events and show their IDs.
  printjson(await db.getCollection("appointment_events").insertMany([
    {
        "_id": "event_000001",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "appointment_booked",
        "occurredAt": ISODate("2030-01-01T10:00:00Z"),
        "source": {
            "entity": "appointment",
            "key": {
                "appointment_id": 301
            },
            "snapshot": {
                "appointment_id": 301,
                "patient_id": 101,
                "clinician_id": 201,
                "starts_at": "2026-12-01T09:00:00+00:00",
                "ends_at": "2026-12-01T09:30:00+00:00",
                "status": "scheduled"
            }
        },
        "embedded": {
            "patient": [
                {
                    "key": {
                        "patient_id": 101
                    },
                    "snapshot": {
                        "patient_id": 101,
                        "display_name": "Avery Example",
                        "birth_date": "1988-04-12",
                        "contact_email": "avery.example@example.test"
                    },
                    "via": [
                        "appointment.patient_id → patient"
                    ]
                }
            ],
            "clinician": [
                {
                    "key": {
                        "clinician_id": 201
                    },
                    "snapshot": {
                        "clinician_id": 201,
                        "full_name": "Taylor Clinician",
                        "specialty": "Family Medicine",
                        "license_code": "LIC-SYN-201"
                    },
                    "via": [
                        "appointment.clinician_id → clinician"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000002",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "appointment_rescheduled",
        "occurredAt": ISODate("2030-01-01T10:01:00Z"),
        "source": {
            "entity": "appointment",
            "key": {
                "appointment_id": 301
            },
            "snapshot": {
                "appointment_id": 301,
                "patient_id": 101,
                "clinician_id": 201,
                "starts_at": "2026-12-01T09:00:00+00:00",
                "ends_at": "2026-12-01T09:30:00+00:00",
                "status": "scheduled"
            }
        },
        "embedded": {
            "patient": [
                {
                    "key": {
                        "patient_id": 101
                    },
                    "snapshot": {
                        "patient_id": 101,
                        "display_name": "Avery Example",
                        "birth_date": "1988-04-12",
                        "contact_email": "avery.example@example.test"
                    },
                    "via": [
                        "appointment.patient_id → patient"
                    ]
                }
            ],
            "clinician": [
                {
                    "key": {
                        "clinician_id": 201
                    },
                    "snapshot": {
                        "clinician_id": 201,
                        "full_name": "Taylor Clinician",
                        "specialty": "Family Medicine",
                        "license_code": "LIC-SYN-201"
                    },
                    "via": [
                        "appointment.clinician_id → clinician"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "reason": "illustrative reason",
                "previous_start": "illustrative previous_start",
                "new_start": "illustrative new_start"
            }
        }
    },
    {
        "_id": "event_000003",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "appointment_booked",
        "occurredAt": ISODate("2030-01-01T10:02:00Z"),
        "source": {
            "entity": "appointment",
            "key": {
                "appointment_id": 302
            },
            "snapshot": {
                "appointment_id": 302,
                "patient_id": 102,
                "clinician_id": 202,
                "starts_at": "2026-12-01T10:00:00+00:00",
                "ends_at": "2026-12-01T10:45:00+00:00",
                "status": "scheduled"
            }
        },
        "embedded": {
            "patient": [
                {
                    "key": {
                        "patient_id": 102
                    },
                    "snapshot": {
                        "patient_id": 102,
                        "display_name": "Morgan Sample",
                        "birth_date": "1975-09-03",
                        "contact_email": "morgan.sample@example.test"
                    },
                    "via": [
                        "appointment.patient_id → patient"
                    ]
                }
            ],
            "clinician": [
                {
                    "key": {
                        "clinician_id": 202
                    },
                    "snapshot": {
                        "clinician_id": 202,
                        "full_name": "Jordan Provider",
                        "specialty": "Dermatology",
                        "license_code": "LIC-SYN-202"
                    },
                    "via": [
                        "appointment.clinician_id → clinician"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000004",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "appointment_rescheduled",
        "occurredAt": ISODate("2030-01-01T10:03:00Z"),
        "source": {
            "entity": "appointment",
            "key": {
                "appointment_id": 302
            },
            "snapshot": {
                "appointment_id": 302,
                "patient_id": 102,
                "clinician_id": 202,
                "starts_at": "2026-12-01T10:00:00+00:00",
                "ends_at": "2026-12-01T10:45:00+00:00",
                "status": "scheduled"
            }
        },
        "embedded": {
            "patient": [
                {
                    "key": {
                        "patient_id": 102
                    },
                    "snapshot": {
                        "patient_id": 102,
                        "display_name": "Morgan Sample",
                        "birth_date": "1975-09-03",
                        "contact_email": "morgan.sample@example.test"
                    },
                    "via": [
                        "appointment.patient_id → patient"
                    ]
                }
            ],
            "clinician": [
                {
                    "key": {
                        "clinician_id": 202
                    },
                    "snapshot": {
                        "clinician_id": 202,
                        "full_name": "Jordan Provider",
                        "specialty": "Dermatology",
                        "license_code": "LIC-SYN-202"
                    },
                    "via": [
                        "appointment.clinician_id → clinician"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "reason": "illustrative reason",
                "previous_start": "illustrative previous_start",
                "new_start": "illustrative new_start"
            }
        }
    },
    {
        "_id": "event_000005",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "appointment_booked",
        "occurredAt": ISODate("2030-01-01T10:04:00Z"),
        "source": {
            "entity": "appointment",
            "key": {
                "appointment_id": 303
            },
            "snapshot": {
                "appointment_id": 303,
                "patient_id": 101,
                "clinician_id": 201,
                "starts_at": "2026-12-02T09:00:00+00:00",
                "ends_at": "2026-12-02T09:30:00+00:00",
                "status": "completed"
            }
        },
        "embedded": {
            "patient": [
                {
                    "key": {
                        "patient_id": 101
                    },
                    "snapshot": {
                        "patient_id": 101,
                        "display_name": "Avery Example",
                        "birth_date": "1988-04-12",
                        "contact_email": "avery.example@example.test"
                    },
                    "via": [
                        "appointment.patient_id → patient"
                    ]
                }
            ],
            "clinician": [
                {
                    "key": {
                        "clinician_id": 201
                    },
                    "snapshot": {
                        "clinician_id": 201,
                        "full_name": "Taylor Clinician",
                        "specialty": "Family Medicine",
                        "license_code": "LIC-SYN-201"
                    },
                    "via": [
                        "appointment.clinician_id → clinician"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000006",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "appointment_rescheduled",
        "occurredAt": ISODate("2030-01-01T10:05:00Z"),
        "source": {
            "entity": "appointment",
            "key": {
                "appointment_id": 303
            },
            "snapshot": {
                "appointment_id": 303,
                "patient_id": 101,
                "clinician_id": 201,
                "starts_at": "2026-12-02T09:00:00+00:00",
                "ends_at": "2026-12-02T09:30:00+00:00",
                "status": "completed"
            }
        },
        "embedded": {
            "patient": [
                {
                    "key": {
                        "patient_id": 101
                    },
                    "snapshot": {
                        "patient_id": 101,
                        "display_name": "Avery Example",
                        "birth_date": "1988-04-12",
                        "contact_email": "avery.example@example.test"
                    },
                    "via": [
                        "appointment.patient_id → patient"
                    ]
                }
            ],
            "clinician": [
                {
                    "key": {
                        "clinician_id": 201
                    },
                    "snapshot": {
                        "clinician_id": 201,
                        "full_name": "Taylor Clinician",
                        "specialty": "Family Medicine",
                        "license_code": "LIC-SYN-201"
                    },
                    "via": [
                        "appointment.clinician_id → clinician"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "reason": "illustrative reason",
                "previous_start": "illustrative previous_start",
                "new_start": "illustrative new_start"
            }
        }
    }
]));
  await db.getCollection("appointment_events").createIndex({eventType: 1, occurredAt: -1}, {name: 'event_type_time'});

  // 1. Find the first sample event type (up to five documents).
  printjson(await db.getCollection("appointment_events").find({"eventType":"appointment_booked"}).sort({_id:1}).limit(5).toArray());

  // 2. Find events for the first source record using nested key fields (up to five).
  printjson(await db.getCollection("appointment_events").find({"source.key.appointment_id":301}).sort({_id:1}).limit(5).toArray());

  // 3. Find events in the sample time range using a MongoDB Date filter (up to five).
  printjson(await db.getCollection("appointment_events").find({"occurredAt":{"$gte":ISODate("2030-01-01T10:00:00Z"), "$lt":ISODate("2030-01-01T11:00:00Z")}}).sort({_id:1}).limit(5).toArray());

  // 4. Count documents for each event type.
  printjson(await db.getCollection("appointment_events").aggregate([{"$group":{"_id":"$eventType", "documentCount":{"$sum":1}}}, {"$sort":{"_id":1}}]).toArray());

  // A date stored as text should be rejected by the validator.
  try {
    await db.getCollection("appointment_events").insertOne({...{
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "appointment_booked",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "appointment",
        "key": {
            "appointment_id": 301
        },
        "snapshot": {
            "appointment_id": 301,
            "patient_id": 101,
            "clinician_id": 201,
            "starts_at": "2026-12-01T09:00:00+00:00",
            "ends_at": "2026-12-01T09:30:00+00:00",
            "status": "scheduled"
        }
    },
    "embedded": {
        "patient": [
            {
                "key": {
                    "patient_id": 101
                },
                "snapshot": {
                    "patient_id": 101,
                    "display_name": "Avery Example",
                    "birth_date": "1988-04-12",
                    "contact_email": "avery.example@example.test"
                },
                "via": [
                    "appointment.patient_id → patient"
                ]
            }
        ],
        "clinician": [
            {
                "key": {
                    "clinician_id": 201
                },
                "snapshot": {
                    "clinician_id": 201,
                    "full_name": "Taylor Clinician",
                    "specialty": "Family Medicine",
                    "license_code": "LIC-SYN-201"
                },
                "via": [
                    "appointment.clinician_id → clinician"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}, _id: 'invalid_date_example', occurredAt: 'not-a-date'});
  } catch (error) { print('Invalid date error: ' + error.code); }

  // Reusing an event ID should be rejected by the unique _id index.
  try { await db.getCollection("appointment_events").insertOne({
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "appointment_booked",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "appointment",
        "key": {
            "appointment_id": 301
        },
        "snapshot": {
            "appointment_id": 301,
            "patient_id": 101,
            "clinician_id": 201,
            "starts_at": "2026-12-01T09:00:00+00:00",
            "ends_at": "2026-12-01T09:30:00+00:00",
            "status": "scheduled"
        }
    },
    "embedded": {
        "patient": [
            {
                "key": {
                    "patient_id": 101
                },
                "snapshot": {
                    "patient_id": 101,
                    "display_name": "Avery Example",
                    "birth_date": "1988-04-12",
                    "contact_email": "avery.example@example.test"
                },
                "via": [
                    "appointment.patient_id → patient"
                ]
            }
        ],
        "clinician": [
            {
                "key": {
                    "clinician_id": 201
                },
                "snapshot": {
                    "clinician_id": 201,
                    "full_name": "Taylor Clinician",
                    "specialty": "Family Medicine",
                    "license_code": "LIC-SYN-201"
                },
                "via": [
                    "appointment.clinician_id → clinician"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}); }
  catch (error) { print('Duplicate ID error: ' + error.code); }

  print('Document count: ' + await db.getCollection("appointment_events").countDocuments());
})().catch(error => { print(error.stack || String(error)); quit(1); });
