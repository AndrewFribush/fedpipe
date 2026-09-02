# OpenAPI Spec

Source: https://openpaymentsdata.cms.gov/api/1?authentication=false

---

```json
{
  "components": {
    "parameters": {
      "datasetUuid": {
        "description": "A dataset identifier",
        "example": "23160558-6742-54ff-8b9f-cac7d514ff4e",
        "in": "path",
        "name": "identifier",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      "datastoreDatasetUuid": {
        "description": "A dataset ID",
        "example": "23160558-6742-54ff-8b9f-cac7d514ff4e",
        "in": "path",
        "name": "datasetId",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      "datastoreDistributionIndex": {
        "description": "The index of a distribution in a dataset's distribution array. For instance, the first distribution in a dataset would have an index of \"0,\" the second would have \"1\", etc.",
        "example": "0",
        "in": "path",
        "name": "index",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      "datastoreDistributionUuid": {
        "description": "A distribution ID",
        "example": "004e1f11-aa67-5b16-943d-1fe1044b3512",
        "in": "path",
        "name": "distributionId",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      "datastoreQueryCount": {
        "explode": true,
        "in": "query",
        "name": "count",
        "schema": {
          "$ref": "#/components/schemas/datastoreQuery/properties/count"
        },
        "style": "deepObject"
      },
      "datastoreQueryFormat": {
        "explode": true,
        "in": "query",
        "name": "format",
        "schema": {
          "$ref": "#/components/schemas/datastoreQuery/properties/format"
        },
        "style": "deepObject"
      },
      "datastoreQueryKeys": {
        "explode": true,
        "in": "query",
        "name": "keys",
        "schema": {
          "$ref": "#/components/schemas/datastoreQuery/properties/keys"
        },
        "style": "deepObject"
      },
      "datastoreQueryLimit": {
        "explode": true,
        "in": "query",
        "name": "limit",
        "schema": {
          "$ref": "#/components/schemas/datastoreQuery/properties/limit"
        },
        "style": "deepObject"
      },
      "datastoreQueryOffset": {
        "explode": true,
        "in": "query",
        "name": "offset",
        "schema": {
          "$ref": "#/components/schemas/datastoreQuery/properties/offset"
        },
        "style": "deepObject"
      },
      "datastoreQueryResults": {
        "explode": true,
        "in": "query",
        "name": "results",
        "schema": {
          "$ref": "#/components/schemas/datastoreQuery/properties/results"
        },
        "style": "deepObject"
      },
      "datastoreQueryRowIds": {
        "explode": true,
        "in": "query",
        "name": "rowIds",
        "schema": {
          "$ref": "#/components/schemas/datastoreQuery/properties/rowIds"
        },
        "style": "deepObject"
      },
      "datastoreQuerySchema": {
        "explode": true,
        "in": "query",
        "name": "schema",
        "schema": {
          "$ref": "#/components/schemas/datastoreQuery/properties/schema"
        },
        "style": "deepObject"
      },
      "datastoreUuid": {
        "description": "A datastore id. Note: there is an inconsistency in this API that will be addressed in the future: The expected format is different from the format supplied in /api/1/datastore/imports.",
        "example": "00000000000000000000000000000000__0000000000__source",
        "in": "path",
        "name": "identifier",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      "exampleUuid": {
        "description": "A dataset identifier",
        "example": "23160558-6742-54ff-8b9f-cac7d514ff4e",
        "in": "path",
        "name": "identifier",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      "harvestPlanId": {
        "description": "A harvest plan identifier",
        "example": "PAYMENT",
        "in": "path",
        "name": "plan_id",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      "harvestPlanIdQuery": {
        "description": "A harvest plan identifier",
        "example": "PAYMENT",
        "in": "query",
        "name": "plan",
        "required": true,
        "schema": {
          "type": "string"
        },
        "style": "form"
      },
      "harvestRunId": {
        "description": "A harvest run identifier",
        "example": "HARVEST-RUN-ID",
        "in": "path",
        "name": "run_id",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      "schemaId": {
        "allowEmptyValue": false,
        "description": "The name a of a specific schema. For instance, \"dataset.\"",
        "examples": {
          "data-dictionary": {
            "value": "data-dictionary"
          },
          "dataset": {
            "value": "dataset"
          },
          "distribution": {
            "value": "distribution"
          },
          "keyword": {
            "value": "keyword"
          },
          "publisher": {
            "value": "publisher"
          },
          "theme": {
            "value": "theme"
          }
        },
        "in": "path",
        "name": "schema_id",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      "showReferenceIds": {
        "allowEmptyValue": true,
        "description": "Metastore objects often include references to other objects stored in other schemas. These references are usually hidden in responses. Some identifiers are necessary to work with other API endpoints (e.g. datastore endpoints may require the distribution identifier). Add `?show-reference-ids` to show the identifiers generated by DKAN.",
        "in": "query",
        "name": "show-reference-ids",
        "schema": {
          "default": false,
          "type": "boolean"
        },
        "style": "form"
      }
    },
    "responses": {
      "200DatastoreCsvOk": {
        "content": {
          "text/csv": {
            "schema": {
              "type": "string"
            }
          }
        },
        "description": "Ok, CSV successfully generated."
      },
      "200JsonOrCsvQueryOk": {
        "content": {
          "application/json": {
            "schema": {
              "properties": {
                "count": {
                  "type": "integer"
                },
                "query": {
                  "type": "object"
                },
                "results": {
                  "items": {
                    "type": "object"
                  },
                  "type": "array"
                },
                "schema": {
                  "description": "Schema of all resources queries, keyed by ID.",
                  "type": "object"
                }
              },
              "type": "object"
            }
          },
          "text/csv": {
            "schema": {
              "type": "string"
            }
          }
        },
        "description": "Ok. JSON or CSV datastore response, depending on query."
      },
      "200MetadataUpdated": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/metastoreWriteResponse"
            }
          }
        },
        "description": "Metadata update successful."
      },
      "201MetadataCreated": {
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/metastoreWriteResponse"
            }
          }
        },
        "description": "Metadata creation successful."
      },
      "400BadJson": {
        "content": {
          "application/json": {
            "example": {
              "data": {
                "keyword": "type",
                "message": "The attribute expected to be of type ''object'' but 'array' given.",
                "pointer": "path/to/invalid/json/property"
              },
              "message": "JSON Schema validation failed.",
              "status": 400,
              "timestamp": "2021-06-14T13:46:06+00:00"
            },
            "schema": {
              "$ref": "#/components/schemas/errorResponse"
            }
          }
        },
        "description": "Bad request, usually JSON schema validation failure."
      },
      "404IdNotFound": {
        "content": {
          "application/json": {
            "example": {
              "message": "Error retrieving metadata: 00000000-0000-0000-0000-000000000000 not found.",
              "status": 404,
              "timestamp": "2021-06-14T13:46:06+00:00"
            },
            "schema": {
              "$ref": "#/components/schemas/errorResponse"
            }
          }
        },
        "description": "Not found, usually due to incorrect identifier."
      },
      "404MetadataObjectNotFound": {
        "content": {
          "application/json": {
            "example": {
              "message": "No data with the identifier 00000000-0000-0000-0000-000000000000 was found.",
              "status": 404,
              "timestamp": "2021-06-14T13:46:06+00:00"
            },
            "schema": {
              "$ref": "#/components/schemas/errorResponse"
            }
          }
        },
        "description": "Missing object, usually due to incorrect identifier."
      },
      "409MetadataAlreadyExists": {
        "content": {
          "application/json": {
            "example": {
              "message": "dataset/00000000-0000-0000-0000-000000000000 already exists.",
              "status": 409,
              "timestamp": "2021-06-14T13:46:06+00:00"
            },
            "schema": {
              "$ref": "#/components/schemas/errorResponse"
            }
          }
        },
        "description": "Conflict; tried to create a record using an existing ID, or metadata contains identifier that doesn't match the request path."
      },
      "503ServiceUnavailable": {
        "content": {
          "application/json": {
            "schema": {
              "properties": {
                "message": {
                  "description": "Human-readable error message",
                  "example": "Datastore queries are temporarily limited due to high server load. Remove conditions, joins, groupings, sorts, and offsets to retry.",
                  "type": "string"
                }
              },
              "required": [
                "message"
              ],
              "type": "object"
            }
          }
        },
        "description": "Service unavailable. Datastore queries are temporarily limited due to high server load.",
        "headers": {
          "Retry-After": {
            "description": "Seconds to tell client to wait until retrying",
            "example": 120,
            "schema": {
              "type": "integer"
            }
          }
        }
      }
    },
    "schemas": {
      "dataset": {
        "description": "The metadata format for all federal open data. Validates a single JSON object entry (as opposed to entire Data.json catalog).",
        "properties": {
          "@type": {
            "default": "dcat:Dataset",
            "description": "IRI for the JSON-LD data type. This should be dcat:Dataset for each Dataset.",
            "title": "Metadata Context",
            "type": "string"
          },
          "accessLevel": {
            "default": "public",
            "description": "The degree to which this dataset could be made publicly-available, regardless of whether it has been made available. Choices: public (Data asset is or could be made publicly available to all without restrictions), restricted public (Data asset is available under certain use restrictions), or non-public (Data asset is not available to members of the public).",
            "enum": [
              "public",
              "restricted public",
              "non-public"
            ],
            "title": "Public Access Level",
            "type": "string"
          },
          "accrualPeriodicity": {
            "description": "Frequency with which dataset is published.",
            "enum": [
              "R/P10Y",
              "R/P4Y",
              "R/P1Y",
              "R/P2M",
              "R/P3.5D",
              "R/P1D",
              "R/P2W",
              "R/P6M",
              "R/P2Y",
              "R/P3Y",
              "R/P0.33W",
              "R/P0.33M",
              "R/PT1S",
              "R/P1M",
              "R/P3M",
              "R/P0.5M",
              "R/P4M",
              "R/P1W",
              "R/PT1H",
              "irregular"
            ],
            "title": "Frequency",
            "type": "string"
          },
          "bureauCode": {
            "description": "Federal agencies, combined agency and bureau code from <a href=\"https://resources.data.gov/schemas/dcat-us/v1.1/omb_bureau_codes.csv\">OMB Circular A-11, Appendix C</a> in the format of <code>015:010</code>.",
            "items": {
              "type": "string"
            },
            "minItems": 1,
            "title": "Bureau Code",
            "type": "array",
            "uniqueItems": true
          },
          "contactPoint": {
            "description": "A Dataset ContactPoint as a vCard object.",
            "properties": {
              "@type": {
                "description": "IRI for the JSON-LD data type. This should be vcard:Contact for contactPoint.",
                "enum": [
                  "vcard:Contact"
                ],
                "title": "Metadata Context",
                "type": "string"
              },
              "fn": {
                "description": "A full formatted name, e.g. Firstname Lastname.",
                "minLength": 1,
                "title": "Contact Name",
                "type": "string"
              },
              "hasEmail": {
                "description": "Email address for the contact name.",
                "pattern": "^mailto:[\\w\\_\\~\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=\\:.-]+@[\\w.-]+\\.[\\w.-]+?$|[\\w\\_\\~\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=\\:.-]+@[\\w.-]+\\.[\\w.-]+?$",
                "title": "Email",
                "type": "string"
              }
            },
            "required": [
              "fn",
              "hasEmail"
            ],
            "title": "Project Open Data ContactPoint vCard",
            "type": "object"
          },
          "describedBy": {
            "description": "URL to the data dictionary for the dataset or API. Note that documentation other than a data dictionary can be referenced using Related Documents as shown in the expanded fields.",
            "format": "uri",
            "title": "Data Dictionary",
            "type": "string"
          },
          "describedByType": {
            "description": "The machine-readable file format (IANA Media Type or MIME Type) of the distribution’s describedBy URL.",
            "title": "Data Dictionary Type",
            "type": "string"
          },
          "description": {
            "description": "Human-readable description (e.g., an abstract) with sufficient detail to enable a user to quickly understand whether the asset is of interest.",
            "minLength": 1,
            "title": "Description",
            "type": "string"
          },
          "distribution": {
            "description": "A distribution is a container for the metadata specific to the data resource being shared. Each distribution should contain one <strong>Access URL</strong> or <strong>Download URL</strong>. When providing a Download URL, also include the format of the file. A distribution containing a Download URL to a csv or tsv file will generate queues that will import the data into a database table, this is referred to as a datastore. The datastore provides an API endpoint for users to run queries against the data.",
            "items": {
              "properties": {
                "@type": {
                  "default": "dcat:Distribution",
                  "description": "IRI for the JSON-LD data type. This should be dcat:Distribution for each Distribution.",
                  "readOnly": true,
                  "title": "Metadata Context",
                  "type": "string"
                },
                "accessURL": {
                  "description": "URL providing indirect access to a dataset.",
                  "format": "uri",
                  "title": "Access URL",
                  "type": "string"
                },
                "conformsTo": {
                  "description": "URL providing indirect access to a dataset.",
                  "format": "uri",
                  "title": "Data Standard",
                  "type": "string"
                },
                "describedBy": {
                  "description": "URL to the data dictionary for the distribution found at the downloadURL.",
                  "format": "uri",
                  "title": "Data Dictionary",
                  "type": "string"
                },
                "describedByType": {
                  "description": "The machine-readable file format (IANA Media Type or MIME Type) of the distribution’s describedBy URL.",
                  "pattern": "^[a-z\\/\\.\\+]+?$",
                  "title": "Data Dictionary Type",
                  "type": "string"
                },
                "description": {
                  "description": "Human-readable description of the file.",
                  "minLength": 1,
                  "title": "Description",
                  "type": "string"
                },
                "downloadURL": {
                  "description": "URL providing direct access to a downloadable file of a dataset.",
                  "format": "uri",
                  "title": "Download URL",
                  "type": "string"
                },
                "format": {
                  "description": "A human-readable description of the file format of a distribution (i.e. csv, pdf, kml, etc.).",
                  "title": "Format",
                  "type": "string"
                },
                "mediaType": {
                  "description": "The machine-readable file format (<a href=\"https://www.iana.org/assignments/media-types/media-types.xhtml\">IANA Media Type or MIME Type</a>) of the distribution’s downloadURL.",
                  "title": "Media Type",
                  "type": "string"
                },
                "title": {
                  "description": "Human-readable name of the file.",
                  "minLength": 1,
                  "title": "Title",
                  "type": "string"
                }
              },
              "title": "Data File",
              "type": "object",
              "uniqueItems": true
            },
            "minItems": 1,
            "title": "Distribution",
            "type": "array"
          },
          "identifier": {
            "description": "A unique identifier for the dataset or API as maintained within an Agency catalog or database.",
            "minLength": 1,
            "title": "Unique Identifier",
            "type": "string"
          },
          "isPartOf": {
            "description": "The collection of which the dataset is a subset.",
            "minLength": 1,
            "title": "Collection",
            "type": "string"
          },
          "issued": {
            "description": "Date of formal issuance.",
            "title": "Release Date",
            "type": "string"
          },
          "keyword": {
            "description": "Tags (or keywords) help users discover your dataset; please include terms that would be used by technical and non-technical users.",
            "items": {
              "minLength": 1,
              "title": "Tag",
              "type": "string"
            },
            "minItems": 1,
            "title": "Tags",
            "type": "array"
          },
          "license": {
            "description": "The license dataset or API is published with. See <a href=\"https://project-open-data.cio.gov/open-licenses/\">Open Licenses</a> for more information.",
            "format": "uri",
            "title": "License",
            "type": "string"
          },
          "modified": {
            "description": "Most recent date on which the dataset was changed, updated or modified.",
            "title": "Last Update",
            "type": "string"
          },
          "programCode": {
            "description": "Federal agencies, list the primary program related to this data asset, from the <a href=\"https://resources.data.gov/schemas/dcat-us/v1.1/FederalProgramInventory_FY13_MachineReadable_091613.csv\">Federal Program Inventory</a>. Use the format of <code>015:001</code>",
            "items": {
              "type": "string"
            },
            "minItems": 1,
            "title": "Program Code",
            "type": "array",
            "uniqueItems": true
          },
          "publisher": {
            "description": "A Dataset Publisher Organization.",
            "properties": {
              "@type": {
                "default": "org:Organization",
                "description": "IRI for the JSON-LD data type. This should be org:Organization for each publisher",
                "title": "Metadata Context",
                "type": "string"
              },
              "name": {
                "description": "",
                "minLength": 1,
                "title": "Publisher Name",
                "type": "string"
              },
              "subOrganizationOf": {
                "title": "Parent Organization",
                "type": "string"
              }
            },
            "required": [
              "name"
            ],
            "title": "Organization",
            "type": "object"
          },
          "references": {
            "description": "Related documents such as technical information about a dataset, developer documentation, etc.",
            "items": {
              "format": "uri",
              "type": "string"
            },
            "title": "Related Documents",
            "type": "array"
          },
          "spatial": {
            "description": "The <a href=\"https://project-open-data.cio.gov/v1.1/schema/#spatial\">spatial coverage</a> of the dataset. Could include a spatial region like a bounding box or a named place.",
            "minLength": 1,
            "title": "Spatial",
            "type": "string"
          },
          "temporal": {
            "description": "The <a href=\"https://project-open-data.cio.gov/v1.1/schema/#temporal\">start and end dates</a> for which the dataset is applicable, separated by a \"/\" (i.e., 2000-01-15T00:45:00Z/2010-01-15T00:06:00Z).",
            "title": "Temporal",
            "type": "string"
          },
          "theme": {
            "description": "Main thematic category of the dataset.",
            "items": {
              "minLength": 1,
              "title": "Category",
              "type": "string"
            },
            "title": "Category",
            "type": "array",
            "uniqueItems": true
          },
          "title": {
            "description": "Human-readable name of the asset. Should be in plain English and include sufficient detail to facilitate search and discovery.",
            "minLength": 1,
            "title": "Title",
            "type": "string"
          }
        },
        "required": [
          "title",
          "description",
          "identifier",
          "accessLevel",
          "modified",
          "keyword"
        ],
        "title": "Project Open Data Dataset",
        "type": "object"
      },
      "datastoreQuery": {
        "description": "Schema for DKAN datastore queries",
        "properties": {
          "conditions": {
            "description": "Conditions or groups of conditions for the query, bound by 'and' operator.",
            "items": {
              "anyOf": [
                {
                  "$ref": "#/components/schemas/datastoreQueryCondition"
                },
                {
                  "$ref": "#/components/schemas/datastoreQueryConditionGroup"
                }
              ]
            },
            "type": "array"
          },
          "count": {
            "default": true,
            "description": "Return a count of the total rows returned by the query, ignoring the limit/offset.",
            "type": "boolean"
          },
          "format": {
            "default": "json",
            "description": "Format to return data in. Default is JSON, can be set to CSV.",
            "enum": [
              "csv",
              "json"
            ],
            "type": "string"
          },
          "groupings": {
            "description": "Properties or aliases to group results by.",
            "items": {
              "anyOf": [
                {
                  "$ref": "#/components/schemas/datastoreQueryResource"
                },
                {
                  "$ref": "#/components/schemas/datastoreQueryResourceProperty"
                }
              ]
            },
            "type": "array"
          },
          "joins": {
            "description": "Joins",
            "items": {
              "properties": {
                "condition": {
                  "$ref": "#/components/schemas/datastoreQueryCondition"
                },
                "resource": {
                  "$ref": "#/components/schemas/datastoreQueryResource"
                }
              },
              "required": [
                "resource",
                "condition"
              ],
              "type": "object"
            },
            "type": "array"
          },
          "keys": {
            "default": true,
            "description": "Return results as an array of keyed objects, with the column machine names as keys. If false, results will be an array of simple arrays of values.",
            "type": "boolean"
          },
          "limit": {
            "description": "Limit for maximum number of records returned. Must be a minumum of 1.",
            "minimum": 1,
            "type": "integer"
          },
          "offset": {
            "default": 0,
            "description": "Number of records to offset by or skip before returning first record.",
            "type": "integer"
          },
          "properties": {
            "items": {
              "anyOf": [
                {
                  "$ref": "#/components/schemas/datastoreQueryResource"
                },
                {
                  "properties": {
                    "alias": {
                      "type": "string"
                    },
                    "expression": {
                      "$ref": "#/components/schemas/datastoreQueryExpression"
                    }
                  },
                  "required": [
                    "expression",
                    "alias"
                  ],
                  "title": "Aliased expression",
                  "type": "object"
                },
                {
                  "properties": {
                    "alias": {
                      "type": "string"
                    },
                    "property": {
                      "$ref": "#/components/schemas/datastoreQueryProperty"
                    },
                    "resource": {
                      "$ref": "#/components/schemas/datastoreQueryResource"
                    }
                  },
                  "required": [
                    "resource",
                    "property"
                  ],
                  "title": "Aliased property from specific resource",
                  "type": "object"
                }
              ]
            },
            "type": "array"
          },
          "resources": {
            "description": "Resources to query against and aliases. Usually you will add only one resource to this array, but if performing a join, list the primary resource first and then add resources to be used in the joins array.",
            "items": {
              "properties": {
                "alias": {
                  "description": "Alias to use to refer to this resource elsewhere in the query.",
                  "type": "string"
                }
              },
              "type": "object"
            },
            "title": "Resources",
            "type": "array"
          },
          "results": {
            "default": true,
            "description": "Return the result set. Set to false and set count to true to receive only a count of matches.",
            "type": "boolean"
          },
          "rowIds": {
            "default": false,
            "description": "Flag to include the result_number column in output. Default is FALSE",
            "type": "boolean"
          },
          "schema": {
            "default": true,
            "description": "Return the schema for the datastore collection.",
            "type": "boolean"
          },
          "sorts": {
            "description": "Result sorting directives.",
            "items": {
              "$ref": "#/components/schemas/datastoreQuerySort"
            },
            "type": "array"
          }
        },
        "title": "Datastore Query",
        "type": "object"
      },
      "datastoreQueryCondition": {
        "description": "Condition object including property, value and operator. If querying only one resource, the \"resource\" does not need to be specified.",
        "properties": {
          "operator": {
            "default": "=",
            "oneOf": [
              {
                "description": "Alphanumeric comparison operators, case-insensitive. One of: like, between, in, not in, contains, starts with, match",
                "pattern": "^([lL][iI][kK][eE]|[bB][eE][tT][wW][eE][eE][nN]|[iI][nN]|[nN][oO][tT] [iI][nN]|[cC][oO][nN][tT][aA][iI][nN][sS]|[sS][tT][aA][rR][tT][sS] [wW][iI][tT][hH]|[mM][aA][tT][cC][hH])$",
                "type": "string"
              },
              {
                "description": "Comparison operators",
                "enum": [
                  "=",
                  "<>",
                  "<",
                  "<=",
                  ">",
                  ">="
                ],
                "type": "string"
              }
            ]
          },
          "property": {
            "$ref": "#/components/schemas/datastoreQueryProperty"
          },
          "resource": {
            "$ref": "#/components/schemas/datastoreQueryResource"
          },
          "value": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/datastoreQueryResourceProperty"
              },
              {
                "items": {
                  "anyOf": [
                    {
                      "type": "number"
                    },
                    {
                      "type": "string"
                    }
                  ]
                },
                "type": "array"
              },
              {
                "type": "number"
              },
              {
                "type": "string"
              }
            ],
            "description": "The value to filter against."
          }
        },
        "required": [
          "property",
          "value"
        ],
        "title": "Datastore Query: Condition",
        "type": "object"
      },
      "datastoreQueryConditionGroup": {
        "description": "Group of conditions bound by 'and'/'or' operators.",
        "properties": {
          "conditions": {
            "items": {
              "anyOf": [
                {
                  "$ref": "#/components/schemas/datastoreQueryCondition"
                },
                {
                  "$ref": "#/components/schemas/datastoreQueryConditionGroup"
                }
              ]
            },
            "type": "array"
          },
          "groupOperator": {
            "enum": [
              "and",
              "or"
            ],
            "type": "string"
          }
        },
        "required": [
          "conditions"
        ],
        "title": "Datastore Query: Conditional group",
        "type": "object"
      },
      "datastoreQueryExpression": {
        "description": "Arithmetic or aggregate expression performed on one or more properties. Note that performing expressions on text or other non-numeric data types my yield unexpected results.",
        "properties": {
          "operands": {
            "description": "Arithmetic operators will require two operands, aggregate operators should take only one. Do not combine arithmetic and aggregate operators in a single query.",
            "items": {
              "anyOf": [
                {
                  "$ref": "#/components/schemas/datastoreQueryProperty"
                },
                {
                  "$ref": "#/components/schemas/datastoreQueryResourceProperty"
                },
                {
                  "properties": {
                    "expression": {
                      "$ref": "#/components/schemas/datastoreQueryExpression"
                    }
                  },
                  "title": "Expression",
                  "type": "object"
                },
                {
                  "title": "Number",
                  "type": "number"
                }
              ]
            },
            "type": "array"
          },
          "operator": {
            "oneOf": [
              {
                "description": "Aggregate operators, case-insensitive. One of: sum, count, avg, max, min",
                "pattern": "^([sS][uU][mM]|[cC][oO][uU][nN][tT]|[aA][vV][gG]|[mM][aA][xX]|[mM][iI][nN])$",
                "type": "string"
              },
              {
                "description": "Arithmetic operators",
                "enum": [
                  "+",
                  "-",
                  "*",
                  "/",
                  "%"
                ],
                "type": "string"
              }
            ]
          }
        },
        "title": "Datastore Query: Expression",
        "type": "object"
      },
      "datastoreQueryProperty": {
        "description": "The property/column or alias to filter by. Should not include collection/table alias.",
        "pattern": "^[^.]+$",
        "title": "Datastore Query: property",
        "type": "string"
      },
      "datastoreQueryResource": {
        "description": "Alias to resource set in resources array. Not needed when only querying against one resource.",
        "title": "Datastore Query: resource",
        "type": "string"
      },
      "datastoreQueryResourceProperty": {
        "description": "Property name with optional collection/table alias.",
        "properties": {
          "property": {
            "$ref": "#/components/schemas/datastoreQueryProperty"
          },
          "resource": {
            "$ref": "#/components/schemas/datastoreQueryResource"
          }
        },
        "required": [
          "property"
        ],
        "title": "Datastore Query: resourceProperty",
        "type": "object"
      },
      "datastoreQuerySort": {
        "description": "Properties to sort by in a particular order.",
        "properties": {
          "order": {
            "description": "Order to sort in, lowercase.",
            "enum": [
              "asc",
              "desc"
            ],
            "type": "string"
          },
          "property": {
            "$ref": "#/components/schemas/datastoreQueryProperty"
          },
          "resource": {
            "$ref": "#/components/schemas/datastoreQueryResource"
          }
        },
        "title": "Datastore Query: sort",
        "type": "object"
      },
      "datastoreResourceQuery": {
        "description": "Schema for DKAN datastore queries. When querying against a specific resource, the \"resource\" property is always optional. If you want to set it explicitly, note that it will be aliased to simply \"t\".",
        "properties": {
          "conditions": {
            "description": "Conditions or groups of conditions for the query, bound by 'and' operator.",
            "items": {
              "anyOf": [
                {
                  "$ref": "#/components/schemas/datastoreQueryCondition"
                },
                {
                  "$ref": "#/components/schemas/datastoreQueryConditionGroup"
                }
              ]
            },
            "type": "array"
          },
          "count": {
            "default": true,
            "description": "Return a count of the total rows returned by the query, ignoring the limit/offset.",
            "type": "boolean"
          },
          "format": {
            "default": "json",
            "description": "Format to return data in. Default is JSON, can be set to CSV.",
            "enum": [
              "csv",
              "json"
            ],
            "type": "string"
          },
          "groupings": {
            "description": "Properties or aliases to group results by.",
            "items": {
              "anyOf": [
                {
                  "$ref": "#/components/schemas/datastoreQueryResource"
                },
                {
                  "$ref": "#/components/schemas/datastoreQueryResourceProperty"
                }
              ]
            },
            "type": "array"
          },
          "keys": {
            "default": true,
            "description": "Return results as an array of keyed objects, with the column machine names as keys. If false, results will be an array of simple arrays of values.",
            "type": "boolean"
          },
          "limit": {
            "description": "Limit for maximum number of records returned. Must be a minumum of 1.",
            "minimum": 1,
            "type": "integer"
          },
          "offset": {
            "default": 0,
            "description": "Number of records to offset by or skip before returning first record.",
            "type": "integer"
          },
          "properties": {
            "items": {
              "anyOf": [
                {
                  "$ref": "#/components/schemas/datastoreQueryResource"
                },
                {
                  "properties": {
                    "alias": {
                      "type": "string"
                    },
                    "expression": {
                      "$ref": "#/components/schemas/datastoreQueryExpression"
                    }
                  },
                  "required": [
                    "expression",
                    "alias"
                  ],
                  "title": "Aliased expression",
                  "type": "object"
                },
                {
                  "properties": {
                    "alias": {
                      "type": "string"
                    },
                    "property": {
                      "$ref": "#/components/schemas/datastoreQueryProperty"
                    },
                    "resource": {
                      "$ref": "#/components/schemas/datastoreQueryResource"
                    }
                  },
                  "required": [
                    "resource",
                    "property"
                  ],
                  "title": "Aliased property from specific resource",
                  "type": "object"
                }
              ]
            },
            "type": "array"
          },
          "results": {
            "default": true,
            "description": "Return the result set. Set to false and set count to true to receive only a count of matches.",
            "type": "boolean"
          },
          "rowIds": {
            "default": false,
            "description": "Flag to include the result_number column in output. Default is FALSE",
            "type": "boolean"
          },
          "schema": {
            "default": true,
            "description": "Return the schema for the datastore collection.",
            "type": "boolean"
          },
          "sorts": {
            "description": "Result sorting directives.",
            "items": {
              "$ref": "#/components/schemas/datastoreQuerySort"
            },
            "type": "array"
          }
        },
        "title": "Datastore Resource Query",
        "type": "object"
      },
      "errorResponse": {
        "properties": {
          "data": {
            "description": "Arbitrary object storing more detailed data on the error message.",
            "type": "object"
          },
          "message": {
            "description": "Error message.",
            "type": "string"
          },
          "status": {
            "type": "integer"
          },
          "timestamp": {
            "format": "date-time",
            "type": "string"
          }
        },
        "type": "object"
      },
      "facets": {
        "description": "Array of facet values.",
        "items": {
          "properties": {
            "name": {
              "description": "The facet filter value, for instance, the tet of a keyword to filter by",
              "type": "string"
            },
            "total": {
              "description": "Number of results in the current result set that match this filter.",
              "type": "integer"
            },
            "type": {
              "description": "Machine name for the metastore property to filter on.",
              "type": "string"
            }
          },
          "type": "object"
        },
        "type": "array"
      },
      "metastoreWriteResponse": {
        "additionalProperties": false,
        "properties": {
          "endpoint": {
            "description": "Path to the metadata from the API.",
            "type": "string"
          },
          "identifier": {
            "description": "Identifier for metadata just created or modified.",
            "type": "string"
          }
        },
        "type": "object"
      }
    }
  },
  "info": {
    "title": "API Documentation",
    "version": "v1"
  },
  "openapi": "3.0.2",
  "paths": {
    "/api/1/datastore/imports/{identifier}": {
      "get": {
        "description": "Returns the numbers of rows and columns, and a list of columns headers from the datastore.\n",
        "operationId": "datastore-get",
        "parameters": [
          {
            "$ref": "#/components/parameters/datastoreUuid"
          }
        ],
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "columns": {
                      "type": "object"
                    },
                    "numOfColumns": {
                      "type": "integer"
                    },
                    "numOfRows": {
                      "type": "integer"
                    }
                  },
                  "required": [
                    "numOfRows",
                    "numOfColumns",
                    "columns"
                  ],
                  "type": "object"
                }
              }
            },
            "description": "Ok"
          }
        },
        "summary": "Datastore statistics",
        "tags": [
          "Datastore: import"
        ]
      }
    },
    "/api/1/datastore/query": {
      "get": {
        "description": "Simple GET equivalent of a POST query. Note that parameters containing arrays or objects are not yet supported by SwaggerUI. For conditions, sorts, and other complex parameters, write your query in JSON and then convert to a nested query string. See [this web tool](https://www.convertonline.io/convert/json-to-query-string) for an example.",
        "operationId": "datastore-query-get",
        "parameters": [
          {
            "$ref": "#/components/parameters/datastoreQueryCount"
          },
          {
            "$ref": "#/components/parameters/datastoreQueryFormat"
          },
          {
            "$ref": "#/components/parameters/datastoreQueryKeys"
          },
          {
            "$ref": "#/components/parameters/datastoreQueryLimit"
          },
          {
            "$ref": "#/components/parameters/datastoreQueryOffset"
          },
          {
            "$ref": "#/components/parameters/datastoreQueryResults"
          },
          {
            "$ref": "#/components/parameters/datastoreQueryRowIds"
          },
          {
            "$ref": "#/components/parameters/datastoreQuerySchema"
          }
        ],
        "responses": {
          "200": {
            "$ref": "#/components/responses/200JsonOrCsvQueryOk"
          },
          "400": {
            "$ref": "#/components/responses/400BadJson"
          },
          "503": {
            "$ref": "#/components/responses/503ServiceUnavailable"
          }
        },
        "summary": "Query one or more datastore resources",
        "tags": [
          "Datastore: query"
        ]
      },
      "post": {
        "operationId": "datastore-query-post",
        "requestBody": {
          "content": {
            "application/json": {
              "example": {
                "conditions": [
                  {
                    "operator": ">",
                    "property": "record_number",
                    "resource": "t",
                    "value": 1
                  }
                ],
                "limit": 3,
                "resources": [
                  {
                    "alias": "t",
                    "id": "004e1f11-aa67-5b16-943d-1fe1044b3512"
                  }
                ]
              },
              "schema": {
                "$ref": "#/components/schemas/datastoreQuery"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "$ref": "#/components/responses/200JsonOrCsvQueryOk"
          },
          "400": {
            "$ref": "#/components/responses/400BadJson"
          },
          "503": {
            "$ref": "#/components/responses/503ServiceUnavailable"
          }
        },
        "summary": "Query one or more datastore resources",
        "tags": [
          "Datastore: query"
        ]
      }
    },
    "/api/1/datastore/query/download": {
      "get": {
        "description": "Simple GET equivalent of a POST query. Note that parameters containing arrays or objects are not yet supported by SwaggerUI. For conditions, sorts, and other complex parameters, write your query in JSON and then convert to a nested query string. See [this web tool](https://www.convertonline.io/convert/json-to-query-string) for an example.",
        "operationId": "datastore-query-download-get",
        "parameters": [
          {
            "$ref": "#/components/parameters/datastoreQueryCount"
          },
          {
            "$ref": "#/components/parameters/datastoreQueryFormat"
          },
          {
            "$ref": "#/components/parameters/datastoreQueryKeys"
          },
          {
            "$ref": "#/components/parameters/datastoreQueryLimit"
          },
          {
            "$ref": "#/components/parameters/datastoreQueryOffset"
          },
          {
            "$ref": "#/components/parameters/datastoreQueryResults"
          },
          {
            "$ref": "#/components/parameters/datastoreQueryRowIds"
          },
          {
            "$ref": "#/components/parameters/datastoreQuerySchema"
          }
        ],
        "responses": {
          "200": {
            "$ref": "#/components/responses/200DatastoreCsvOk"
          },
          "400": {
            "$ref": "#/components/responses/400BadJson"
          },
          "404": {
            "$ref": "#/components/responses/404IdNotFound"
          },
          "503": {
            "$ref": "#/components/responses/503ServiceUnavailable"
          }
        },
        "summary": "Query one or more datastore resources for file download with get",
        "tags": [
          "Datastore: query"
        ]
      },
      "post": {
        "operationId": "datastore-query-download-post",
        "requestBody": {
          "content": {
            "application/json": {
              "example": {
                "conditions": [
                  {
                    "operator": ">",
                    "property": "record_number",
                    "resource": "t",
                    "value": 1
                  }
                ],
                "format": "csv",
                "limit": 3,
                "resources": [
                  {
                    "alias": "t",
                    "id": "004e1f11-aa67-5b16-943d-1fe1044b3512"
                  }
                ]
              },
              "schema": {
                "$ref": "#/components/schemas/datastoreQuery"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "$ref": "#/components/responses/200DatastoreCsvOk"
          },
          "400": {
            "$ref": "#/components/responses/400BadJson"
          },
          "404": {
            "$ref": "#/components/responses/404IdNotFound"
          },
          "503": {
            "$ref": "#/components/responses/503ServiceUnavailable"
          }
        },
        "summary": "Query one or more datastore resources for file download",
        "tags": [
          "Datastore: query"
        ]
      }
    },
    "/api/1/datastore/query/{datasetId}/{index}": {
      "get": {
        "description": "Simple GET equivalent of a POST query -- see the POST endpoint documentation for full query schema. A few basic parameters are provided here as examples. For more reliable queries, write your query in JSON and then convert to a query string. See [this web tool](https://www.convertonline.io/convert/json-to-query-string) for an example.",
        "operationId": "datastore-datasetindex-query-get",
        "parameters": [
          {
            "$ref": "#/components/parameters/datastoreDatasetUuid"
          },
          {
            "$ref": "#/components/parameters/datastoreDistributionIndex"
          },
          {
            "$ref": "#/components/parameters/datastoreQueryCount"
          },
          {
            "$ref": "#/components/parameters/datastoreQueryFormat"
          },
          {
            "$ref": "#/components/parameters/datastoreQueryKeys"
          },
          {
            "$ref": "#/components/parameters/datastoreQueryLimit"
          },
          {
            "$ref": "#/components/parameters/datastoreQueryOffset"
          },
          {
            "$ref": "#/components/parameters/datastoreQueryResults"
          },
          {
            "$ref": "#/components/parameters/datastoreQueryRowIds"
          },
          {
            "$ref": "#/components/parameters/datastoreQuerySchema"
          }
        ],
        "responses": {
          "200": {
            "$ref": "#/components/responses/200JsonOrCsvQueryOk"
          },
          "400": {
            "$ref": "#/components/responses/400BadJson"
          },
          "404": {
            "$ref": "#/components/responses/404IdNotFound"
          },
          "503": {
            "$ref": "#/components/responses/503ServiceUnavailable"
          }
        },
        "summary": "Query a single datastore resource with get",
        "tags": [
          "Datastore: query"
        ]
      },
      "post": {
        "operationId": "datastore-datasetindex-query-post",
        "parameters": [
          {
            "$ref": "#/components/parameters/datastoreDatasetUuid"
          },
          {
            "$ref": "#/components/parameters/datastoreDistributionIndex"
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "example": {
                "conditions": [
                  {
                    "operator": ">",
                    "property": "record_number",
                    "resource": "t",
                    "value": 1
                  }
                ],
                "limit": 3
              },
              "schema": {
                "$ref": "#/components/schemas/datastoreResourceQuery"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "$ref": "#/components/responses/200JsonOrCsvQueryOk"
          },
          "400": {
            "$ref": "#/components/responses/400BadJson"
          },
          "404": {
            "$ref": "#/components/responses/404IdNotFound"
          },
          "503": {
            "$ref": "#/components/responses/503ServiceUnavailable"
          }
        },
        "summary": "Query a single datastore resource",
        "tags": [
          "Datastore: query"
        ]
      }
    },
    "/api/1/datastore/query/{datasetId}/{index}/download": {
      "get": {
        "description": "Like the other datastore query GET endpoints, additional parameters may be added by serializing a query JSON object (documented in the POST endpoints) into a query string.",
        "operationId": "datastore-datasetindex-query-download-get",
        "parameters": [
          {
            "$ref": "#/components/parameters/datastoreDatasetUuid"
          },
          {
            "$ref": "#/components/parameters/datastoreDistributionIndex"
          },
          {
            "description": "Response format. Currently, only csv is supported.",
            "example": "csv",
            "in": "query",
            "name": "format",
            "required": false,
            "schema": {
              "type": "string"
            },
            "style": "deepObject"
          }
        ],
        "responses": {
          "200": {
            "$ref": "#/components/responses/200DatastoreCsvOk"
          },
          "400": {
            "$ref": "#/components/responses/400BadJson"
          },
          "404": {
            "$ref": "#/components/responses/404IdNotFound"
          },
          "503": {
            "$ref": "#/components/responses/503ServiceUnavailable"
          }
        },
        "summary": "Query a single datastore resource for file download",
        "tags": [
          "Datastore: query"
        ]
      }
    },
    "/api/1/datastore/query/{distributionId}": {
      "get": {
        "description": "Simple GET equivalent of a POST query. Note that parameters containing arrays or objects are not yet supported by SwaggerUI. For conditions, sorts, and other complex parameters, write your query in JSON and then convert to a nested query string. See [this web tool](https://www.convertonline.io/convert/json-to-query-string) for an example.",
        "operationId": "datastore-resource-query-get",
        "parameters": [
          {
            "$ref": "#/components/parameters/datastoreDistributionUuid"
          },
          {
            "$ref": "#/components/parameters/datastoreQueryCount"
          },
          {
            "$ref": "#/components/parameters/datastoreQueryFormat"
          },
          {
            "$ref": "#/components/parameters/datastoreQueryKeys"
          },
          {
            "$ref": "#/components/parameters/datastoreQueryLimit"
          },
          {
            "$ref": "#/components/parameters/datastoreQueryOffset"
          },
          {
            "$ref": "#/components/parameters/datastoreQueryResults"
          },
          {
            "$ref": "#/components/parameters/datastoreQueryRowIds"
          },
          {
            "$ref": "#/components/parameters/datastoreQuerySchema"
          }
        ],
        "responses": {
          "200": {
            "$ref": "#/components/responses/200JsonOrCsvQueryOk"
          },
          "400": {
            "$ref": "#/components/responses/400BadJson"
          },
          "404": {
            "$ref": "#/components/responses/404IdNotFound"
          },
          "503": {
            "$ref": "#/components/responses/503ServiceUnavailable"
          }
        },
        "summary": "Query a single datastore resource with get",
        "tags": [
          "Datastore: query"
        ]
      },
      "post": {
        "operationId": "datastore-resource-query-post",
        "parameters": [
          {
            "$ref": "#/components/parameters/datastoreDistributionUuid"
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "example": {
                "conditions": [
                  {
                    "operator": ">",
                    "property": "record_number",
                    "resource": "t",
                    "value": 1
                  }
                ],
                "limit": 3
              },
              "schema": {
                "$ref": "#/components/schemas/datastoreResourceQuery"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "$ref": "#/components/responses/200JsonOrCsvQueryOk"
          },
          "400": {
            "$ref": "#/components/responses/400BadJson"
          },
          "404": {
            "$ref": "#/components/responses/404IdNotFound"
          },
          "503": {
            "$ref": "#/components/responses/503ServiceUnavailable"
          }
        },
        "summary": "Query a single datastore resource",
        "tags": [
          "Datastore: query"
        ]
      }
    },
    "/api/1/datastore/query/{distributionId}/download": {
      "get": {
        "description": "Like the other datastore query GET endpoints, additional parameters may be added by serializing a query JSON object (documented in the POST endpoints) into a query string.",
        "operationId": "datastore-resource-query-download-get",
        "parameters": [
          {
            "$ref": "#/components/parameters/datastoreDistributionUuid"
          },
          {
            "description": "Response format. Either csv or json.",
            "example": "csv",
            "in": "query",
            "name": "format",
            "required": false,
            "schema": {
              "type": "string"
            },
            "style": "deepObject"
          }
        ],
        "responses": {
          "200": {
            "$ref": "#/components/responses/200DatastoreCsvOk"
          },
          "400": {
            "$ref": "#/components/responses/400BadJson"
          },
          "404": {
            "$ref": "#/components/responses/404IdNotFound"
          },
          "503": {
            "$ref": "#/components/responses/503ServiceUnavailable"
          }
        },
        "summary": "Query a single datastore resource for file download",
        "tags": [
          "Datastore: query"
        ]
      }
    },
    "/api/1/datastore/sql": {
      "get": {
        "description": "Interact with resources in the datastore using an SQL-like syntax.\n",
        "operationId": "datastore-sql",
        "parameters": [
          {
            "allowEmptyValue": true,
            "description": "Add `&show_db_columns` to return columns without spaces and in some cases, truncated names where the human\nreadable column header is very long.\n",
            "in": "query",
            "name": "show_db_columns",
            "schema": {
              "type": "boolean"
            },
            "style": "form"
          },
          {
            "description": "A SQL-like query.\n\nA `SELECT` using the `show_db_columns` parameter will make it easier to build queries against the data as\nit returns columns without spaces and in some cases, truncated names where the human readable column header\nis very long.\n\n`/api/1/datastore/sql?query=[SELECT * FROM DATASTORE_UUID][LIMIT 1 OFFSET 0];&show_db_columns`\n\nYou can then build the `SELECT` part of the query. Do not use spaces between its arguments.\n\n`/api/1/datastore/sql?query=[SELECT a,b,c, FROM DATASTORE_UUID]`\n\n`WHERE` can use any column in the data.\n\n`/api/1/datastore/sql?query=[SELECT a,b FROM DATASTORE_UUID][WHERE c = \"CCC\"];&show_db_columns`\n\n`LIMIT` and `OFFSET` allow you to get more than the 500 record limit, by using successive queries:\n\n`/api/1/datastore/sql?query=[SELECT a,b,c FROM DATASTORE_UUID][WHERE d = \"CCC\"][LIMIT 500 OFFSET 0];&show_db_columns`\n\n`/api/1/datastore/sql?query=[SELECT a,b,c FROM DATASTORE_UUID][WHERE d = \"DDD\"][LIMIT 500 OFFSET 500];&show_db_columns`\n\nNote: `SELECT`, `WHERE` and `LIMIT...OFFSET` clauses must each be included within brackets `[ ]`.\n",
            "example": "[SELECT * FROM 004e1f11-aa67-5b16-943d-1fe1044b3512][LIMIT 2]",
            "in": "query",
            "name": "query",
            "required": true,
            "schema": {
              "type": "string"
            },
            "style": "form"
          }
        ],
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
                  "items": {
                    "description": "Simple result row, key/value pairs.",
                    "type": "object"
                  },
                  "type": "array"
                }
              }
            },
            "description": "Ok. Query successful."
          }
        },
        "summary": "Query resources in datastore",
        "tags": [
          "Datastore: SQL Query"
        ]
      }
    },
    "/api/1/metastore/schemas": {
      "get": {
        "operationId": "metastore-get-schemas",
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
                  "description": "Full collection of available metastore schemas",
                  "type": "object"
                }
              }
            },
            "description": "List of metastore schemas."
          }
        },
        "summary": "Get list of all schemas",
        "tags": [
          "Metastore"
        ]
      }
    },
    "/api/1/metastore/schemas/dataset/items/{identifier}": {
      "get": {
        "operationId": "dataset-get-item",
        "parameters": [
          {
            "$ref": "#/components/parameters/datasetUuid"
          },
          {
            "$ref": "#/components/parameters/showReferenceIds"
          }
        ],
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/dataset"
                }
              }
            },
            "description": "Full dataset item."
          },
          "404": {
            "$ref": "#/components/responses/404IdNotFound"
          }
        },
        "summary": "Get a single dataset.",
        "tags": [
          "Metastore: dataset"
        ]
      }
    },
    "/api/1/metastore/schemas/{schema_id}": {
      "get": {
        "operationId": "metastore-get-schema",
        "parameters": [
          {
            "$ref": "#/components/parameters/schemaId"
          }
        ],
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
                  "description": "A schema definition, see https://json-schema.org/",
                  "type": "object"
                }
              }
            },
            "description": "Ok"
          },
          "404": {
            "description": "Schema not found"
          }
        },
        "summary": "Get a specific schema",
        "tags": [
          "Metastore"
        ]
      }
    },
    "/api/1/metastore/schemas/{schema_id}/items": {
      "get": {
        "operationId": "metastore-get-all",
        "parameters": [
          {
            "$ref": "#/components/parameters/schemaId"
          },
          {
            "$ref": "#/components/parameters/showReferenceIds"
          }
        ],
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
                  "description": "Array of metastore items matching the chosen schema.",
                  "items": {
                    "type": "object"
                  },
                  "type": "array"
                }
              }
            },
            "description": "Full list of all items for the given schema"
          }
        },
        "summary": "Get all items for a specific schema (e.g., \"dataset\")",
        "tags": [
          "Metastore"
        ]
      }
    },
    "/api/1/search": {
      "get": {
        "description": "Search description.\n",
        "operationId": "search",
        "parameters": [
          {
            "allowEmptyValue": true,
            "description": "Full-text search to run against any metadata fields indexed for fulltext searches.",
            "in": "query",
            "name": "fulltext",
            "schema": {
              "default": "",
              "type": "string"
            },
            "style": "form"
          },
          {
            "allowEmptyValue": true,
            "description": "Request information on facets. Pass a comma-separated list to get specific facets. Pass an empty value or \"0\" for no facet infrmation. Omit this parameter to get all facet information.",
            "explode": false,
            "in": "query",
            "name": "facets",
            "required": false,
            "schema": {
              "type": "string"
            },
            "style": "form"
          },
          {
            "description": "Filter results using <em class=\"placeholder\">keyword</em> facet.",
            "example": "all years",
            "in": "query",
            "name": "keyword",
            "schema": {
              "type": "string"
            },
            "style": "form"
          },
          {
            "description": "Filter results using <em class=\"placeholder\">publisher__name</em> facet.",
            "example": "openpaymentsdata.cms.gov",
            "in": "query",
            "name": "publisher__name",
            "schema": {
              "type": "string"
            },
            "style": "form"
          },
          {
            "description": "Filter results using <em class=\"placeholder\">theme</em> facet.",
            "example": "Summary",
            "in": "query",
            "name": "theme",
            "schema": {
              "type": "string"
            },
            "style": "form"
          },
          {
            "description": "How many results per page.",
            "example": 20,
            "in": "query",
            "name": "page-size",
            "schema": {
              "default": 10,
              "maximum": 100,
              "minimum": 1,
              "type": "integer"
            },
            "style": "form"
          },
          {
            "description": "Sort results in ascending or descending order. Allowed values: <em>asc, desc</em>",
            "explode": false,
            "in": "query",
            "name": "sort-order",
            "schema": {
              "items": {
                "default": "asc",
                "type": "string"
              },
              "type": "array"
            },
            "style": "form"
          },
          {
            "description": "The page of the result set.",
            "example": 1,
            "in": "query",
            "name": "page",
            "schema": {
              "default": 1,
              "type": "integer"
            },
            "style": "form"
          },
          {
            "description": "Which property to sort results on. Available properties: <em class=\"placeholder\">description, keyword, modified, publisher__name, temporal, theme, title, search_api_relevance</em>",
            "explode": false,
            "in": "query",
            "name": "sort",
            "schema": {
              "items": {
                "default": "title",
                "type": "string"
              },
              "type": "array"
            },
            "style": "form"
          }
        ],
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "facets": {
                      "$ref": "#/components/schemas/facets"
                    },
                    "results": {
                      "description": "An object with keys following the format \"dkan_dataset/[uuid]\", containing full dataset objects from the DKAN metastore.",
                      "type": "object"
                    },
                    "total": {
                      "description": "Total search results for query.",
                      "type": "integer"
                    }
                  },
                  "type": "object"
                }
              }
            },
            "description": "Ok"
          },
          "400": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/errorResponse"
                }
              }
            },
            "description": "Bad request"
          }
        },
        "summary": "Search the DKAN catalog",
        "tags": [
          "Search"
        ]
      }
    },
    "/api/1/search/facets": {
      "get": {
        "operationId": "search-facets",
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "facets": {
                      "$ref": "#/components/schemas/facets"
                    },
                    "time": {
                      "description": "Execution time.",
                      "type": "number"
                    }
                  },
                  "type": "object"
                }
              }
            },
            "description": "Ok"
          }
        },
        "summary": "Retrieve search facet information",
        "tags": [
          "Search"
        ]
      }
    }
  },
  "tags": [
    {
      "description": "CRUD operations for dataset metastore items. Substitute any other schema name for \"dataset\" to modify other items.",
      "name": "Metastore: dataset"
    },
    {
      "description": "Work with metadata items.",
      "name": "Metastore"
    }
  ]
}
```
