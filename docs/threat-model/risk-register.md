# Risk Register & Assessment Matrix — OWASP Juice Shop

## Risk Assessment Methodology
Risks are evaluated using Likelihood and Impact scores ranging from Low (1) to High (3):
- **Risk Score** = Likelihood × Impact
- **Criticality Levels:** High (6-9), Medium (3-4), Low (1-2)

---

## Risk Register

| Risk ID | Threat Reference | Risk Scenario | Likelihood (1-3) | Impact (1-3) | Risk Score | Risk Level | Proposed Mitigation | Status |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :--- | :---: |
| **RR-01** | TH-04 (SQLi) | Attacker injects malicious SQL statements to extract full database data. | 3 (High) | 3 (High) | **9** | **CRITICAL** | Parameterize all queries via Sequelize ORM; run static code analysis (Bandit/Semgrep). | Pending Fix |
| **RR-02** | TH-06 (BOLA/IDOR) | User accesses/modifies other users' account data by manipulating IDs in REST API. | 3 (High) | 3 (High) | **9** | **CRITICAL** | Implement strict session ownership checks on backend routes. | Pending Fix |
| **RR-03** | TH-01 (JWT Weakness) | Attacker crafts forged JWT tokens to bypass authentication. | 2 (Medium) | 3 (High) | **6** | **HIGH** | Use strong secret keys and proper JWT signature validation algorithms. | Pending Fix |
| **RR-04** | TH-05 (DoS / Rate Limit) | Automated script spams login API causing service outage. | 3 (High) | 2 (Medium) | **6** | **HIGH** | Add middleware for API rate limiting on login/sensitive endpoints. | Pending Fix |
| **RR-05** | TH-06 (Root Container) | Attacker exploits application flaw to gain root access on container host. | 2 (Medium) | 3 (High) | **6** | **HIGH** | Update Dockerfile to run application under a non-privileged user account. | Pending Fix |