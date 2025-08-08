# LinkedIn-Like Community

**Live Project:** [View Here](https://linkedinclone-git-main-moid786s-projects.vercel.app/)

## Overview
This project is a LinkedIn-like community platform built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js).  
It provides essential features for user interaction and community engagement in a text-only post environment.

## Features

### User Management
- **User Registration** — Create a new account.
- **Login** — Authenticate users with secure sessions.
- **Logout** — End active sessions securely.
- **Get Profile** — Retrieve the authenticated user's profile details.
- **Update Profile** — Edit personal details such as name, bio, and other information.
- **Change Password** — Update account password with verification.
- **Get Public Profile by ID** — View another user's public profile.

### Post Management
- **Create Post** — Publish text-based posts to the community feed.
- **Update Post** — Edit existing posts created by the user.
- **Delete Post** — Remove posts created by the user.
- **Get All Posts** — View the complete list of posts from all users.
- **Get Posts by User ID** — Filter posts created by a specific user.

> **Note:** All posts in this platform are text-based only. No images, videos, or other media are supported.

## Technology Stack
- **Frontend:** React.js
- **Backend:** Node.js with Express.js
- **Database:** MongoDB
- **Hosting:** Vercel (Frontend), suitable backend hosting service

## Purpose
The aim of this project is to create a simple yet functional networking platform that mirrors the core capabilities of LinkedIn, focusing on profile management and community discussions via text posts.

## Project Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository_url>
cd <repository_folder>
```

### 2. Install Dependencies

#### For Backend:
```bash
cd backend
npm install
```

#### For Frontend:
```bash
cd frontend
npm install
```

### 3. Environment Variables
Create a `.env` file in the backend folder and add the following:
```
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
```

### 4. Run the Project

#### Start Backend:
```bash
cd backend
npm run dev
```

#### Start Frontend:
```bash
cd frontend
npm start
```

### 5. Access the Application
Once both frontend and backend are running, open your browser and visit:
```
http://localhost:3000
```

### 6. Build for Production
For frontend production build:
```bash
cd frontend
npm run build
```

Deploy the build folder to your hosting platform and backend to a suitable server (e.g., Render, Railway, Heroku).


---
## ***************************************************************************************
---
## ***************************************************************************************
---
## ***************************************************************************************
---





# User Registration Endpoint

This endpoint allows new users to register an account on the platform. It accepts user details and creates a new user profile.

## HTTP Request

**Method:** `POST`  
**URL:** `https://linkedin-like-community.onrender.com/api/v1/users/register`

## Request Headers

- `Content-Type`: `application/json`  
    This header indicates that the request body is in JSON format.
    

## Request Body

The request body must be a JSON object containing the following parameters:

- `name` (string): The full name of the user.
    
- `email` (string): The email address of the user. This must be unique across the platform.
    
- `password` (string): The password chosen by the user, which should meet the platform's security requirements.
    
- `bio` (string): A brief biography or description about the user.
    

### Example Request Body

``` json
{
  "name": "Moid Alam",
  "email": "moidalam@gmail.com",
  "password": "Moid@123",
  "bio": "I'm a passionate full-stack developer."
}

 ```

## Response Format

Upon successful registration, the server will respond with a JSON object containing the following information:

- `success` (boolean): Indicates whether the registration was successful.
    
- `message` (string): A message providing additional information about the registration status.
    
- `user` (object): An object containing the details of the newly created user, typically including the user's `id`, `name`, and `email`.
    

### Example Response

``` json
{
  "success": true,
  "message": "User registered successfully.",
  "user": {
    "id": "12345",
    "name": "Moid Alam",
    "email": "moidalam@gmail.com"
  }
}

 ```

## Notes

- Ensure that the email provided is valid and not already in use.
    
- Passwords should adhere to security guidelines, including length and complexity.
    
- This endpoint is crucial for user onboarding and should be utilized whenever a new user wishes to create an account.




---
---
---


# User Login API

This endpoint allows users to log in to the application by providing their email and password. Upon successful authentication, the server responds with user-specific data.

## Request

- **Method**: POST
    
- **URL**: `https://linkedin-like-community.onrender.com/api/v1/users/login`
    

### Headers

- `Content-Type`: `application/json` - Indicates that the request body format is JSON.
    

