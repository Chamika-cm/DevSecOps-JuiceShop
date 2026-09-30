## Team Member Roles & Responsibilities 
### Member 1: Threat Modelling & Architecture Analysis 
- Developed application architecture diagrams and analyzed trust boundaries. 
- Executed STRIDE Threat Modelling and maintained the Risk Register (`docs/` directory)[cite: 1]. 

### Member 2: SAST Scanning & Vulnerability Demonstration 
- Conducted initial Static Application Security Testing (SAST) using Semgrep[cite: 1, 3]. 
- Created proof-of-concept scripts (`rate_test.py`) and verified vulnerability traces[cite: 1, 3, 4]. 

### Member 3: Secure Coding & Remediation Verification 
- Implemented secure coding fixes for identified vulnerabilities[cite: 1, 3]. 
- Re-tested the application and validated SAST diffs (`semgrep-before.json` & `semgrep-after.json`)[cite: 1, 3, 4].

 ### Member 4: DevSecOps CI/CD Pipeline & Secrets Management 
- Configured GitHub Actions pipeline with 4 essential security gates (SAST, SCA, Secrets Scan, Container Scan). 
- Implemented build-blocking controls and managed encrypted secrets.




### Member 1 Part

Project Execution & Setup Instructions
Prerequisites
Required software:
•	Docker
•	Docker Compose
•	Node.js v18+
•	Python 3.x
________________________________________
Running the Application
Build and start containers:
docker-compose up --build
Access application:
http://localhost:3000
________________________________________
Running Local SAST Scan
Run Semgrep security scanning:
semgrep scan --config auto --json -o semgrep-report.json
Generated report:
semgrep-report.json



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
  The original code was building SQL queries using direct string concatenation with user inputs. Because of this, attackers could easily exploit it by typing payloads like "  `` ' OR 1=1 -- ``    "into the login fields, letting them bypass authentication and log in as an admin without even knowing the password.
- **The Remediation / Fix:** 
  We secured the login route by replacing the vulnerable string-based query with a **parameterized query** using Sequelize placeholders (`?`). Additionally, we integrated `security.hash()` to safely hash the password before checking it against the database. This ensures that user inputs are treated strictly as data rather than executable SQL commands.

### 2. Remediate IDOR Vulnerability in Basket Retrieval
- **Vulnerability Summary**
  - **Type:** IDOR (Insecure Direct Object Reference) / BOLA
  - **Endpoint:** `/rest/basket/:id` (`routes/basket.ts`)
  - **What happened:** A logged-in user could easily view other users' shopping baskets just by changing the basket ID in the URL.
- **The Fix**
  - **How we fixed it:** Added a check to verify whether the logged-in user actually owns the requested basket ID (`loggedInUser.bid`).
  - **Code snippet:**
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

### 5. Security Misconfiguration (Root Container) Remediation
- **Vulnerable File:** `Dockerfile` / `docker-compose.yml`
- **The Vulnerability:** 
  The container was originally configured to run with default root privileges (User ID 0). If an attacker managed to compromise the web application, they could potentially execute arbitrary commands as the root user inside the container, increasing the risk of container escape and host system takeover.
- **The Remediation / Fix:** 
  We secured the deployment configuration by updating the `Dockerfile` and `docker-compose.yml` files to explicitly drop root privileges. The application process is now configured to run under a non-privileged system user ID (`65532`). This enforces the principle of least privilege, ensuring that even if the container is compromised, the attacker's access remains severely restricted.


### Member 4 Artifacts: DevSecOps CI/CD Pipeline

**Overview**
A DevSecOps pipeline was implemented using GitHub Actions to automatically detect security issues during development.
- **Workflow location:** `.github/workflows/`
- The pipeline contains four automated security gates.

#### Security Gates
1. **SAST - Static Application Security Testing**
   - **Tool:** Semgrep
   - **Purpose:** 
     - Detect vulnerable code patterns
     - Identify security weaknesses
     - Scan source code automatically

2. **SCA - Software Composition Analysis**
   - **Tool:** npm audit
   - **Purpose:** 
     - Scan third-party dependencies
     - Identify vulnerable packages
     - Detect outdated libraries

3. **Secrets Scanning**
   - **Purpose:** Detect exposed sensitive information:
     - API keys
     - Passwords
     - JWT secrets
     - Access tokens

4. **Container Security Scanning**
   - **Tool:** Trivy
   - **Purpose:** 
     - Scan Docker images
     - Detect OS vulnerabilities
     - Identify package security issues

---

### Project Execution & Setup Instructions

**Prerequisites**
Required software:
- Docker
- Docker Compose
- Node.js v18+
- Python 3.x

**Running the Application**
Build and start containers:
```bash
docker-compose up --build