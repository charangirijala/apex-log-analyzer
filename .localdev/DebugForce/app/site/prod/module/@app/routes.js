LWR.define('@app/routes', [], function() { return [
  {
    "devName": "News_Detail__c",
    "label": "News Detail",
    "isPublic": false,
    "viewId": "00888bcd-e9ca-4f5c-b1f5-837d6922232f",
    "hasVanityURL": true,
    "patternMap": {
      "urlAlias": "([^\\/\\s]+)"
    },
    "id": "14f34c05-161d-4214-a1a9-6825abca2f69",
    "path": "/news/:urlAlias",
    "view": "newsDetail",
    "isRoot": false,
    "isDefault": false,
    "ssr": false,
    "hasCsr": true,
    "page": {
      "type": "standard__managedContentPage",
      "attributes": {
        "contentTypeName": "sfdc_cms__news"
      }
    }
  },
  {
    "devName": "Login",
    "label": "Login",
    "isPublic": true,
    "viewId": "1c7bc392-60ca-4dc2-836c-085a3baab335",
    "hasVanityURL": false,
    "patternMap": {},
    "id": "738ff0de-327e-40b4-8ee2-dcc16d471f1b",
    "path": "/login",
    "view": "login",
    "isRoot": false,
    "isDefault": false,
    "ssr": false,
    "hasCsr": true,
    "page": {
      "type": "comm__namedPage",
      "attributes": {
        "name": "Login"
      }
    }
  },
  {
    "devName": "Home",
    "label": "Home",
    "isPublic": false,
    "viewId": "060ad87a-15e0-4ff9-936f-d2ce65e6514d",
    "hasVanityURL": false,
    "patternMap": {},
    "id": "4261788a-f207-4d5c-9543-2335b2620a62",
    "path": "/",
    "view": "home",
    "isRoot": true,
    "isDefault": false,
    "ssr": false,
    "hasCsr": true,
    "page": {
      "type": "comm__namedPage",
      "attributes": {
        "name": "Home"
      }
    }
  },
  {
    "devName": "Register",
    "label": "Register",
    "isPublic": true,
    "viewId": "d9b530bd-1c15-4b54-b4db-16a17a80349f",
    "hasVanityURL": false,
    "patternMap": {},
    "id": "d4ffd888-5604-436f-b49f-cd493c6e560f",
    "path": "/SelfRegister",
    "view": "register",
    "isRoot": false,
    "isDefault": false,
    "ssr": false,
    "hasCsr": true,
    "page": {
      "type": "comm__namedPage",
      "attributes": {
        "name": "Register"
      }
    }
  },
  {
    "devName": "Forgot_Password",
    "label": "Forgot Password",
    "isPublic": true,
    "viewId": "21b27b07-f348-4260-a549-705ed6aeff62",
    "hasVanityURL": false,
    "patternMap": {},
    "id": "3efb54f9-a85f-4455-b469-f021256ce740",
    "path": "/ForgotPassword",
    "view": "forgotPassword",
    "isRoot": false,
    "isDefault": false,
    "ssr": false,
    "hasCsr": true,
    "page": {
      "type": "comm__namedPage",
      "attributes": {
        "name": "Forgot_Password"
      }
    }
  },
  {
    "devName": "Check_Password",
    "label": "Check Password",
    "isPublic": true,
    "viewId": "c7ea5eb4-104f-4268-b666-ed6702023a4f",
    "hasVanityURL": false,
    "patternMap": {},
    "id": "aec15c0f-da6d-499b-aef8-a75617d4677f",
    "path": "/CheckPasswordResetEmail",
    "view": "checkPasswordResetEmail",
    "isRoot": false,
    "isDefault": false,
    "ssr": false,
    "hasCsr": true,
    "page": {
      "type": "comm__namedPage",
      "attributes": {
        "name": "Check_Password"
      }
    }
  },
  {
    "devName": "Error",
    "label": "Error",
    "isPublic": false,
    "viewId": "b5d0e6dd-dcb8-4759-8055-27d1a63b7a9f",
    "hasVanityURL": false,
    "patternMap": {},
    "id": "798d1831-6ca3-4beb-bb76-a46cb6f0e131",
    "path": "/error",
    "view": "error",
    "isRoot": false,
    "isDefault": true,
    "ssr": false,
    "hasCsr": true,
    "page": {
      "type": "comm__namedPage",
      "attributes": {
        "name": "Error"
      }
    }
  }
]; });