### Request Body

The request body must be in JSON format and include the following parameters:

- `email` (string): The email address of the user attempting to log in.
    
- `password` (string): The password associated with the user's account.
    

**Example Request Body:**

``` json
{
  "email": "user@example.com",
  "password": "userPassword123"
}

 ```

## Response

Upon successful login, the server will return a response containing user details and a status code indicating the result of the login attempt.

### Response Body

The response body will typically include:

- `status` (string): Indicates the success or failure of the login attempt.
    
- `message` (string): A message providing additional information about the login attempt.
    
- `data` (object): Contains user-specific information such as user ID, name, and any relevant tokens.
    

### Status Codes

- `200 OK`: Login successful.
    
- `401 Unauthorized`: Invalid email or password.
    
- `400 Bad Request`: Missing required fields in the request body.
    

**Example Successful Response:**

``` json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "userId": "12345",
    "name": "John Doe",
    "token": "abc123xyz"
  }
}

 ```

**Example Error Response:**

``` json
{
  "status": "error",
  "message": "Invalid credentials"
}

 ```
---
---
---

# Logout User

This endpoint is used to log out a user from the application. It requires the user's credentials to authenticate the logout request.

#### Request Parameters

The request should be made with a JSON payload containing the following parameters:

- **email** (string): The email address of the user who is attempting to log out.
    
- **password** (string): The password of the user for authentication.
    

#### Example Request Body

``` json
{
  "email": "user@example.com",
  "password": "user_password"
}

 ```

#### Response Structure

Upon a successful logout, the API will respond with a status indicating the result of the operation. The response typically includes:

- **status** (string): Indicates whether the logout was successful or if there was an error.
    
- **message** (string): A message providing additional context about the logout process.
    

#### Example Response

``` json
{
  "status": "success",
  "message": "User logged out successfully."
}

 ```

Ensure that the email and password provided are correct to successfully log out the user.

This endpoint allows a user to log out from their account. It requires authentication credentials to ensure that the request is being made by a valid user.

### Request

**Method:** POST  
**URL:** `https://linkedin-like-community.onrender.com/api/v1/users/logout`

#### Request Body

The request body must be in JSON format and include the following parameters:

- **email** (string): The email address associated with the user's account.
    
- **password** (string): The password for the user's account.
    

#### Example Request Body

``` json
{
  "email": "user@example.com",
  "password": "user_password"
}

 ```

### Response

Upon a successful logout, the server will respond with a status indicating the success of the operation. The response typically includes:

- **message** (string): A confirmation message indicating that the user has been logged out successfully.
    

#### Example Response

``` json
{
  "message": "Logout successful"
}

 ```

### Notes

- Ensure that the email and password provided are correct to successfully log out.
    
- This endpoint is crucial for maintaining user session security.

---
---
---

# User Profile Retrieval API

This endpoint allows you to retrieve the profile information of a user based on their authentication credentials.

### Request

- **Method**: `GET`
    
- **URL**: `https://linkedin-like-community.onrender.com/api/v1/users/profile`
    

### Headers

- **Content-Type**: `application/json`
    
- **Authorization**: Bearer token (required for authentication)
    

### Request Body

The request body must be sent in JSON format and should include the following parameters:

- **email** (string): The email address of the user. This is used for identifying the user account.
    
- **password** (string): The password associated with the user's account. This is used for authentication purposes.
    

**Example Request Body**:

``` json
{
  "email": "user@example.com",
  "password": "userPassword"
}

 ```

### Response

Upon successful authentication, the API will return the user's profile information in JSON format. The expected response will include:

- **status** (string): Indicates whether the request was successful or not.
    
- **data** (object): Contains the user's profile details such as name, email, and other relevant information.
    

**Example Response**:

``` json
{
  "status": "success",
  "data": {
    "name": "John Doe",
    "email": "user@example.com",
    "profilePicture": "url_to_profile_picture",
    // other profile details
  }
}

 ```

### Authentication

This endpoint requires authentication via a Bearer token, which should be included in the `Authorization` header. Ensure that the user is logged in to access their profile information.

### Usage Example

To use this endpoint, send a GET request with the appropriate headers and body containing the user's email and password. Upon successful authentication, you will receive the user's profile data.

