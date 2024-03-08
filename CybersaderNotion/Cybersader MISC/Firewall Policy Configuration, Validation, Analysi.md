# Firewall Policy Configuration, Validation, Analysis, Anomalies, Optimization

# Theorized FW Anomaly Tool

- Options:
    - resolution strat
    - anomalies
    - action to take
- Would export a corrected file and an excel file with highlights and comments to show changes made and optimizations

# Links

- [https://ieeexplore.ieee.org/abstract/document/9051476](https://ieeexplore.ieee.org/abstract/document/9051476)
- [https://ieeexplore.ieee.org/abstract/document/9478256](https://ieeexplore.ieee.org/abstract/document/9478256)
- [https://webthesis.biblio.polito.it/24648/](https://webthesis.biblio.polito.it/24648/)
- [http://iocscience.org/ejournal/index.php/mantik/article/view/1745](http://iocscience.org/ejournal/index.php/mantik/article/view/1745)
- [https://www.mdpi.com/2073-8994/14/12/2668](https://www.mdpi.com/2073-8994/14/12/2668)
- [https://ieeexplore.ieee.org/abstract/document/10074815](https://ieeexplore.ieee.org/abstract/document/10074815)
- [https://ieeexplore.ieee.org/abstract/document/9420661](https://ieeexplore.ieee.org/abstract/document/9420661)
- [https://link.springer.com/chapter/10.1007/978-3-030-64455-0_8](https://link.springer.com/chapter/10.1007/978-3-030-64455-0_8)
- [https://ieeexplore.ieee.org/abstract/document/9478072](https://ieeexplore.ieee.org/abstract/document/9478072)
- [https://isyou.info/jisis/vol10/no1/jisis-2020-vol10-no1-02.pdf](https://isyou.info/jisis/vol10/no1/jisis-2020-vol10-no1-02.pdf)
- [https://ejournal.st3telkom.ac.id/index.php/infotel/article/view/425](https://ejournal.st3telkom.ac.id/index.php/infotel/article/view/425)
- [https://journals.rudn.ru/miph/article/view/27527](https://journals.rudn.ru/miph/article/view/27527)
- [https://ieeexplore.ieee.org/abstract/document/9496640](https://ieeexplore.ieee.org/abstract/document/9496640)
- [https://www.mdpi.com/1424-8220/23/5/2683](https://www.mdpi.com/1424-8220/23/5/2683)
- [https://ieeexplore.ieee.org/abstract/document/9720435](https://ieeexplore.ieee.org/abstract/document/9720435)
- [https://karauctionservices.splunkcloud.com/en-US/app/search/search?q=search Index%3Dfirewall AccessControlRuleName%3D"NPDC--TO--OKTA-IPs-IN-AWS" | stats count by dest_port
| chart count by AccessControlRuleName%2C dest_port&display.page.search.mode=smart&dispatch.sample_ratio=1&workload_pool=standard_perf&earliest=-6mon%40mon&latest=now&display.page.search.tab=statistics&display.general.type=statistics&display.statistics.format.0=&display.statistics.format.0.precision=&display.statistics.format.0.field=&sid=1686834253.7619391](https://karauctionservices.splunkcloud.com/en-US/app/search/search?q=search%20Index%3Dfirewall%20AccessControlRuleName%3D%22NPDC--TO--OKTA-IPs-IN-AWS%22%20%7C%20stats%20count%20by%20dest_port%0A%7C%20chart%20count%20by%20AccessControlRuleName%2C%20dest_port&display.page.search.mode=smart&dispatch.sample_ratio=1&workload_pool=standard_perf&earliest=-6mon%40mon&latest=now&display.page.search.tab=statistics&display.general.type=statistics&display.statistics.format.0=&display.statistics.format.0.precision=&display.statistics.format.0.field=&sid=1686834253.7619391)
- [https://drive.google.com/drive/folders/10L6bhqi3AlZHPv25PNIAzl3KwmYm1q_T](https://drive.google.com/drive/folders/10L6bhqi3AlZHPv25PNIAzl3KwmYm1q_T)
- [https://docs.google.com/spreadsheets/d/1iY-XI5ZpZX6TDtnUpVv0089QPnwSWrElmgIWciE_z_w/edit#gid=1955444962](https://docs.google.com/spreadsheets/d/1iY-XI5ZpZX6TDtnUpVv0089QPnwSWrElmgIWciE_z_w/edit#gid=1955444962)
- [https://www.scitepress.org/Papers/2023/117049/117049.pdf](https://www.scitepress.org/Papers/2023/117049/117049.pdf)

# Firewall Tools

- [https://github.com/ernie55ernie/Anomaly-Firewall-Rule-Detection-And-Resolution#usage](https://github.com/ernie55ernie/Anomaly-Firewall-Rule-Detection-And-Resolution#usage)
- https://github.com/mohamedtourab/Optimized-Firewall-Anomaly-Resolution

Went off a little research and hunt for open source firewall anomaly detection and optimization.  Found two cool tools, but they aren't open source.  The only open source ones I could find also only run with certain formats 😆 YIKES...big sad.  Might do this for a grad school project though and could design on my own for class 👀Look how cool this visualization is.  If only they had made them open source:

- [https://www.youtube.com/watch?v=TGdCd8t_O4s](https://www.youtube.com/watch?v=TGdCd8t_O4s) - 3d one
- [https://www.youtube.com/watch?v=43OfHN8dteU](https://www.youtube.com/watch?v=43OfHN8dteU) - 2d one

# GPT Convo

[paper text](Firewall%20Policy%20Configuration,%20Validation,%20Analysi%208b096d59029f4ab4981eceb6d536ff6d/paper%20text.md)

```python
I want to create a Python function that is based off a this research which can do the following on a csv of firewall rules. 

Below is an example of the table that I want to analyze including its columns.  

| #   | Name                    | Source Zones | Dest Zones   | Source Networks | Dest Networks | VLAN Tags | Users | Applications | Source Ports | Dest Ports | URLs | Source SGT | Dest SGT | Action |
| --- | ----------------------- | ------------ | ------------ | --------------- | ------------- | --------- | ----- | ------------ | ------------ | ---------- | ---- | ---------- | -------- | ------ |
| 271 | 1103 Trust--DMZ-F5-Zone | npdc-inside  | npdc-dmz     | Any             | Any           | Any       | Any   | Any          | Any          | Any        | Any  | Any        | Any      | Allow  |
| 271 | 1103 Trust--DMZ-F5-Zone | npdc-inside  | npdc-dmz     | Any             | Any           | Any       | Any   | Any          | Any          | Any        | Any  | Any        | Any      | Allow  |
| 271 | 1103 Trust--DMZ-F5-Zone | npdc-inside  | npdc-dmz     | Any             | Any           | Any       | Any   | Any          | Any          | Any        | Any  | Any        | Any      | Allow  |
| 271 | 1103 Trust--DMZ-F5-Zone | npdc-inside  | npdc-dmz     | Any             | Any           | Any       | Any   | Any          | Any          | Any        | Any  | Any        | Any      | Allow  |
| 271 | 1103 Trust--DMZ-F5-Zone | npdc-inside  | npdc-dmz     | Any             | Any           | Any       | Any   | Any          | Any          | Any        | Any  | Any        | Any      | Allow  |
| 271 | 1103 Trust--DMZ-F5-Zone | npdc-inside  | npdc-dmz     | Any             | Any           | Any       | Any   | Any          | Any          | Any        | Any  | Any        | Any      | Allow  |
| 245 | 1270 Trust--Untrust     | npdc-inside  | npdc-outside | 172.21.0.0/16   | Any           | Any       | Any   | Any          | Any          | Any        | Any  | Any        | Any      | Allow  |
| 245 | 1270 Trust--Untrust     | npdc-inside  | npdc-outside | 172.21.0.0/16   | Any           | Any       | Any   | Any          | Any          | Any        | Any  | Any        | Any      | Allow  |

Build a function that can take an input_csv, a columns_dict that can match the types of columns that need to be processed.  resolution_strat ( how the rules are normally processed), and then options to process for anomalies.  

Process the anomalies as is mentioned in the paper by using the internal rule relations, inputted resolution strategy, and anomalies.  I want another option too to decide whether to reconfigure (actually change the csv rules), or to instead mark rules for deletion, merging, and/or why.  I lastly want the option to choose whether there is an id column or not or a column to choose rule priority when the csv order doesn't reflect the actual priority order.

If you cant code the whole thing then give me relatively detailed and structured code to start with.
```

```python
I need to explain and summarize some things from the paper.
- Break down (in detail) the resolution strategies
- Explain the policy model/taxonomy of intra and inter firewall policy anomalies 
- break down and explain (in detail) the rule relations
- break down each anomaly, their category, what they are, and how they are detected.
- Break down the process of optimized resolution
```

The paper discusses a framework for identifying and resolving anomalies in firewall policies. It details different types of rule relations, intra- and inter-firewall policy anomalies, and an optimized resolution strategy for resolving identified anomalies. Here is a detailed breakdown:

1. **Resolution Strategies**: These strategies are used to determine which rule's action should be applied when more than one rule matches the packet. The strategies include:
    - First Matching Rule (FMR): Applies the action from the first applicable rule in an ordered list.
    - Allow Takes Precedence (ATP): Enforces the Allow rule over the Deny rule when actions contradict.
    - Deny Takes Precedence (DTP): Enforces the Deny rule over the Allow rule when actions contradict, making it a restrictive strategy.
    - Most Specific Takes Precedence (MSTP): Takes precedence of the most specific rule in case of two conflicting rules.
    - Least Specific Takes Precedence (LSTP): Takes precedence of the less specific rule in case of two conflicting rules.
2. **Rule Relations**: Rule relations are used to analyze and detect anomalies that stem from incorrect specifications. The paper defines four types of relations between condition fields:
    - Equivalence: Two condition fields are equivalent if they have the same value or range of values.
    - Dominance: A condition field dominates another if it is a generalization of the other.
    - Correlation: Two condition fields are correlated if they share some values, but none dominates the other.
    - Disjointness: Two condition fields are disjoint if they do not share any value.
3. **Policy Model/Taxonomy of Intra and Inter Firewall Policy Anomalies**:
    - Intra-policy anomalies: These are anomalies among two rules in the same policy set. They are further divided into conflict anomalies and sub-optimization anomalies.
    - Conflict anomalies: These occur when the effect of one rule is influenced or altered by another one due to contradicting actions.
    - Sub-optimization anomalies: These arise when redundant rules or less efficient policy implementations are present.
    - Inter-policy anomalies: These are anomalies among two rules in two different policy sets, but the paper only focuses on intra-policy anomalies.
4. **Anomaly Detection**: Anomalies are detected based on the relations defined among condition fields. For instance, a conflict anomaly between two rules rx and ry exists if their conditions have some relation (i.e., they are not disjointed) and their actions are different. Conversely, a sub-optimization anomaly exists when the actions are the same.
5. **Optimized Resolution**: The paper presents an optimized resolution strategy aimed at reducing the number of conflict anomalies that should be manually resolved by administrators. It includes the following steps:
    - Remove Irrelevance anomalies, which can't affect the firewall's behavior.
    - Remove Duplication anomalies, which involve two rules with the same actions but different priorities.
    - Remove Shadowing Redundancy anomalies, where the actions of the involved rules are the same.
    - Handle Contradiction anomalies, where rule conditions match the same packets but with opposite actions. The administrator decides which rule to remove.
    - Handle Shadowing Conflict anomalies, where one rule is shadowing another and has an opposite action. The administrator decides either to remove the lower priority rule or move it before the higher priority one. This decision can be propagated to solve other anomalies involving the lower priority rule.