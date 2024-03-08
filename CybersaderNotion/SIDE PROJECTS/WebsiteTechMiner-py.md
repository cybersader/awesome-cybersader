# WebsiteTechMiner-py

---

[https://github.com/cybersader/WebsiteTechMiner-py](https://github.com/cybersader/WebsiteTechMiner-py)

---

# WebsiteTechMiner-py ⛏

A little Python project to automate gathering website profiling data from “BuiltWith” & “Wappalyzer” for tech stack information, technographic data, website reports, website tech lookups, website architecture lookups, etc.

### Uses of WebsiteTechMiner

- 👁️ Data Privacy Activities
    - Vendor Discovery for Websites
    - Risk Management
    - Data Privacy Read-Ahead Material for Privacy Assessments
- 🖥️ Cyber Security Activities
    - Reconnaissance
    - OSINT
- 🗺️ Other Discovery Activities
    - Business Intelligence
    - Marketing Activities
    - Competition Analysis

### Generated Data Fields:

***[ domain , tech_profiler_tool_used , category , technology_name , description (if one exists) ]***

All data is exported into the CSV file designated in the config file.

![https://user-images.githubusercontent.com/106132469/176921390-9b6c36c1-a97c-4bf8-9362-7eb356013238.png](https://user-images.githubusercontent.com/106132469/176921390-9b6c36c1-a97c-4bf8-9362-7eb356013238.png)

## Getting Started

### ⬇ Installation

- Use Git or download this repo
- Git
    - Open `cmd` or your terminal of choice
    - `cd` to the folder you want to `git clone` to
    - `git clone https://github.com/cybersader/WebsiteTechMiner-py.git`
- Download
    - Simply download this repo, as is.

### Requirements

- Python dependencies:
    - Make sure you’ve installed the project
    - `cd` into the project
    - If you don’t have Python, then you’re going to need it to use pip [https://www.python.org/downloads/](https://www.python.org/downloads/)
    - `pip install -r requirements.txt`

### ✉ TempMail for Accounts

- Make an email with [https://temp-mail.org/en/](https://temp-mail.org/en/)
- No need to use your real email for short-term discovery projects.

### DO NOT be fradulent

- I’m not going to design any automated fradulent solutions to automatically generate temporary accounts and emails.
- If you are trying to process very large amounts of URLs, then please purchase plans from these tech lookup services.

### Setting up Wappalyzer

- Create a Wappalyzer Account - [https://www.wappalyzer.com/](https://www.wappalyzer.com/)
- Go to [https://www.wappalyzer.com/apikey/](https://www.wappalyzer.com/apikey/)
- Create and copy the API key into the `WebTechMinerNG_setup.json` file using a notepad or editor
- Make sure to put it in the quotes after `wappalyzer-API-key`

### Setting up BuiltWith

- Create a BuiltWith Account - [https://builtwith.com/](https://builtwith.com/)
- Go to [https://api.builtwith.com/](https://api.builtwith.com/)
- Create and copy the API key into the `WebTechMiner_setup.json` file using a notepad or editor
- Make sure to put it in the quotes after `builtwith-API-key`

### 💵 Buying API Credits

- BuiltWith API Credits are relatively cheap for what you get
- Go to [https://builtwith.com/api-credits](https://builtwith.com/api-credits)
- You can buy 2,000 API credits (2000 tech lookups) for 💵99$

## Usage

### ***WebsiteTechMiner-py currently has 2 options:***

- s, “single” (analyze a single domain)
- b, “bulk” (analyze a list of domains using a CSV file)
    - put them into rows, columns, or a combination of the two in Excel (it doesn’t matter).

### Single Website Lookup

### command:

`python WebsiteTechMiner.py -s example.com`

### Bulk Website Lookup

### ⚠🛑⚠🛑⚠🛑⚠🛑

- ***Be careful running this***:
    - if you don’t have a paid plan, then you will quickly go over your limits
    - This is not recommended unless you have a high limit for API credits with:
        - Wappalyzer, Builtwith

### command:

`python WebsiteTechMiner.py -b example_website_list.csv`

## 💎 Future Developments

### 🐛 Bugs & TODOs

- Stop WTM if you run out of API credits for all tools
- Error fidelity on error prints
- Multiple API tokens in config file or some csv file
- More fields from APIs to csv
- Ability to use flags for fields
- Unlimited domains on command line
- http and https flags
- Default command with domains after
- Add throttling features for when requests start dropping Wapp and BW

### 🌐 Discovery

- Recursive Subdomain discovery option
- Connected website discovery
- Risk Management
    - Assumed PI discovery
        - OneTrust Vendorpedia API
        - Other Vendor Risk Management DBs & APIs
    - Security Risk Score Attribution
    - Other additional information to pull in from external sources
        - Policies
        - Available Data Processing Agreement links?