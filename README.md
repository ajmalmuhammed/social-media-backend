
# Social Media Backend

This is a basic API for a social media website. Here users will be able to login using an otp sent to his mail.







## Prerequisites

- Install all the node modules required using package.json

```bash
    npm install 
```

- Start the MongoDB server
- Create a .env file and add the below details in it

```
    MONGO_DB_URL = <URL OF YOUR MONGO DB SERVER>
    SERVER_PORT = < PORT WHERE THIS API SHOULD BE RUNNING>
    EMAIL_ID = <EMAIL ID FROM WHICH OTP IS SENT> 
    EMAIL_PASSWORD = <PASSWORD OF THAT MAIL ID>

    INITIAL_VECTOR = <INITIAL VECTOR REQUIRED FOR AES ENCRYPTION>
    CRYPTO_PASSWORD = <PASSWORD FOR THE ENCRYPTION>

    JWT_SECRET = <SECRET CODE FOR GENERATING JWT>
    ENV = <WHICH ENV THIS SERVER IS RUNNING EG. PRODUCTION,TEST>
```
    
## Deployment

To start the api run

```bash
  npm start
```


## How to use

- To request OTP
        
    ` api/login `  
    - Method : `POST`
    - request
    ```json
        {
          "email": _mailid_
        }
    ```

- To verify OTP
    ` api/verify `  
    - Method : `POST`
    - request
    ```json
        {
          "verification_key": _from the request otp request_
          "otp": _otp received on mail_
          "email": _same email used for request otp_
        }
    ```
    A cookie (jwt token) will be set after verification of the otp.
- To add profile details after verification
    ` api/profile `  
    - Method : `POST`
    - Cookie : _jwt_token_
    - request:
    ```json
        {
           "email_id" : _mailid_
           "firstName": _first name to be updated_
           "lastName": _lastname to be updated_
        }
    ```
- To add post after succesfull login
    ` api/post `  
    - Method : `POST`
    - Cookie : _jwt_token_
    - request:
    ```json
        {
            "title" : "this is the title",
            "content": "this is the content of this post"
        }
    ```

- To like a post after succesfull login
    ` api/like/:id `  
    - Method : `POST`
    - Cookie : _jwt_token_
    - id - the postID present in DB
    - request:
    ```json
        {
            "user_id" : _USER_ID of current person_
        }

    ```

     



