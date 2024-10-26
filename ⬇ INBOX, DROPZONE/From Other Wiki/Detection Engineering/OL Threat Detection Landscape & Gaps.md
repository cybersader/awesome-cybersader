---
aliases: 
tags: 
publish: true
date created: Sunday, June 30th 2024, 9:50 pm
date modified: Saturday, October 26th 2024, 2:21 pm
---
Trying to figure out gaps in detection.

# Detection Gap Analysis

## DeTT&CT Overview & Methods

![](__attachments/Detection%20Engineering/IMG-OL%20Threat%20Detection%20Landscape%20&%20Gaps-2024063021-4.png)

## Detailed Gap Analysis Process

### Gather Data Sources

#### Obtain Tech Stack and All Types of Security Events/Logs

- Gather sensors/logs and security tech stack

- Initially, the team gathers examples, files, configs, and other general knowledge or information about all the systems used for threat detections.  

#### Use Dettectinator and DETT&CT Editor to Initialize ATT&CK YAML

- Notice there is no standard for these data sources.  This is all subjective. 
	- Use Mitre Attack
- This information can then be put into a DeTT&CT YAML via both...
	- The DeTT&CT Editor
	- Dettectinator - automatically generates items from various detection system config files (Splunk, etc.)
- Initial YAML from DeTT&CT loaded into the ATT&CK Navigator as a layer

### Score Data Utility, Visibility, and Map Detections to Mitre

#### Decide on YAML File Approach

- Start with
	- mapping and scoring detections
	- OR
	- data sources and data quality
- Single YAML file approach for DeTT&CT Editor to ATT&CK Navigator with techniques and data sources
	- technique_administration_Windows-workstations.yaml
	- data_source_administration_Windows-workstations.yaml

#### Prioritize on Techniques Based on Additional Intel

- Utilize intel for prioritization
	- The organization can use various threat intel sources to find APTs that apply to their company or vertical
	- Use commands to find which data sources in ATT&CK cover the most techniques or ones you care about
		- https://github.com/rabobank-cdc/DeTTECT/wiki/How-to-use-the-framework#which-data-source-are-covering-the-most-techniques 

#### Scoring - Data Sources by Data Quality and Utility

#### Scoring - Visibility per ATT&CK Technique

- based on data source x data quality

