# OWASP Juice Shop Risk Register

## 1. Purpose

This risk register evaluates and prioritizes the security threats identified in the OWASP Juice Shop STRIDE threat model.

Each threat is assessed using likelihood and impact ratings. The resulting risk score is used to determine the overall risk level and prioritization of security controls.

## 2. Risk Assessment Method

The following formula is used to calculate the risk score:

Risk Score = Likelihood x Impact

Both likelihood and impact are rated on a scale from 1 to 5.

### Likelihood Scale

| Rating | Level | Description |
|---|---|---|
| 1 | Rare | The threat is very unlikely to occur |
| 2 | Unlikely | The threat could occur but is not expected frequently |
| 3 | Possible | The threat may occur under realistic conditions |
| 4 | Likely | The threat has a strong possibility of occurring |
| 5 | Very Likely | The threat is highly likely to occur |

### Impact Scale

| Rating | Level | Description |
|---|---|---|
| 1 | Negligible | Very little effect on the application or users |
| 2 | Minor | Limited effect with minimal security consequences |
| 3 | Moderate | Noticeable impact on users, data or application operation |
| 4 | Major | Significant impact on sensitive data, accounts or service availability |
| 5 | Severe | Critical impact involving privileged access, major data compromise or serious system damage |

### Risk Level Classification

| Risk Score | Risk Level |
|---|---|
| 1-4 | Low |
| 5-9 | Medium |
| 10-16 | High |
| 17-25 | Critical |

## 3. Risk Register

| ID | Threat | STRIDE Category | Likelihood | Impact | Risk Score | Risk Level | Proposed Controls |
|---|---|---|---:|---:|---:|---|---|
| T1 | Attacker impersonates a legitimate user through compromised or guessed credentials | Spoofing | 4 | 4 | 16 | High | Strong authentication, secure password storage, session protection and login rate limiting |
| T2 | Attacker manipulates requests or input to modify application or database data without authorization | Tampering | 4 | 5 | 20 | Critical | Input validation, parameterized queries, server-side validation and least privilege |
| T3 | Malicious actions cannot be reliably attributed to a user because of insufficient audit logging | Repudiation | 3 | 3 | 9 | Medium | Security event logging, protected audit logs and reliable timestamps |
| T4 | Sensitive information is exposed through weak access controls, insecure responses or error handling | Information Disclosure | 4 | 5 | 20 | Critical | Strong authorization, secure error handling, restricted API responses and data protection |
| T5 | Excessive or resource-intensive requests reduce application availability | Denial of Service | 3 | 4 | 12 | High | Rate limiting, resource limits, request validation and monitoring |
| T6 | A normal user gains unauthorized access to privileged or administrative functionality | Elevation of Privilege | 4 | 5 | 20 | Critical | Server-side authorization, role-based access control, least privilege and protected admin endpoints |

## 4. Risk Justification

### T1 - Spoofing

Likelihood: 4 - Likely

Authentication functionality is directly exposed to users and may be targeted using stolen, guessed or reused credentials.

Impact: 4 - Major

Successful impersonation could allow an attacker to access another user's account, personal information and account functionality.

Risk Score:

4 x 4 = 16

Risk Level: High

---

### T2 - Tampering

Likelihood: 4 - Likely

The application accepts user-controlled input and requests, creating opportunities for attackers to attempt unauthorized manipulation of application data.

Impact: 5 - Severe

Successful tampering could affect important application or database information and compromise the integrity of transactions or stored data.

Risk Score:

4 x 5 = 20

Risk Level: Critical

---

### T3 - Repudiation

Likelihood: 3 - Possible

If important security and administrative actions are not sufficiently logged, malicious activities may not be reliably linked to a specific user.

Impact: 3 - Moderate

Insufficient accountability can make security investigations difficult and reduce the ability to identify malicious actions.

Risk Score:

3 x 3 = 9

Risk Level: Medium

---

### T4 - Information Disclosure

Likelihood: 4 - Likely

A web application processes user, authentication and application data that may become exposed if authorization or error handling controls are insufficient.

Impact: 5 - Severe

Exposure of sensitive information could compromise user privacy, authentication information or confidential application data.

Risk Score:

4 x 5 = 20

Risk Level: Critical

---

### T5 - Denial of Service

Likelihood: 3 - Possible

An attacker may attempt to send excessive or resource-intensive requests to the application.

Impact: 4 - Major

A successful denial-of-service attack could make the application slow or unavailable to legitimate users.

Risk Score:

3 x 4 = 12

Risk Level: High

---

### T6 - Elevation of Privilege

Likelihood: 4 - Likely

Privileged application functions may be targeted by normal users attempting to bypass authorization controls.

Impact: 5 - Severe

Successful privilege escalation could allow an attacker to perform administrative actions, access restricted information or modify sensitive application data.

Risk Score:

4 x 5 = 20

Risk Level: Critical

## 5. Risk Prioritization

Based on the calculated risk scores, the threats should be addressed in the following priority groups:

### Critical Priority

- T2 - Tampering
- T4 - Information Disclosure
- T6 - Elevation of Privilege

These risks require the strongest security controls because successful exploitation could significantly affect sensitive data, application integrity or privileged functionality.

### High Priority

- T1 - Spoofing
- T5 - Denial of Service

These risks should also be addressed with appropriate preventive and monitoring controls.

### Medium Priority

- T3 - Repudiation

Although the direct technical impact is lower than the critical risks, sufficient security logging is important for accountability and incident investigation.

## 6. Relationship to Security Testing

The risk register provides guidance for the vulnerability assessment and secure coding activities in the project.

The highest-priority risks should receive particular attention during vulnerability testing.

For example:

- Authentication testing can address spoofing risks.
- Input validation and injection testing can address tampering risks.
- Access-control testing can address information disclosure and elevation-of-privilege risks.
- Logging checks can address repudiation risks.
- Rate-limiting and resource-control testing can address denial-of-service risks.

The results of vulnerability testing can later be used to review and refine the likelihood and impact ratings in this risk register.

## 7. Conclusion

The risk assessment identifies tampering, information disclosure and elevation of privilege as the highest-priority security concerns in the current threat model.

Spoofing and denial of service are classified as high risks, while repudiation is classified as a medium risk.

The proposed security controls should be implemented and validated through secure coding, vulnerability testing and the DevSecOps security pipeline.