Ensure to handle any errors gracefully, such as invalid credentials or server issues.

---
---
---

# Update Profile Endpoint Documentation

### Overview

The Update Profile endpoint allows users to update their profile information, including fields such as name and email. This endpoint requires authentication and is designed to ensure that only authorized users can modify their profile details.

### Request

- **Method**: `PUT`
    
- **URL**: `https://linkedin-like-community.onrender.com/api/v1/users/profile`
    

### Headers

- **Content-Type**: `application/json`
    
- **Authorization**: Bearer token (required for authentication)
    

### Request Body

The request body should be in JSON format and include the following fields:

- `name` (string): The user's full name.
    
- `email` (string): The user's email address.
    
- `password` (string): The user's current password for authentication.
    
- Additional fields may be included as necessary.
    

#### Example Request Body

``` json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "CurrentPassword123"
}

 ```

### Response

The expected response will be in JSON format and will include the following fields:

- `success` (boolean): Indicates if the update was successful.
    
- `message` (string): A message providing additional information about the update status.
    
- `data` (object): Contains the updated user profile information.
    

#### Example Response

``` json
{
  "success": true,
  "message": "Profile updated successfully.",
  "data": {
    "name": "John Doe",
    "email": "johndoe@example.com"
  }
}

 ```

### Authentication Requirements

This endpoint requires the user to be authenticated. A valid Bearer token must be included in the Authorization header.

### Usage Example

To update a user's profile, send a PUT request to the endpoint with the required headers and body as shown in the examples above. Ensure that the user is authenticated to successfully update their profile information.

### Request

- **Method:** GET
    
- **URL:** `https://linkedin-like-community.onrender.com/api/v1/users/profile`
    

### Headers

- **Authorization:** Bearer token (required for authentication)
    

### Request Body

This endpoint does not require a request body for the GET method. However, authentication is typically handled through headers.

### Authentication

- This endpoint requires authentication via a Bearer token. Ensure that the token is included in the Authorization header when making the request.
    

### Response

The expected response format is typically JSON. The response will include user profile details such as:

- `id`: Unique identifier for the user
    
- `name`: Full name of the user
    
- `email`: Email address of the user
    
- `profilePicture`: URL to the user's profile picture
    
- `bio`: Short biography or description of the user
    

### Example Usage

To retrieve the user profile, include the authorization token in the headers:

``` http
GET /api/v1/users/profile HTTP/1.1
Host: linkedin-like-community.onrender.com
Authorization: Bearer YOUR_ACCESS_TOKEN

 ```

### Notes

- Ensure that the token is valid and has not expired to avoid unauthorized access errors.
    
- The endpoint returns user profile information only if the authentication is successful.

---
---
---


# Fetch Public Profile by ID

This endpoint allows you to retrieve a public user profile using a unique user ID.

## Request

- **Method**: `GET`
    
- **Endpoint URL**: `https://linkedin-like-community.onrender.com/api/v1/users/profile/{userId}`
    

### Path Parameters

- `userId` (string, required): The unique identifier for the user whose profile you want to fetch. In the example above, the user ID is `6891eadee85fe68877804f3c`.
    

## Response

Upon a successful request, the response will typically include the user's profile details, such as:

- `email`: The email address of the user.
    
- `name`: The full name of the user.
    

The exact structure of the response may vary, but it will generally contain relevant user information based on the provided user ID.

---
---
---

# Change Password Endpoint

This endpoint allows users to update their password. It requires the current password, a new password, and a confirmation of the new password.

## Request

### Method

`PATCH`

### URL

`https://linkedin-like-community.onrender.com/api/v1/users/change-password`

### Request Body

The request body must be in JSON format and include the following fields:

- **currentPassword** (string): The user's current password.
    
- **newPassword** (string): The new password that the user wishes to set.
    
- **confirmPassword** (string): A confirmation of the new password to ensure accuracy.
    

#### Example Request Body

``` json
{
  "currentPassword": "your_current_password",
  "newPassword": "your_new_password",
  "confirmPassword": "your_new_password"
}

 ```

## Response

The response will indicate whether the password change was successful or if it failed. The response will include a message detailing the outcome.

### Success Response

- **Status Code**: 200 OK
    
