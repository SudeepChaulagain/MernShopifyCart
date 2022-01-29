# MernShopifyCart
A mini MERN ecommerce project where authenticate user can fetch the products, see their details and add the products to cart.

# Configuration 
Create .env file in root directory and fill in the following details:
```
PORT=5000
MONGO_URI='YOUR DB URI'

#For JWT Authentication
JWT_SECRET='YOUR SECRET KEY'
JWT_EXPIRE='10min'

NODE_ENV='development/production'

#For Password Reset
EMAIL_SERVICE=''
EMAIL_HOST=''
EMAIL_PORT=''
EMAIL_USERNAME=''
EMAIL_PASSWORD=''
EMAIL_FROM=''
````

# Quick Start
 ```javascript
 //Install dependencies for server and client
 yarn install && yarn client-install
 
 //Run client and server with concurrently
 yarn dev
 
 // Server runs on http://localhost:5000 and client on http://localhost:3000
 
 ```
