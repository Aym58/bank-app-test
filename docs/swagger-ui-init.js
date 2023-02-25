
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/bank": {
        "post": {
          "operationId": "BankController_createBank",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateBankDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Bank created"
            },
            "409": {
              "description": "Bank already exists"
            }
          },
          "tags": [
            "Bank"
          ]
        },
        "get": {
          "operationId": "BankController_getAllBanks",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Get all banks",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/GetBankDto"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Bank"
          ]
        }
      },
      "/bank/{id}": {
        "get": {
          "operationId": "BankController_getOneBank",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Get one bank",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GetBankDto"
                  }
                }
              }
            },
            "404": {
              "description": "Bank not found"
            }
          },
          "tags": [
            "Bank"
          ]
        },
        "patch": {
          "operationId": "BankController_updateBank",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateBankDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Bank updated",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GetBankDto"
                  }
                }
              }
            },
            "404": {
              "description": "Bank not found"
            }
          },
          "tags": [
            "Bank"
          ]
        },
        "delete": {
          "operationId": "BankController_deleteBank",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Bank deleted"
            },
            "404": {
              "description": "Bank not found"
            },
            "409": {
              "description": "Bank with transactions cannot be deleted"
            }
          },
          "tags": [
            "Bank"
          ]
        }
      },
      "/category": {
        "post": {
          "operationId": "CategoryController_createCategory",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateCategoryDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Category created"
            },
            "409": {
              "description": "Category already exists"
            }
          },
          "tags": [
            "Category"
          ]
        },
        "get": {
          "operationId": "CategoryController_getAllCategorys",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Get all Categories",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/GetCategoryDto"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Category"
          ]
        }
      },
      "/category/{id}": {
        "get": {
          "operationId": "CategoryController_getOneCategory",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Get one category",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GetCategoryDto"
                  }
                }
              }
            },
            "404": {
              "description": "Category not found"
            }
          },
          "tags": [
            "Category"
          ]
        },
        "patch": {
          "operationId": "CategoryController_updateCategory",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateCategoryDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Category updated",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GetCategoryDto"
                  }
                }
              }
            },
            "404": {
              "description": "Category not found"
            }
          },
          "tags": [
            "Category"
          ]
        },
        "delete": {
          "operationId": "CategoryController_deleteCategory",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Category deleted"
            },
            "404": {
              "description": "Category not found"
            },
            "409": {
              "description": "Category with transactions cannot be deleted"
            }
          },
          "tags": [
            "Category"
          ]
        }
      },
      "/transaction": {
        "post": {
          "operationId": "TransactionController_createTransaction",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateTransactionDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Transaction created"
            }
          },
          "tags": [
            "Transaction"
          ]
        },
        "get": {
          "operationId": "TransactionController_getAllTransactions",
          "parameters": [
            {
              "name": "page",
              "required": true,
              "in": "query",
              "example": 1,
              "description": "Current page",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": true,
              "in": "query",
              "example": 10,
              "description": "Elements on page",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get all Transactions",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/GetTransactionDto"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Transaction"
          ]
        }
      },
      "/transaction/{id}": {
        "delete": {
          "operationId": "TransactionController_deleteTransaction",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Transaction deleted"
            },
            "404": {
              "description": "Transaction not found"
            }
          },
          "tags": [
            "Transaction"
          ]
        }
      },
      "/statistics": {
        "post": {
          "operationId": "StatisticsController_createCategory",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/GetStatisticsDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Get statistics by period, example: { food: -800, salary: +2000 }"
            },
            "404": {
              "description": "Category not found"
            }
          },
          "tags": [
            "Statistics"
          ]
        }
      }
    },
    "info": {
      "title": "Codica test task",
      "description": "",
      "version": "1.0",
      "contact": {}
    },
    "tags": [],
    "servers": [],
    "components": {
      "schemas": {
        "CreateBankDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "Chase",
              "description": "Bank name"
            }
          },
          "required": [
            "name"
          ]
        },
        "GetBankDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "example": 1,
              "description": "Bank id"
            },
            "name": {
              "type": "string",
              "example": "Chase",
              "description": "Bank name"
            },
            "balance": {
              "type": "number",
              "example": 1200,
              "description": "Bank balance"
            }
          },
          "required": [
            "id",
            "name",
            "balance"
          ]
        },
        "UpdateBankDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "Chase",
              "description": "Bank name"
            }
          },
          "required": [
            "name"
          ]
        },
        "CreateCategoryDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "food",
              "description": "Category name"
            }
          },
          "required": [
            "name"
          ]
        },
        "GetCategoryDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "example": 1,
              "description": "Category id"
            },
            "name": {
              "type": "string",
              "example": "food",
              "description": "Category name"
            }
          },
          "required": [
            "id",
            "name"
          ]
        },
        "UpdateCategoryDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "food",
              "description": "Category name"
            }
          },
          "required": [
            "name"
          ]
        },
        "CreateTransactionDto": {
          "type": "object",
          "properties": {
            "amount": {
              "type": "number",
              "example": 500,
              "description": "Transaction amount"
            },
            "type": {
              "type": "string",
              "example": "profitable",
              "description": "Transaction type"
            },
            "bankId": {
              "type": "number",
              "example": "1",
              "description": "Bank id"
            },
            "categoriesId": {
              "example": "[1,2]",
              "description": "Category id",
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "required": [
            "amount",
            "type",
            "bankId",
            "categoriesId"
          ]
        },
        "GetTransactionDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "example": 1,
              "description": "Transaction id"
            },
            "amount": {
              "type": "number",
              "example": 500,
              "description": "Transaction amount"
            },
            "type": {
              "type": "string",
              "example": "profitable",
              "description": "Transaction type"
            }
          },
          "required": [
            "id",
            "amount",
            "type"
          ]
        },
        "GetStatisticsDto": {
          "type": "object",
          "properties": {
            "categoryIds": {
              "example": [
                1,
                2,
                3
              ],
              "description": "Category ids",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "fromPeriod": {
              "type": "string",
              "example": "2020/06/20",
              "description": "Start date in format YYYY-MM-DD"
            },
            "toPeriod": {
              "type": "string",
              "example": "2020/06/20",
              "description": "End date in format YYYY-MM-DD"
            }
          },
          "required": [
            "categoryIds",
            "fromPeriod",
            "toPeriod"
          ]
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