https://github.com/rabobank-cdc/DeTTECT/wiki/How-to-use-the-framework#score-visibility
	- Within the resulting YAML file, you can choose to adjust the visibility score per technique based on expert knowledge and the previously defined quality of your data sources (in this same YAML file you can also score detection). There are several reasons why manual scoring can be required. For example:
		- You may have 1 data source available from the total 3 data sources mentioned within a particular ATT&CK technique. However, in some cases that single data source could not be sufficient for at least a minimum detection level for that technique. And hence, the visibility score based on the number of data sources needs to be adjusted.
		- The quality of a particular data source is considered too low to be useful for visibility.
		    - With the power of an EQL query, you can influence which data sources are included in the process of auto-generating visibility scores. For example, to exclude data sources with low data quality. For more info see: [Customize the rough visibility score](https://github.com/rabobank-cdc/DeTTECT/wiki/eql#customise-the-rough-visibility-score).
		- You do have a certain level of visibility on a technique. But this is based on a data source currently not mentioned within MITRE ATT&CK for that particular technique.

	- Visibility scores are rated from 0 to 4. You can find the explanation of the scores here: [visibility scores](https://github.com/rabobank-cdc/DeTTECT/wiki/Visibility-scoring). Use the score that fits best. It is possible to have multiple scores per technique that apply to different systems using the [`applicable_to`](https://github.com/rabobank-cdc/DeTTECT/wiki/YAML-administration-techniques_v1_2#visibility-object) property. (Please note that within the same technique, a system can only be part of one `applicable_to` key-value pair). In addition, you can keep track of changes in the scores by having multiple [`score` objects](https://github.com/rabobank-cdc/DeTTECT/wiki/YAML-administration-techniques_v1_2#score-object) within a [`score_logbook`](https://github.com/rabobank-cdc/DeTTECT/wiki/YAML-administration-techniques_v1_2#visibility-object)

#### Look at Visibility Coverage

- https://github.com/rabobank-cdc/DeTTECT/wiki/How-to-use-the-framework#visibility-coverage

#### Score detection and determine detection coverage - per technique

- https://github.com/rabobank-cdc/DeTTECT/wiki/How-to-use-the-framework#score-detection-and-determine-your-detection-coverage 
	- Determine your detection score per technique in the [technique administration YAML file](https://github.com/rabobank-cdc/DeTTECT/wiki/YAML-administration-techniques_v1_2). This is a manual exercise. Detection scores are rated from -1 to 5. The explanation of the scores can be found here: [detection scores](https://github.com/rabobank-cdc/DeTTECT/wiki/Detection-scoring). Use the score that fits best. It is possible to have multiple scores per technique that apply to different systems using the [`applicable_to`](https://github.com/rabobank-cdc/DeTTECT/wiki/YAML-administration-techniques_v1_2#detection-object) property. (Please note that within the same technique, a system can only be part of one `applicable_to` key-value pair). In addition, you can keep track of changes in the scores by having multiple [`score` objects](https://github.com/rabobank-cdc/DeTTECT/wiki/YAML-administration-techniques_v1_2#score-object) within a [`score_logbook`](https://github.com/rabobank-cdc/DeTTECT/wiki/YAML-administration-techniques_v1_2#detection-object)

	- A next step can be to generate an [ATT&CK Navigator](https://mitre-attack.github.io/attack-navigator/#comment_underline=false&metadata_underline=false) layer file based on your scores you have [determined](https://github.com/rabobank-cdc/DeTTECT/wiki/Detection-coverage) per technique in the [YAML administration file](https://github.com/rabobank-cdc/DeTTECT/wiki/YAML-administration-techniques_v1_2). The detection scores in the YAML file are also used to colour the techniques in the layer file.

### Analyze Detection Gaps

- Summarize detection gaps from the ATT&CK Navigator
	- use overlays and combinations of layers

## Tech Stack - Data Source, Sensor, Platform, and Collection Layer Curation (Coverage for Techniques per Tool)

### Tech

- Sysmon
	- Use a sysmon config file with dettectinator to approximate coverage
- SentinelOne
	- 
- Abnormal
	- 
- Okta
	- 
- Pentera
	- 
- Orca
	- 
- Rapid7
	- 
- Cyberhaven
	- 
- Cisco Umbrella
	- 
- Wafs
	- 
- Agari
	- 
- Ironport
	- 
- VMware NSX
	- 

### Dettectinator

Currently for detections, we have plugins for the following tools:

- Microsoft Sentinel: Analytics Rules (API)
- Microsoft Defender: Alerts (API)
- Microsoft Defender: Custom Detection Rules (API, _under construction_)
- Microsoft Defender for Identity: Detection Rules (loaded from MS Github)
- Tanium: Signals (API)
- Elastic Security: Rules (API)
- Suricata: rules (file)
- Suricata: rules summarized (file)
- Sigma: rules (folder with YAML files)
- Splunk: saved searches config (file)
- CSV: any csv with detections and ATT&CK technique ID's (file)
- Excel: any Excel file with detections and ATT&CK technique ID's (file)

For data sources, you can use the following plugins:

- Defender for Endpoints: tables available in Advanced Hunting (based on OSSEM)
- Windows Sysmon: event logging based on Sysmon (based on OSSEM and your Sysmon config file)
- Sentinel Window Security Auditing: event logging (based on OSSEM and EventID's found in your logging)
- CSV: any csv with ATT&CK data sources and products (file)
- Excel: any Excel file with ATT&CK data sources and products (file)

## Detailed Gap Analysis Implementation

### Large-Scale Approach

- Gather tech stack 
- Use DeTT&CT Editor and dettectinator to fill in current coverage from tools we are already using
	- Use dettectinator, to make plugins and use them to ingest detection content and configs to automatically make DeTTECT YAML files
		- https://github.com/siriussecurity/dettectinator/wiki/Using-plugins
	- Map everything to product and accurately to endpoints
	- Use DeTT&CT Editor to make certain techniques higher priority based on..
		- threat intel
		- reports
	- Export to YAML using DeTTECT CLI and import into ATT&CK Navigator
- Look at initial gaps
	- Exclude platforms and tech we don't care about in the Navigator
- Overlay with sysmon coverage to look for places to cover via sysmon configs or example heatmaps
	- Methods
		- [Sensor Mapping — Sensor Mappings to ATT&CK v1.0.0 documentation](https://center-for-threat-informed-defense.github.io/sensor-mappings-to-attack/levels/#view-mappings) - maps certain log sources that are static in detection capability
		- Sysmon config + dettectinator
			- generate coverage map from sysmon config file
	- Choose event IDs to use with sysmon or other sensors

### Security Tech Stack, Dettectinator

> Gather Security Data Sources & Static Sensor Content

#### Curate Tech Stack and Security Events/Logs/Sensors

##### Tech Stack

- Sysmon
- SentinelOne
- Abnormal
- Okta
- Pentera
- Orca
- Rapid7
- Cyberhaven
- Cisco Umbrella
- Wafs
- Agari
- Ironport
- VMware NSX
- VendorIntelligrator
- Additional Automation
- Cloud Platforms
	- Azure
	- AWS
	- GCP

##### Generate YAMLs for DETT&CT with Dettectinator - Only for certain detection content (e.g. Sysmon)

- Only a sysmon config is applicable here
- Find a sysmon config as an example for what you will use
	- https://github.com/blackhillsinfosec/EventLogging/blob/master/DEFCON3/sysmon/sysmonconfig.xml - defcon 3 sysmonconfig from BHIS
	- https://raw.githubusercontent.com/olafhartong/sysmon-modular/master/sysmonconfig.xml - default sysmon modular config
- Git clone the Mitre CTI repo for STIX 2.0
	- This is what will be used for up-to-date mitre information
	- [Releases · mitre/cti](https://github.com/mitre/cti)
- Generate YAML with dettectinator
	- git clone [siriussecurity/dettectinator: Dettectinator - The Python library to your DeTT&CT YAML files.](https://github.com/siriussecurity/dettectinator) to your local directory
	- follow directions from [Dettectinator as a CLI tool · siriussecurity/dettectinator Wiki](https://github.com/siriussecurity/dettectinator/wiki/Dettectinator-as-a-CLI-tool) 
	- py -m venv .venv
	- py -m pip install -r requirements.txt
	- Set up config.json file
		- Use forward slashes
		- Example with sysmon config
			- ![](__attachments/Detection%20Engineering/IMG-OL%20Threat%20Detection%20Landscape%20&%20Gaps-2024063021-5.png)
	- Run command
		- `(.venv) C:\Users\Benjamin.Rader\Documents\Tools\dettectinator>python dettectinator\dettectinator.py -c examples\config.json -s "C:\Users\Benjamin.Rader\Documents\Tools\cti"`

#### Sysmon Config Coverage - Use Dettectinator and DETT&CT Editor to Initialize ATT&CK YAML and Navigator Layer - Dettectinator Compatible Detection Content Only

- This information can then be put into a DeTT&CT YAML via both...
	- The DeTT&CT Editor
	- Dettectinator - automatically generates items from various detection system config files (Splunk, etc.)


- Use DeTTECT cli to export YAML for ATT&CK Navigator for data sources (in this case, sysmon coverage based on the sysmon config file)
	- `git clone https://github.com/rabobank-cdc/DeTTECT.git`
	- `python dettect.py ds -fd "C:\Users\Benjamin.Rader\Downloads\data_sources_new.yaml" --local-stix-path "C:\Users\Benjamin.Rader\Documents\Tools\cti" -l`
	- `File written:   output/data_sources_data_source_administration_windows-workstations.json`

- Initial YAML from DeTT&CT loaded into the ATT&CK Navigator as a layer
	- ![](__attachments/Detection%20Engineering/IMG-OL%20Threat%20Detection%20Landscape%20&%20Gaps-2024063021-6.png)
- Result:
	- "The data sources are mapped to the ATT&CK techniques to visualise your rough visibility coverage. This gives you a rough overview of your potential visibility coverage. Often, this is the first step in getting an overview of your actual visibility coverage" - https://github.com/rabobank-cdc/DeTTECT/wiki/Data-sources#visualise-in-the-attck-navigator
	- 

#### Curate Existing MITRE ATT&CK heatmaps for ATT&CK Navigator

##### Misc Heatmaps

- [https://github.com/center-for-threat-informed-defense/sensor-mappings-to-attack](https://github.com/center-for-threat-informed-defense/sensor-mappings-to-attack)
	- https://github.com/center-for-threat-informed-defense/sensor-mappings-to-attack/tree/main/mappings/layers/enterprise
- [https://github.com/center-for-threat-informed-defense/attack_to_cve](https://github.com/center-for-threat-informed-defense/attack_to_cve)
- [https://github.com/center-for-threat-informed-defense/security-stack-mappings](https://github.com/center-for-threat-informed-defense/security-stack-mappings)

##### Mitre Engenuity ATT&CK Evals

- Rapid7 and SentinelOne
	- https://attackevals.mitre-engenuity.org/results/enterprise?vendor=rapid7&vendor=sentinelone&evaluation=wizard-spider-sandworm&scenario=1
	- 
- Outdated Attack Evals Booklet
	- [https://attackevalscdnendpoint.azureedge.net/publicsiteimages/Using-Results-to-Evaluate-Endpoint-Detection-Products_Booklet.pdf](https://attackevalscdnendpoint.azureedge.net/publicsiteimages/Using-Results-to-Evaluate-Endpoint-Detection-Products_Booklet.pdf)

##### By Security Tech

- Atomic Red Team
	- [ATT&CK Coverage - Explore Atomic Red Team](https://atomicredteam.io/coverage/) 
- Sysmon
	- Use a sysmon config file with dettectinator to approximate coverage
	- All Sysmon coverage
		- https://github.com/center-for-threat-informed-defense/sensor-mappings-to-attack/blob/main/mappings/layers/enterprise/CloudTrail-heatmap.json
- SentinelOne
	- [https://attackevals.mitre-engenuity.org/results/enterprise?vendor=sentinelone&evaluation=turla&scenario=1](https://attackevals.mitre-engenuity.org/results/enterprise?vendor=sentinelone&evaluation=turla&scenario=1)
	- https://attackevals.mitre-engenuity.org/results/enterprise?vendor=sentinelone&evaluation=turla&scenario=2
	- https://attackevals.mitre-engenuity.org/results/enterprise?vendor=sentinelone&evaluation=turla&scenario=3
	- https://attackevals.mitre-engenuity.org/results/enterprise?vendor=sentinelone&evaluation=apt3&scenario=1 
	- https://attackevals.mitre-engenuity.org/results/enterprise?vendor=sentinelone&evaluation=apt3&scenario=2
	- https://attackevals.mitre-engenuity.org/results/enterprise?vendor=sentinelone&evaluation=apt29&scenario=1
	- https://attackevals.mitre-engenuity.org/results/enterprise?vendor=sentinelone&evaluation=apt29&scenario=2
	- https://attackevals.mitre-engenuity.org/results/enterprise?vendor=sentinelone&evaluation=carbanak-fin7&scenario=1
	- https://attackevals.mitre-engenuity.org/results/enterprise?vendor=sentinelone&evaluation=carbanak-fin7&scenario=2
	- https://attackevals.mitre-engenuity.org/results/enterprise?vendor=sentinelone&evaluation=carbanak-fin7&scenario=2
	- https://attackevals.mitre-engenuity.org/results/enterprise?vendor=sentinelone&evaluation=carbanak-fin7&scenario=3
	- https://attackevals.mitre-engenuity.org/results/enterprise?vendor=sentinelone&evaluation=wizard-spider-sandworm&scenario=1
	- https://attackevals.mitre-engenuity.org/results/enterprise?vendor=sentinelone&evaluation=wizard-spider-sandworm&scenario=2
	- https://attackevals.mitre-engenuity.org/results/enterprise?vendor=sentinelone&evaluation=wizard-spider-sandworm&scenario=3
- Abnormal
- Okta
- Pentera
- Orca
- Rapid7
- Cyberhaven
- Cisco Umbrella
- Wafs
- Agari
- Ironport
- VMware NSX
- VendorIntelligrator
- Additional Automation
- Cloud Platforms
	- Azure
		- https://github.com/center-for-threat-informed-defense/security-stack-mappings/blob/main/mappings/Azure/layers
		- Cloudtrail
			- https://github.com/center-for-threat-informed-defense/sensor-mappings-to-attack/blob/main/mappings/layers/enterprise/CloudTrail-heatmap.json
	- AWS
		- https://github.com/center-for-threat-informed-defense/security-stack-mappings/blob/main/mappings/AWS/layers
	- GCP
		- https://github.com/center-for-threat-informed-defense/security-stack-mappings/blob/main/mappings/GCP/layers

### Score Detections and Visibility of Sensors with DeTTECT GUI

> Evaluate Sensor Content, Score Data Utility, Visibility, and Map Detections to Mitre

#### Decide on DeTT&CT YAML File Approach

- Start with
	- data sources and data quality
	- OR
	- mapping and scoring detections
	
- Single YAML file approach for DeTT&CT Editor to ATT&CK Navigator with techniques and data sources
	- technique_administration_Windows-workstations.yaml
	- data_source_administration_Windows-workstations.yaml

#### Curate and Evaluate Data Sources into DeTTECT YAML with GUI

> Use existing Mitre ATT&CK heatmaps, communicate with SMEs , map product/sensor/security tools to data sources that they provide intel and detection on.

##### SentinelOne Data Sources

- Creating a tool in jsonaut to parse Mitre evals into DeTTECT YAML files
	- https://github.com/rabobank-cdc/DeTTECT/wiki/YAML-administration-data-sources 
	- https://github.com/rabobank-cdc/DeTTECT/wiki/YAML-administration-techniques
	- https://github.com/rabobank-cdc/DeTTECT/wiki/YAML-administration-groups
- Jsonaut process
	- Jsonaut runs three functions with various configs 
	- Firstly, wrap the mitre JSON eval file in brackets to work with our JSON flattening function
	- Second, flatten the JSON file completely with object recursion and array explosion
		- essentially generates an entity or row for each unique occurrence or path down to a "leaf" in the JSON file
		- This is the most complicated part
		- Issue with keys that have null values or empty arrays (not showing up)
	- Thirdly, 
		- Map the flattened data back into a new YAML for DeTTECT by using a schema

###### CSV to YAML Mapper for JSONAUT

- csv_to_yaml_mapper pseudocode
	- Open csv file as pandas dataframe
	- Process the schema to get data about structure so that the dataframe and CSV data can be restructured
		- Go through the schema and mark down the CSV to YAML file mappings
			- Add parameter for convert_csv_to_yaml to account for dot notation and allow for only specifying the last Key instead of the whole path
		- Go through the schema and collect the "unique_properties_for_level" values as an object.  In the case of the data sources YAML schema, this should look something like `{"name,domain":{"data_source_name":"applicable_to,products"}}`.  We can call this the `yaml_uniqueness_structure_definition`  or the `yaml_unique_entities_defintion` This gives you the hierarchical structure for how the YAML objects are defined in terms of uniqueness.  This sorts of emulates how there can be multiple primary keys in a relational database that act as a combination to be unique.  
	- Mapping example for CSV to YAML
		- Domain -> domain
		- (Participant_Name + Display_Name) -> name
		- Detections.Indicator_Name -> add to "comment" per data source 
		- Data_Sources -> add to "comment" per data source For each Detection in each substep, I want the Detection_Type to be extracted to convert to the data_quality fields with the least to greatest being (None, Telemetry, Tactic, Technique)
	- Use the `csv_to_yaml_value_mapping` object and the `yaml_unique_entities_defintion` to sort the dataframe.  With the above `yaml_unique_entities_definition`, this means that the csv will be sorted first by unique combinations of name and domain, then by unique values of `data_source_name`, then by unique combinations of the applicable_to and products values.  However, these are the output-related names, and the `csv_to_yaml_value_mapping` should be used to recognize the CSV column names based on the generated mapping from the previous steps
	- Next, the YAML is to be generated based on the now sorted version of the CSV file or the dataframe. 
		- To generate, the program will use the `yaml_unique_entities_definition` along with the sorted csv or dataframe
		- Here's the general algorithm of components for it assuming the dataframe has been sorted
			- (going top to bottom) Look at a row:
				- compare to `yaml_unique_entities_definition` by looking at the related columns and saving the current value for each unique entity definition related column.
				- keep going down the rows till a change is seen in one of these columns
					- If a value is empty for a particular property, then the "default" value from the schema should be used with filling out an object
					- If the value is part of an array property in the schema definition, then unique values should be appended for instances of "unique entities."  This property can be called "implosion" or concatenation. 
					- The yaml unique entities definition may have multiple objects on one "level" this should emulate a combination primary key or unique combination of values between those two objects.  This shouldn't affect the algorithm at all.
					- if a change is seen matching to the entities definition, then a new object must be initiated based on the schema for that property and it's level in the hierarchical structure
			- Since the dataframe/csv is sorted is a particular way, then we should be able to build the YAMl more easily

- Data Sources mapped to Techniques
```
           "detects"       x_mitre_data_source_ref
          relationship      embedded relationship
               │                      │
┌───────────┐  ▼  ┌────────────────┐  │  ┌───────────┐
│Technique 1│◄────┤                │  │  │           │
└───────────┘     │                │  ▼  │           │
                  │Data Component 1├────►│           │
┌───────────┐     │                │     │           │
│Technique 2│◄────┤                │     │Data Source│
└───────────┘     └────────────────┘     │           │
                                         │           │
┌───────────┐     ┌────────────────┐     │           │
│Technique 3│◄────┤Data Component 2├────►│           │
└───────────┘     └────────────────┘     └───────────┘
```

- Integrating stix 2.0 techniques to data sources:
	- https://mitreattack-python.readthedocs.io/en/latest/mitre_attack_data/examples.html
	- Misc python code, recipes, examples
		- https://github.com/mitre-attack/mitreattack-python/blob/master/mitreattack/attackToExcel/stixToDf.py
	- [oasis-open/cti-python-stix2: OASIS TC Open Repository: Python APIs for STIX 2](https://github.com/oasis-open/cti-python-stix2)
	- https://github.com/mitre-attack/attack-stix-data/blob/master/USAGE.md#accessing-attck-data-in-python
	- `$ pip install stix2`
	- Create CSV to map techniques to data sources
		- Download https://github.com/mitre-attack/attack-stix-data/blob/master/enterprise-attack/enterprise-attack.json 
		- Use code to pull out data and convert to CSV
			- Use the ATT&CK spec to choose filters and such - https://github.com/mitre-attack/attack-stix-data/blob/master/USAGE.md#the-attck-spec
	- Objects of interest
		- Techniques
		- Mitigations
			- A Mitigation in ATT&CK is defined as a [course-of-action](https://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230929) object. ATT&CK Mitigations do not depart from the STIX `course-of-action` spec.
		- Assets - https://github.com/mitre-attack/attack-stix-data/blob/master/USAGE.md#assets
			- `x_mitre_sectors` | string | List of industry sector(s) an asset may be commonly observed in.
			- `x_mitre_related_assets` | related_asset | Related assets describe sector specific device names or alias that may be commonly associated with the primary asset page name or functional description. Related asset objects include a description of how the related asset is associated with the page definition.
		- Data Sources
			- `x-mitre-data-source`
			- `x-mitre-data-component`
		- Data Components
			- `x_mitre_data_source_ref`|embedded relationship (string)|STIX ID of the data source this component is a part of.
		- Relationships
			- |Source Type|Relationship Type|Target Type|Custom Type?|About
			- `course-of-action`|`mitigates`|`attack-pattern`|No|Mitigation mitigating technique.
			- `attack-pattern`|`subtechnique-of`|`attack-pattern`|Yes|Sub-technique of a technique, where the `source_ref` is the sub-technique and the `target_ref` is the parent technique.
			- `x-mitre-data-component`|`detects`|`attack-pattern`|Yes|Data component detecting a technique.
			- `attack-pattern`|`targets`|`x-mitre-asset`|Yes|Technique targets an asset.|
	- `pip install mitreattack-python`
- Breakdown for Mitre APIs
	- Stix2
		- MitreAttack-Python
			- AttackToExcel

```python

```

schema example:
```json
{
	"title": "Mitre DeTTECT Data Sources YAML structure",
	"version": "1.1",
    "description": "This schema stores the schema for the MITRE DeTTECT Data Sources YAML/JSON file",
    "type": "object",
    "unique_properties_for_level": ["name","domain"],
    "properties": {
	    "version": {
            "description": "The department the record belongs to",
            "type": "number",
            "default": "1.1"
        },
        "name": {
            "description": "The department the record belongs to",
            "type": "number",
            "default": "Data_source_sample"
        },
        "file_type": {
            "description": "The department the record belongs to",
            "type": "number",
            "default": "data-source-administration"
        },
        "domain": {
            "description": "The department the record belongs to",
            "type": "number",
            "default": "enterprise-attack",
            "from_csv":"EVAL type statement or something here or column name from CSV"
        },
        "systems": {
            "description": "The department the record belongs to",
            "type": "array",
            "default": "all",
            "from_csv":"EVAL type statement or something here or column name from CSV",
            "unique_properties_for_level": null,
            "properties": {
	            "applicable_to": {
		            "description": "systems that are applicable",
		            "type": "string",
		            "default": "all",
		            "from_csv":"EVAL type statement or something here or column name from CSV",
		            "properties": {
			            "platform": {
							"description": "Windows, Linux, etc.",
							"type": "string",
							"default": "all",
				            "from_csv":"EVAL type statement or something here or column name from CSV"
						}
		            }
	            }
            }
        },
        "data_sources": {
            "description": "All data sources",
            "type": "array",
            "default": null,
			"from_csv":"EVAL type statement or something here or column name from CSV",
            "unique_properties_for_level": ["data_source_name"],
            "properties": {
	            "data_source_name": {
		            "description": "Name of the Mitre Data Source",
		            "type": "string",
		            "default": null,
				    "from_csv":"EVAL type statement or something here or column name from CSV",
		            "unique_properties_for_level": null,
		            "properties": {
			            "data_source": {
				            "description": "Mitre Data Source properties/data",
				            "type": "array",
				            "default": "all",
				            "from_csv":"EVAL type statement or something here or column name from CSV",
				            "unique_properties_for_level": ["applicable_to"],
				            "properties" : {
					            "applicable_to": {
						            "description": "systems that the data source is applicable to",
						            "type": "array",
						            "from_csv":"EVAL type statement or something here or column name from CSV",
						            "unique_properties_for_level": null,
						            "properties": {
							            "date_registered": {
								            "description": "systems that the data source is applicable to",
								            "type": "string",
								            "default": "TIMEDATE_HERE",
								            "from_csv":"EVAL type statement or something here or column name from CSV"
							            },
							            "date_connected": {
								            "description": "systems that the data source is applicable to",
								            "type": "string",
								            "default": "TIMEDATE_HERE",
								            "from_csv":"EVAL type statement or something here or column name from CSV"
							            },
							            "products": {
								            "description": "systems that the data source is applicable to",
								            "type": "array",
								            "default": null,
								            "from_csv":"EVAL type statement or something here or column name from CSV"
							            },
							            "available_for_data_analytics": {
								            "description": "systems that the data source is applicable to",
								            "type": "string",
								            "default": "unknown",
								            "from_csv":"EVAL type statement or something here or column name from CSV"
							            },
							            "comment": {
								            "description": "systems that the data source is applicable to",
								            "type": "string",
								            "default": "COMMENT_HERE",
								            "from_csv":"EVAL type statement or something here or column name from CSV"
							            },
							            "data_quality": {
								            "description": "systems that the data source is applicable to",
								            "type": "object",
								            "from_csv":"EVAL type statement or something here or column name from CSV",
								            "unique_properties_for_level": null,
								            "properties": {
									            "device_completeness": {
										            "description": "device_completeness",
										            "type": "string",
										            "default": "0",
										            "from_csv":"EVAL type statement or something here or column name from CSV"
									            },
									            "data_field_completeness": {
										            "description": "data_field_completeness",
										            "type": "string",
										            "default": "0",
										            "from_csv":"EVAL type statement or something here or column name from CSV"
									            },
									            "timeliness": {
										            "description": "timeliness",
										            "type": "string",
										            "default": "0",
										            "from_csv":"EVAL type statement or something here or column name from CSV"
									            },
									            "consistency": {
										            "description": "consistency",
										            "type": "string",
													"default": "0",
										            "from_csv":"EVAL type statement or something here or column name from CSV"
									            },
									            "retention": {
										            "description": "retention",
										            "type": "string",
										            "default": "0",
										            "from_csv":"EVAL type statement or something here or column name from CSV"
									            }
								            }
							            }
						            }
					            }
				            }
			            }
		            }
	            }
            }
        }
    }
}
```

#### Evaluate Sensors Using DeTT&CT

>Prioritize on Techniques and Data Sources Based on Additional Intel

- Intel and Mitre Stats
	- [https://github.com/mitre-attack/attack-datasources?tab=readme-ov-file#identification-of-relevant-data-sources-and-components](https://github.com/mitre-attack/attack-datasources?tab=readme-ov-file#identification-of-relevant-data-sources-and-components)
	- [https://github.com/mitre-attack/attack-datasources?tab=readme-ov-file#identification-of-relevant-data-sources-and-components-a-graph-perspective](https://github.com/mitre-attack/attack-datasources?tab=readme-ov-file#identification-of-relevant-data-sources-and-components-a-graph-perspective)
	- [https://github.com/mitre-attack/attack-datasources?tab=readme-ov-file#identification-of-relevant-security-events](https://github.com/mitre-attack/attack-datasources?tab=readme-ov-file#identification-of-relevant-security-events)
	- [https://www.linkedin.com/pulse/mitre-attck-techniques-popularity-data-sources-jakub-szumera/](https://www.linkedin.com/pulse/mitre-attck-techniques-popularity-data-sources-jakub-szumera/)
	- [https://jkb-s.github.io/snake-attack/](https://jkb-s.github.io/snake-attack/)
	- [https://web.mitre-engenuity.org/hubfs/Center%20for%20Threat%20Informed%20Defense/CTID-Sightings-Ecosystem-Report.pdf](https://web.mitre-engenuity.org/hubfs/Center%20for%20Threat%20Informed%20Defense/CTID-Sightings-Ecosystem-Report.pdf)
	- https://medium.com/mitre-attack/dissecting-a-detection-part-1-19fd8f00266c
	- https://github.com/rabobank-cdc/DeTTECT/wiki#example
		- https://github.com/rabobank-cdc/DeTTECT/wiki/How-to-use-the-framework#which-data-source-are-covering-the-most-techniques 
		- `python dettect.py generic -ds`

- Utilize intel for prioritization
	- The organization can use various threat intel sources to find APTs that apply to their company or vertical

- 

#### Scoring - Data Sources by Data Quality and Utility

#### Scoring - Visibility per ATT&CK Technique

- based on data source x data quality

https://github.com/rabobank-cdc/DeTTECT/wiki/How-to-use-the-framework#score-visibility
	- Within the resulting YAML file, you can choose to adjust the visibility score per technique based on expert knowledge and the previously defined quality of your data sources (in this same YAML file you can also score detection). There are several reasons why manual scoring can be required. For example:
		- You may have 1 data source available from the total 3 data sources mentioned within a particular ATT&CK technique. However, in some cases that single data source could not be sufficient for at least a minimum detection level for that technique. And hence, the visibility score based on the number of data sources needs to be adjusted.
		- The quality of a particular data source is considered too low to be useful for visibility.
		    - With the power of an EQL query, you can influence which data sources are included in the process of auto-generating visibility scores. For example, to exclude data sources with low data quality. For more info see: [Customize the rough visibility score](https://github.com/rabobank-cdc/DeTTECT/wiki/eql#customise-the-rough-visibility-score).
		- You do have a certain level of visibility on a technique. But this is based on a data source currently not mentioned within MITRE ATT&CK for that particular technique.

	- Visibility scores are rated from 0 to 4. You can find the explanation of the scores here: [visibility scores](https://github.com/rabobank-cdc/DeTTECT/wiki/Visibility-scoring). Use the score that fits best. It is possible to have multiple scores per technique that apply to different systems using the [`applicable_to`](https://github.com/rabobank-cdc/DeTTECT/wiki/YAML-administration-techniques_v1_2#visibility-object) property. (Please note that within the same technique, a system can only be part of one `applicable_to` key-value pair). In addition, you can keep track of changes in the scores by having multiple [`score` objects](https://github.com/rabobank-cdc/DeTTECT/wiki/YAML-administration-techniques_v1_2#score-object) within a [`score_logbook`](https://github.com/rabobank-cdc/DeTTECT/wiki/YAML-administration-techniques_v1_2#visibility-object)

#### Look at Visibility Coverage

- https://github.com/rabobank-cdc/DeTTECT/wiki/How-to-use-the-framework#visibility-coverage

#### Score detection and determine detection coverage - per technique

- https://github.com/rabobank-cdc/DeTTECT/wiki/How-to-use-the-framework#score-detection-and-determine-your-detection-coverage 
	- Determine your detection score per technique in the [technique administration YAML file](https://github.com/rabobank-cdc/DeTTECT/wiki/YAML-administration-techniques_v1_2). This is a manual exercise. Detection scores are rated from -1 to 5. The explanation of the scores can be found here: [detection scores](https://github.com/rabobank-cdc/DeTTECT/wiki/Detection-scoring). Use the score that fits best. It is possible to have multiple scores per technique that apply to different systems using the [`applicable_to`](https://github.com/rabobank-cdc/DeTTECT/wiki/YAML-administration-techniques_v1_2#detection-object) property. (Please note that within the same technique, a system can only be part of one `applicable_to` key-value pair). In addition, you can keep track of changes in the scores by having multiple [`score` objects](https://github.com/rabobank-cdc/DeTTECT/wiki/YAML-administration-techniques_v1_2#score-object) within a [`score_logbook`](https://github.com/rabobank-cdc/DeTTECT/wiki/YAML-administration-techniques_v1_2#detection-object)

	- A next step can be to generate an [ATT&CK Navigator](https://mitre-attack.github.io/attack-navigator/#comment_underline=false&metadata_underline=false) layer file based on your scores you have [determined](https://github.com/rabobank-cdc/DeTTECT/wiki/Detection-coverage) per technique in the [YAML administration file](https://github.com/rabobank-cdc/DeTTECT/wiki/YAML-administration-techniques_v1_2). The detection scores in the YAML file are also used to colour the techniques in the layer file.

### Analyze Detection Gaps

- Summarize detection gaps from the ATT&CK Navigator:
	- 
- Advanced searching and filtering based on detection location / collection layer / log source
	- 

## Links

- [DeTT&CT Editor](https://rabobank-cdc.github.io/dettect-editor/#/home) 
- [How to use the framework · rabobank-cdc/DeTTECT Wiki](https://github.com/rabobank-cdc/DeTTECT/wiki/How-to-use-the-framework#which-data-source-are-covering-the-most-techniques) 
- [rabobank-cdc/DeTTECT: Detect Tactics, Techniques & Combat Threats](https://github.com/rabobank-cdc/DeTTECT) 
- [DeTT&CT Editor · rabobank-cdc/DeTTECT Wiki](https://github.com/rabobank-cdc/DeTTECT/wiki/DeTT&CT-Editor) 
- [siriussecurity/dettectinator: Dettectinator - The Python library to your DeTT&CT YAML files.](https://github.com/siriussecurity/dettectinator) 
	- [Dettectinator workflow · siriussecurity/dettectinator Wiki](https://github.com/siriussecurity/dettectinator/wiki/Dettectinator-workflow) 

- [ATT&CK® Navigator](https://mitre-attack.github.io/attack-navigator/) 
- https://attack.mitre.org/datasources/ 
- [Matrix - Enterprise - Windows | MITRE ATT&CK®](https://attack.mitre.org/matrices/enterprise/windows/) 
- [D3FEND Matrix | MITRE D3FEND™](https://d3fend.mitre.org/) 

- [ ] Library for Mitre ATT&CK framework and associated detections? 🔺 ➕ 2024-02-08
- [x] Do cloud detection landscape analysis #CLOSED ⏫ ➕ 2024-02-14 ✅ 2024-04-01