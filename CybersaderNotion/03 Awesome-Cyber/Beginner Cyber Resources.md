---
publish: true
---
# Beginner Cyber Resources

# Penetration Testing

## Introduction to Penetration Testing – Infrastructure

> Excerpt
> 
> 
> One of the most common types of pen tests is the infrastructure pen test. All companies have external and/or internal facing assets holding customer and employee information, business-critical data, backups, and more. It's highly important to test the security of these assets  to make sure attackers don't get anywhere near this data.
> 

---

One of the most common types of pen tests is the infrastructure pen test. All companies have external and/or internal facing assets holding customer and employee information, business-critical data, backups, and more. It's highly important to test the security of these assets  to make sure attackers don't get anywhere near this data.

### What's on this page?

1. What is infrastructure?
2. Scope
3. The goal
4. The approach
5. Interesting services
6. In this lab

### What is infrastructure?

A computer infrastructure, or ‘infra’, is the sum of all components that facilitate the operation and management of a specific service. These components include hardware, software, storage devices and network components. When it comes to pen testing, the most common setups are basic infrastructure and cloud infrastructure.

### Basic infrastructure

In the basic infrastructure model, all hardware, storage devices and network components are owned by the company and reside either on their premises or in data centres. Since everything is managed by the company, depending on the size, it is more likely to find cases of outdated software, either because of improper patching policy or because the specific asset was not added to the correct inventory.

Furthermore, unless the network is properly segregated, gaining access to employee workstations and the intranet can be possible after setting a foothold in the internal network. Even with correct segregation, there may be cases when this can be bypassed with the correct level of access within the network (e.g. domain administrator).

### The cloud

In the cloud model, all resources (storage, computer, network) are centralised and are usually accessed remotely by users. When it comes to pen testing, it gets a bit more difficult when the targets reside in the cloud. Generally, data and networks are better segregated than with the basic infra model, such that it might be impossible to break out of the environment.

Also, with cloud setups (and depending on the provider), outdated software is easier to pick up by the maintainers and you will generally not find many critical vulnerabilities this way. However, everything must still be configured by someone and misconfigurations can still prove devastating for a company, so with cloud, these are the things you'd generally target.

### Scope

When it comes to infra pen testing, there are three options depending on the client's specifications:

- **Internal** – Usually VPN access to the internal network is given to the auditor so that the security of internal assets can be assessed.
- **External** – Involves testing in-scope assets over the internet. Depending on the case, some allow-listing might be necessary on the client's side, but this type of testing is still performed without the need for a VPN.
- **Internal + External** – Sometimes the client will want to assess the overall security of their network, so they might ask for a full infrastructure pen test, which means the goal is to test the external network and, if possible, move to the internal one once access is gained.

The client should specify all in-scope and out-of-scope IP addresses and ports and types of tests that can be performed or not. If the test is external only, then the client should be contacted once the perimeter is broken to discuss next steps.

### The goal

As with all pen tests, the goal can be defined by the client, but generally, depending on the type of test, the goal can be:

**Breaking the perimeter** – This applies to external tests and it involves gaining access to an in-scope machine that is also connected to the internal network or demilitarised zone (DMZ).

**Taking over the network (generally known as 'owning' the network)** – This applies to internal tests or when perimeter was broken, and the scope specifically allows the auditor to continue with internal testing. Be it a Linux cluster, Active Directory or something else entirely, there is generally a highest level of access (e.g. LDAP Administrator, Domain Administrator) and achieving it would be terrible in the wrong hands.

These two goals are generally the target for infrastructure penetration tests. However, you should never forget about low and medium findings.

### The approach

When it comes to pen testing, every provider has its own methodologies and tools. However, there are general guidelines that you should always take into consideration. With infrastructure, at a high level, these are:

**Understand the technology** – Take time to research the technology used to understand your scope. Find the possible vulnerabilities or misconfigurations specific to what you're testing. The internet is your friend. Try to find articles describing how the target technology is configured (and how it can be abused) or blog posts from professionals that have tested it in the past.

**Understand the purpose** – Every computer infrastructure has a purpose; a service it supports. Knowing why is as important as knowing how devices are connected together. Understanding this purpose is key when pen testing infra in order to better assess the impact of any discovered vulnerability.

**Enumeration is key** – As with every sort of engagement, enumeration is the most important phase. Proper enumeration is key in finding and eventually exploiting issues. This involves discovering devices (if not specifically defined in the scope), scanning for open ports, and running services.

**Everything counts** – Breaking the perimeter is not always the most important bit. Sometimes a critical vulnerability can arise, for example, from getting access to business-critical information. Document any vulnerability no matter how small so that your client is aware and can prioritise their fix.

**Keep detailed notes** – Depending on the size of the scope, one can easily get lost in information. Keep detailed notes of your scans and findings. This will help with both exploitation and final report.

**Bonus: Low-hanging fruit** – Once the enumeration part is properly covered, the easiest and most efficient way to start is to go for the most obvious services and possible vulnerabilities. For example, connecting to an open FTP server and browsing the data will almost always pay off more than trying to brute force the root password against an SSH server.

### Interesting services

There are a number of services that are known to have misconfigurations and should be enumerated thoroughly. The most common are:

- **Hypertext Transfer Protocol (HTTP/HTTPS)** – Web is part of infrastructure and an RCE on an outdated webserver or an SQL injection in the website might be your way in.
- **File Transfer Protocol (FTP)** – Anonymous login can be your friend, especially if the administrators forgot to disable it. Also, there are other interesting things one can do with this service, such as the FTP bounce attack.
- **Server Message Block (SMB)** – Anonymous login can also affect SMB servers and a lot of important information is generally stored on these servers.
- **Secure Shell (SSH)** – A good way to run some dictionary attacks, given you use some delay between attempts and don't stress the client's servers too much.
- **Telnet** – The “oldie, but goldie” of infra. Generally looked at as an unencrypted SSH, brute forcing applies here too, with the occasional RCE (Remote Code Execution) exploit.
- **Simple Mail Transfer Protocol (SMTP)** – Open SMTP servers can help with user enumeration, which can then be brute forced using other services.
- **Domain Name System (DNS)** – With certain misconfigurations this can be quite a good source of information, since a zone transfer can get you a nice list of domain names and their corresponding IP addresses.

Of course, depending on the case there might be other interesting services. It's important to know what you're up against and how you can abuse several small issues to create a big one that can leverage unauthorised access to your targets.