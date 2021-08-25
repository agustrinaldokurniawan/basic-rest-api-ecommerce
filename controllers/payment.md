# Payment API Documentation

## Virtual Account

### 1. Get Bank Channel Available

**URL**
/payment/getbank

**Method**
GET

**Query**
None

**Params**
None

**Request Body**
None

**Success Response**

>

    "resp": [
        {
            "name": "Bank Central Asia",
            "code": "BCA",
            "is_activated": true
        },
        {
            "name": "Bank Negara Indonesia",
            "code": "BNI",
            "is_activated": true
        },
        {
            "name": "Bank Negara Indonesia Syariah",
            "code": "BNI_SYARIAH",
            "is_activated": false
        },
        {
            "name": "Bank Mandiri",
            "code": "MANDIRI",
            "is_activated": true
        },
        {
            "name": "Bank Permata",
            "code": "PERMATA",
            "is_activated": true
        },
        {
            "name": "Bank Sahabat Sampoerna",
            "code": "SAHABAT_SAMPOERNA",
            "is_activated": true
        },
        {
            "name": "Bank Rakyat Indonesia",
            "code": "BRI",
            "is_activated": true
        },
        {
            "name": "Bank CIMB Niaga",
            "code": "CIMB",
            "is_activated": false
        }
    ]

>

<br><br><br>

### 2. Createa VA

**URL**
/payment/createVA

**Method**
POST

**Query**
None

**Params**
None

**Request Body**

bankCode=String

externalID=String

name=String

expectedAmt=Integer

>

    "bankCode":"BNI",
    "externalID":"agust!@",
    "name":"agust rinaldo",
    "expectedAmt":100000

>

**Success Response**

>

    {
        "resp": {
        "is_closed": false,
        "status": "PENDING",
        "currency": "IDR",
        "owner_id": "60f93c954ada1254cae9f7b1",
        "external_id": "agust!@",
        "bank_code": "BNI",
        "merchant_code": "8808",
        "name": "XDT-agust rinaldo",
        "account_number": "8808999910023810",
        "expected_amount": 100000,
        "is_single_use": false,
        "expiration_date": "2052-08-24T17:00:00.000Z",
        "id": "61260f9cd2d8e50f4aa9d6ac"
    }

    }

>

<br><br><br>

### 3. Get Created VA

**URL**
/payment/getVA

**Method**
GET

**Query**

id=String

> example: "6125f379d2d8e5b54ea9d662"

**Params**
None

**Request Body**
None

**Success Response**

>

      {
         "resp": {
        "is_closed": false,
        "status": "ACTIVE",
        "currency": "IDR",
        "owner_id": "60f93c954ada1254cae9f7b1",
        "external_id": "123456",
        "bank_code": "BNI",
        "merchant_code": "8808",
        "name": "XDT-agust",
        "account_number": "8808999956555448",
        "expected_amount": 100000,
        "is_single_use": false,
        "expiration_date": "2052-08-24T17:00:00.000Z",
        "id": "6125f379d2d8e5b54ea9d662"
    }

    }

>

<br><br><br>

### 4. Create Disbursement

**URL**
/payment/createDisbursement

**Method**
POST

**Query**
None

**Params**
None

**Request Body**

bankCode=String

externalID=String

name=String

amount=Integer

accountHolderName=String

accountNumber=String

description=String

>

    {
    "bankCode":"BNI",
    "externalID":"123456",
    "name":"agust",
    "amount":100000,
    "accountHolderName":"agust",
    "accountNumber":"1234567890",
    "description":"description payment"
    }

>

**Success Response**

>

    {
        "resp": {
        "status": "PENDING",
        "user_id": "60f93c954ada1254cae9f7b1",
        "external_id": "123456",
        "amount": 100000,
        "bank_code": "BNI",
        "account_holder_name": "agust",
        "disbursement_description": "description payment",
        "id": "612614eb6c2e5400174bf162"
        }

    }

>

<br><br><br>

### 5. Get Created Disbursement

**URL**
/payment/getDisbursement

**Method**
GET

**Query**

id=String

> example: "612614eb6c2e5400174bf162"

**Params**
None

**Request Body**
None

**Success Response**

>

     {
    "resp": {
        "is_closed": false,
        "status": "ACTIVE",
        "currency": "IDR",
        "owner_id": "60f93c954ada1254cae9f7b1",
        "external_id": "123456",
        "bank_code": "BNI",
        "merchant_code": "8808",
        "name": "XDT-agust",
        "account_number": "8808999956555448",
        "expected_amount": 100000,
        "is_single_use": false,
        "expiration_date": "2052-08-24T17:00:00.000Z",
        "id": "6125f379d2d8e5b54ea9d662"
    }
    }

>
