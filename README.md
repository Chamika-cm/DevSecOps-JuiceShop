# Technology Stack

## Application
OWASP Juice Shop

## Frontend
Angular

## Backend
Node.js

## Database
SQLite

## Containerization
Docker

## Deployment Management
Docker Compose

## Version Control
GitHub

## CI/CD Automation
GitHub Actions

### Member 2 Part

## Rate Limiting Testing Script (rate_test.py)

A custom Python script (rate_test.py) was created to test the Rate Limiting Lack / DoS (TH-05 / RR-04) vulnerability[cite: 4].

### Script Purpose:
- To send a high volume of concurrent requests to the OWASP Juice Shop application and test if Rate Limiting mechanisms are present[cite: 4].
- To verify whether the server effectively blocks or throttles spammed requests[cite: 4].

### How to Run the Script:
```bash
python rate_test.py
 

### MEMBER 3 PART - FIX VULNERABILITIES 

### 1. SQL Injection (SQLi) Remediation
- **Vulnerable File:** `routes/login.ts`
- **The Vulnerability:** 
  The original code was building SQL queries using direct string concatenation with user inputs. Because of this, attackers could easily exploit it by typing payloads like `' OR 1=1 --` into the login fields, letting them bypass authentication and log in as an admin without even knowing the password.
- **The Remediation / Fix:** 
  We secured the login route by replacing the vulnerable string-based query with a **parameterized query** using Sequelize placeholders (`?`). Additionally, we integrated `security.hash()` to safely hash the password before checking it against the database. This ensures that user inputs are treated strictly as data rather than executable SQL commands.

  ## 2. Remediate IDOR vulnerability in Basket Retrieval

### **Vulnerability Summary**
* **Type:** IDOR (Insecure Direct Object Reference) / BOLA
* **Endpoint:** `/rest/basket/:id` (`routes/basket.ts`)
* **What happened:** A logged-in user could easily view other users' shopping baskets just by changing the basket ID in the URL.

### **The Fix**
* **How we fixed it:** Added a check to verify whether the logged-in user actually owns the requested basket ID (`loggedInUser.bid`).
* **Code snippet:**
  ```typescript
  const loggedInUser = security.authenticatedUsers.from(req)
  if (loggedInUser && loggedInUser.bid !== parseInt(id, 10)) {
    return res.status(403).json({ error: 'Unauthorized access to this basket!' })
  }