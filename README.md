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


  ### 3. Broken Authentication / JWT Weaknesses Remediation
- **Vulnerable File:** `lib/insecurity.ts` (Line 38)
- **The Vulnerability:** 
  The original code used a hardcoded, weak HMAC secret (`pa4qacea4VK9t9nGv7yZtwmj`) for signing JSON Web Tokens (JWTs). Because the secret key was hardcoded and publicly visible in the source code, attackers could easily exploit it to forge valid JWT payloads, enabling unauthorized privilege escalation (e.g., forging admin tokens).
- **The Remediation / Fix:** 
  We secured the JWT signing mechanism by replacing the hardcoded secret string with `process.env.HMAC_SECRET` and a cryptographically strong, randomly generated fallback (`crypto.randomBytes(64).toString('hex')`). This ensures that tokens are signed using an unpredictable, secure secret, preventing attackers from forging or tampering with session tokens.


  ### 4. Brute-Force / Rate Limiting Remediation
- **Vulnerable File:** `routes/login.ts`
- **The Vulnerability:** 
  The `/rest/user/login` endpoint lacked request throttling controls, leaving it wide open to automated brute-force attacks. Attackers could continuously spam login attempts to guess user credentials without any restrictions or delays.
- **The Remediation / Fix:** 
  We secured the login route by integrating the `express-rate-limit` middleware directly into `routes/login.ts`. We configured a strict rate limit restricting login attempts to a maximum of 5 requests per 15 minutes per IP address. When this threshold is exceeded, the server automatically blocks further requests and responds with a `429 Too Many Requests` status code.