
# Social Media Backend

This is a basic API for a social media website. Here users will be able to login after succesful verification of the OTP sent to the mail.




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
- To add profile details after verification
    ` api/verify `  
    - Method : `POST`
    - request
    ```json
        {
          "verification_key": _from the request otp request_
           "email_id" : _mailid_
           "firstName": _first name to be updated_
           "lastName": _lastname to be updated_
        }
    ```
     