- **Message**: "Password changed successfully."
    

### Failure Response

- **Status Code**: 400 Bad Request
    
- **Message**: "Current password is incorrect." or "New passwords do not match."
    

Ensure to handle both success and failure cases appropriately in your application.


---
---
---

# Create a Post

This endpoint allows users to create a new post in the community. It accepts a JSON payload containing the content of the post.

## Endpoint

```
POST https://linkedin-like-community.onrender.com/api/v1/posts/

 ```

## Request Headers

- **Content-Type**: `application/json` - Specifies the media type of the resource.
    
- **Authorization**: `Bearer {token}` - Required for user authentication.
    

## Request Body

The request body must be a JSON object with the following structure:

``` json
{
  "content": "string"
}

 ```

- **content** (string): The content of the post. This is a required field.
    

### Example Request Body

``` json
{
  "content": "🚀 Just launched my new full-s ..."
}

 ```

## Expected Response

### Success Response

- **Status Code**: `201 Created`
    
- {"message": "Post created successfully.","postId": "string"}
    
- **message** (string): Confirmation message indicating the post was created.
    
- **postId** (string): The unique identifier of the newly created post.
    

### Error Response

- **Status Code**: `400 Bad Request`
    
- {"error": "string"}
    
- **error** (string): Description of the error encountered, such as validation errors.
    

## Query Parameters

No query parameters are required for this endpoint.

## Path Variables

No path variables are required for this endpoint.

This endpoint is essential for users looking to share updates, thoughts, or announcements within the community platform.

---
---
---

# API Request Documentation: Get Posts

## Endpoint

**URL:** `https://linkedin-like-community.onrender.com/api/v1/posts/`  
**Method:** `GET`

## Purpose

This endpoint retrieves a list of posts from the community. It allows users to access the latest updates and shared content within the platform.

## Request Parameters

This endpoint does not require any additional query parameters or request body for the GET request. The payload shown in the last call is not necessary for the request to function.

## Expected Response Structure

The response will typically include a JSON object containing an array of posts. Each post in the array may include the following fields (the exact structure may vary):

- **id**: Unique identifier for the post.
    
- **content**: The content of the post.
    
- **author**: Information about the user who created the post.
    
- **createdAt**: Timestamp indicating when the post was created.
    
- **likes**: Number of likes the post has received.
    
- **comments**: Array of comments associated with the post.
    

## Additional Notes

- Ensure that you have the necessary permissions to access this endpoint.
    
- The response may vary based on the current state of posts in the community.
    
- Rate limits may apply to this endpoint, so consider implementing appropriate handling in your application.
    

**Method:** GET  
**URL:** `https://linkedin-like-community.onrender.com/api/v1/posts/`

#### Description

This endpoint is used to retrieve a list of posts from the community. It allows users to access the latest content shared within the platform, providing a way to view updates and engage with community members.

#### Request Parameters

This endpoint does not require any query parameters or request body. Simply sending a GET request to the specified URL will return the data.

#### Expected Response Format

The response will be in JSON format and will typically include the following fields:

- `posts`: An array of post objects, each containing details such as:
    
    - `id`: Unique identifier for the post.
        
    - `content`: The textual content of the post.
        
    - `createdAt`: Timestamp indicating when the post was created.
        
    - `author`: Information about the user who created the post.
        

#### Additional Notes

- Ensure that you have the necessary permissions to access the posts.
    
- The content of the posts may vary, and it may include text, images, or links shared by users.
    
- This endpoint is useful for displaying the latest community interactions and can be integrated into various applications to enhance user engagement.
    

**Endpoint URL:** `https://linkedin-like-community.onrender.com/api/v1/posts/`  
**HTTP Method:** `GET`

## Description

This endpoint retrieves a list of all posts available in the community. It allows users to access the content shared by various members, providing insights and updates.

## Request

This endpoint does not require any request body parameters. Simply send a GET request to the specified URL to fetch the posts.

## Expected Response Format

The response will typically include a JSON object containing an array of posts. Each post object may include the following fields:

- `id`: Unique identifier for the post.
    
- `content`: The content of the post shared by the user.
    
- `createdAt`: Timestamp indicating when the post was created.
    
- `author`: Information about the user who created the post.
    

## Notes

- Ensure that you have the necessary permissions to access the posts.
    
- The response may vary based on the number of posts available and the user's access rights.
    
- Rate limiting may apply to this endpoint based on usage.
    

This endpoint retrieves a list of posts from the community. It supports filtering and pagination based on the provided query parameters.

## Request

### Method

`GET`

### URL

`https://linkedin-like-community.onrender.com/api/v1/posts/`

### Query Parameters

- **content** (optional): A string that can be used to filter posts based on their content. It allows users to search for specific keywords within the posts.
    

## Response

### Success Response

- **Status Code**: 200 OK
    
- **Body**: An array of post objects, each containing details such as:
    
    - **id**: Unique identifier for the post.
        
    - **content**: The content of the post.
        
    - **createdAt**: Timestamp of when the post was created.
        
    - **updatedAt**: Timestamp of when the post was last updated.
        

### Error Response

- **Status Code**: 400 Bad Request
    
- **Body**: An error message indicating what went wrong with the request.
    

## Notes

- Ensure that any query parameters used are properly encoded.
    
- The response may include a large number of posts; consider implementing pagination if necessary.

---
---
---


# Get All Posts by User ID

## Endpoint

`/posts?userId={userId}`

## Method

`GET`

## Description

Retrieves all posts associated with a specific user ID.

## Query Parameters

- `userId` (required): The ID of the user whose posts are to be retrieved.
    

## Response

- **200 OK**: Returns an array of post objects. Each post object contains the following fields:
    
    - `id`: Unique identifier for the post.
        
    - `title`: Title of the post.
        
    - `body`: Content of the post.
        

## Example Request

```
GET /posts?userId=1

 ```

## Example Response

``` json
[ 
  { 
    "id": 1, 
    "title": "Post Title 1", 
    "body": "Post content here..." 
  }, 
  { 
    "id": 2, 
    "title": "Post Title 2", 
    "body": "Post content here..." 
  } 
]

 ```
---
---
---


# Update Post Endpoint

This endpoint allows you to update an existing post in the community. It uses the HTTP PATCH method to modify the content of a post identified by its unique ID.

### Request

- **URL**: `https://linkedin-like-community.onrender.com/api/v1/posts/{postId}`
    
- **Method**: PATCH
    

#### Request Body

The request body must be in JSON format and should include the following parameter:

- **content** (string): The updated content of the post. This field is required and should contain the new text that you want to display in the post.
    

**Example Request Body**:

``` json
{
  "content": "Fruits are an essential part of a healthy diet."
}

 ```

### Response

Upon a successful update, the API will return a response indicating the status of the operation. The expected response structure is as follows:

- **success** (boolean): Indicates whether the update was successful.
    
- **message** (string): A message confirming the update.
    
- **data** (object): Contains any additional data related to the updated post, if applicable.
    

**Example Response**:

``` json
{
  "success": true,
  "message": "Post updated successfully.",
  "data": {
    "postId": "689204214344456cca0741f0",
    "content": "Fruits are an essential part of a healthy diet."
  }
}

 ```

### Notes

- Ensure that the `postId` in the URL is replaced with the actual ID of the post you wish to update.
    
- The `content` field must not be empty; otherwise, the update will fail.

---
---
---

# DELETE Post Endpoint

This endpoint allows users to delete a specific post from the community. The post is identified by its unique ID, which is included in the URL.

## Request

- **Method**: DELETE
    
- **URL**: `https://linkedin-like-community.onrender.com/api/v1/posts/{postId}`
    

### Path Parameters

- `postId` (string, required): The unique identifier of the post that you want to delete. In this example, the post ID is `689202a7f1b78813ded4825b`.
    

### Request Body

The request body should contain the following parameter:

- `content` (string): A brief description or content related to the post. This parameter is optional for the DELETE request as it typically does not require a body.
    

## Response

Upon successful deletion of the post, the API will return a response indicating the success of the operation. The response structure may vary, but it typically includes a confirmation message and the ID of the deleted post.

### Example Response

``` json
{
  "message": "Post deleted successfully",
  "postId": "689202a7f1b78813ded4825b"
}

 ```

Ensure that the post ID provided in the URL corresponds to an existing post; otherwise, the API may return an error indicating that the post was not found.
