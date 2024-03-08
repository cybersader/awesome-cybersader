# paper text

```python
Below is some research from a related firewall anomaly detection paper.  I want to try implementing what's mentioned in here in Python.

# resolution_strat - below explains rule resolution strategies.  I anticipate this could be a parameter for the main function that could be useful, if not, essential.

"Finally, the resolution strategy describes which rule’s action should be applied if more than one rule
matches the packet. Some example of resolution strategies are:
• First Matching Rule (FMR) selects the action from the first applicable rule in an ordered list;
• Allow Takes Precedence (ATP) where in case of contradicting actions that are simultaneously
activated we enforce the Allow rule over the Deny one;
• Deny Takes Precedence (DTP) where in case of contradicting actions that are simultaneously activated we enforce the Deny rule over the Allow one (this is a restrictive strategy);
• Most Specific Takes Precedence (MSTP) where in case two conflicting rules are applied, the most
specific rule is the one that takes precedence;
• Least Specific Takes Precedence (LSTP) where in case two conflicting rules are applied, the less
specific rule is the one that takes precedence.
Without loss of generality, in this work, we consider the packet filter, the most common and used
type of firewall, with deny as default action and FMR as resolution strategy. Specifically, in the packet
filter condition fields are: source IP address, source port, destination IP address, destination port and
protocol type (as show in the example in FIGURE 1).
"

 # relations - this can be how the function internall computes things and tracks comparisons
Rule Relations
A correct model of rule relations is necessary for the analysis and detection of anomalies, derived from an
erroneous specification. Our model, specifically, supports four types of relations between the condition
fields (i.e., source IP address, destination IP address, source port, and destination port and protocol type),
that are:
• equivalence (fx = fy): two condition fields fx and fy are equivalent if they have the same value (or
range of values);
• dominance (fx  fy): a condition field fx dominates another one fy if it is a generalization of the
second one. For example, fx is the source IP addresses 10.10.*.* and fy is the source IP address
10.10.10.*, in this case fx dominates fy. The symbol ∗, called wildcards, allows to define a set
or interval of values (e.g., 10.10.11.∗ stands for 10.10.11/24, whereas if ∗ refers to a port field it
represents all the possible ports from 0 to 65535).
• correlation (fx ∼ fy): two condition fields fx and fy are correlated if they share some values, but
none of them includes (or dominates) the other one. For example, if fx and fy are destination port
and fx value is 25-65, while fy value is 40-75, then they are correlated because the range 40-65 is
shared by both fields;
• disjointness (fx ⊥ fy): two condition fields fx and fy are disjoint if they do not share any value.
On the other hand, if a network field is equivalent, correlated or dominates another, those fields are
not-disjointed (fx 6⊥ fy).
Having defined the relations among fields we proceed with the definition of relations among two condition sets,Cx andCy. In particular, we define four possible relations among two conditions: equivalence,
dominance, correlation, disjointness.
Please note that here we define the meaning of relations between conditions (e.g., Cx and Cy) using
relations between corresponding condition fields (f
i
x
and f
i
y
).
Given two conditions Cx and Cy, only one of the following relations holds:
• equivalence: two conditions Cx and Cy are equivalent (or equal) if each condition field f
i
x
in Cx
is equivalent to the corresponding condition element f
i
y
in Cy so that they exactly match the same
packets (headers);
Cx ≡ Cy ⇔ f
i
x = f
i
y∀i
For example, referring on the rules set in FIGURE 2, there is equivalence between the conditions
of the rule r1 and r3.
dominance: a condition Cx dominates Cy (Cx  Cy) if it is a generalization of the latter. In other
words, if the first condition set matches all the packet matched by the second, and some more
(otherwise this would be an equivalence relation).
Cx  Cy ⇔ Cx 6≡ Cy ∧ f
i
x  f
i
y∀i
where fx  fy stands for fx  fy ∨ fx ≡ fy.
For example, the condition of rule r4 dominates the conditions of the rule r5.
• correlation: two conditions Cx and Cy are correlated (Cx ∼ Cy) if they match some common packets, but none of them includes (or dominates) the other one.
Cx ∼ Cy ⇔ Cx  Cy ∧Cx  Cy ∧ ∀i| f
i
x 6⊥ f
i
y
where Cx  Cy stands for Cx  Cy ∧Cx 6= Cy. For example, the conditions of rule r5 and r9 are
correlated.
• disjointness: two conditions are disjoint if they do not match any common packet.
Cx ⊥ Cy ⇔ ∃i| f
i
x ⊥ f
i
y
Please note that Cx 6⊥ Cy means that Cx and Cy are either equivalent, correlated or one dominates
the other (i.e, ≡,,∼).
For example, the conditions of rule r1 and r9 are disjoint.
Finally, the priority of a rule r is here represented with the function π(r). Specifically, the function
π(r), returns the position of r in the ordered rule set. In this work we put at the top of the list the
rules with the highest priority. In this way, between any two rules rx and ry it exists either the relation
π(rx) > π(ry) or the opposite π(rx) < π(ry)

# Anomalies section in paper

Policy anomalies typically occur when multiple authors defining the set of policy rules. Moreover, the
modification or creation of a policy rule is a difficult task, because a new/updated policy can affect the
behaviour of existing policies, defined by other people at different times. When firewalls contain a large
number of rules, the risk of writing anomalies is significantly high [15].
In literature, there are two types of firewall policy anomaly: intra-policy and inter-policy2
.
An intra-policy anomaly is an anomaly among two rules in the same policy set (i.e., two rules of the
same firewall), while an inter-policy anomaly is an anomaly among two rules in two different policy set
(i.e., two rules of different firewalls).
In this work, we focus only on intra-policy anomalies where an optimized and effective firewall
anomaly resolution is needed, as better described in Section 4.
As shown in FIGURE 3, we distinguish two other main types of firewall policy anomaly, which
are:conflict anomalies and sub-optimization anomalies.
A sub-optimization anomaly arises when redundant rules or other less efficient policy implementations are present. A conflict anomaly arises when the effect of one rule is influenced or altered by another
one, e.g. the actions of two rules (that are both satisfied simultaneously) contradict each other. Typically
a conflict occurs when a set of policies rules (two or more) are simultaneously satisfied. This implies that the combined actions of the rules may produce different results depending on the order of execution of
these actions. This is because the filtering procedure is performed by sequentially matching the packet
against firewall rules until a match is found. Obviously, if the firewall rules are disjoint, the order of the
rules does not influence the overall final behaviour.
Formally, given two rules rx = (Cx,ax), ry = (Cy,ay) with some relation (i.e., Cx 6⊥ Cy), we have a
conflict when ax 6= ay, otherwise we have a sub-optimization.
In our view, it is always possible to automatically solve the sub-optimization anomalies by applying
some specific resolution strategy. Conflict anomalies, on the contrary, have to be manually solved by
network administrators since it is not possible to define a single automatic resolution strategy that is
valid in all the possible cases and that can solve all these anomalies, without potentially changing the
behaviour of the related security policies.
In the following, we formally describe each intra-firewall anomaly and the possible action that a
security/network administrator can perform in order to solve each anomaly

# optimized resolution

Optimized Resolution
In this section we present the actual optimized resolution strategy, able to minimize the number of anomalies to be solved by the administrator. Specifically, our goal is to reduce the number of conflict anomalies
that should be manually solved by administrators.
The evaluation of all the possible relations among a firewall rule set, and thus the identification of
their anomalies, is a complex task that, given their formal definition presented before, can however be
straightforwardly performed automatically by a software tool. On the other hand, the subsequent process
of anomaly resolution is more difficult. As described in Section 2, in literature, some approaches that
propose to resolve all the anomalies in a completely automatic way do exist [12]. However, this implies
that the administrator has little to no control over the resolution process and particularly ambiguous and
critical cases could be overlooked. Here we prefer a semi-automatic approach, that keeps the administrator always in control when possible ambiguities arise. More specifically, we propose a strategy to be
followed that (i) avoids anomalies that are actually not relevant, (ii) does not introduce new anomalies
and that (iii) quickly converges to a stable solution, without having to repeat the process multiple times.
Given the types and characteristics of the defined anomalies and the possible relations among the
involved rules, it is possible to describe an optimized resolution strategy, that satisfies the requirements,
as follows:
1. Consider firstly all the Irrelevance anomalies Airr. Clearly, the involved rules can be removed
as they cannot affect the overall firewall behaviour. As a direct consequence, all anomalies (of
different types) that include these same rules can be removed as well, reducing the set of anomalies
to be considered;
Remove ∀r ∈ Airr :

Aα = Aα \ {(r1,r2)|r1 = r∨r2 = r},
α ∈ {dupl,shaRed, con,shaCon f, corr,unn}

2. Then, consider all the Duplication anomalies Adupl. Each one of these anomalies involves two
rules rx and ry, where ry has a lower priority with respect to rx (that is π(rx) > π(ry)) and where
the specified actions are the same. In this case, ry can always be safely removed, without affecting
the firewall behaviour. Again, all the other anomalies that involve the removed rules, have to be
cleared;
Remove ∀ry|(rx,ry) ∈ Adupl :

Aα = Aα \ {(r1,r2)|r1 = ry ∨r2 = ry},
α ∈ {dupl,shaRed, con,shaCon f, corr,unn}
3. Next consider the Shadowing Redundancy anomalies AshaRed, where, again, the actions of the
involved rules are the same. Among all the anomalies of this type, we must consider firstly the
anomalies rules where the corresponding rx has the highest priority. In fact, a shadowing rule can
actually completely shadow pair of rules that are involved in other anomalies, thus “shadowing”
the other anomalies themselves. For the same reason, among Shadowing Redundancy anomalies
with the same rx, the first to be considered are the ones with the highest priority π(ry). For each
considered anomaly, it is then possible to remove the rule ry and propagate this removal by clearing
the remaining anomaly set;
Remove ∀ry|(rx,ry) ∈ AshaRed :

Aα = Aα \ {(r1,r2)|r1 = ry ∨r2 = ry},
α ∈ {shaRed, con,shaCon f, corr,unn}
4. After this, we consider the Contradiction anomalies Acon, where the rule conditions match exactly
the same packets but with opposite actions. This case is similar to the Duplication one but does
require an explicit evaluation from the administrator. He/she can decide either to (i) remove rx
or (ii) remove ry. Then the procedure continues in the usual way, by clearing all the affected
anomalies.
(i) Remove rx,(rx,ry) ∈ Acon : (ii) Remove ry,(rx,ry) ∈ Acon :

Aα = Aα \ {(r1,r2)|r1 = rx ∨r2 = rx},
α ∈ {con,shaCon f, corr,unn}

Aα = Aα \ {(r1,r2)|r1 = ry ∨r2 = ry},
α ∈ {con,shaCon f, corr,unn}
5. Next we consider every Shadowing Conflict anomaly AshaCon f , where rx is shadowing ry and has an
opposite action. Also in this case, the administrator has to evaluate the specific situation and decide
how to act. Two possible decisions can be made: (i) remove ry, (ii) move ry just before rx (meaning
π(ry) > π(rx)). When (i) is applied the resolution process proceeds as usual, removing all the
anomalies involving ry. When (ii) is preferred, instead, the best course of actions is to choose firstly
the anomaly with the highest priority (that is the highest π(rx)) and move the corresponding ry.
Moving the rule ry to a higher priority place before rx means that the administrator has decided that,
for all the packets matching the Cy condition, the firewall must apply the ay action. This decision
can be propagated and applied to solve other anomalies that involves ry. For example, let’s consider
a rule rz = (Cz
,ax) for which Acorr(ry,rz) holds ((ry,rz) ∈ Acorr). If π(rz) < π(rx) we can confirm the decision of the administrator and apply it also for those packets p that match both Cy and Cz
.
In fact, these packets are a subset of the packets that match Cy, and the administrator has already
extablished the correct action to apply for Cy. For this reason, the correlation between ry and rz
is not an anomaly anymore and can be removed. The same reasoning is valid if AshaCon f(ry,rz)
holds.
(i) Remove ry,(rx,ry) ∈ AshaCon f : (ii) Move ry just before rx,(rx,ry) ∈ AshaCon f :

Aα = Aα \ {(r1,r2)|r1 = rx ∨r2 = rx},
α ∈ {shaCon f, corr,unn}

Aα = Aα \ {(r1,r2)|π(rz) < π(rx)},
α ∈ {shaCon f, corr,unn}
6. Correlation anomalies are considered at this point. This kind of anomaly has to be solved by the
administrator, who has two options: either to (i) leave everything as it is, or (ii) re-write rx and
ry. In the latter case, the anomaly detection and resolution process should be restarted in order to
detect and solve the new anomalies potentially introduced by the administrator.
7. Finally, the resulting set of rules has to be evaluated again looking for Unnecessary anomalies only.
It is worth noting, in fact, that at this point, after all the previous steps, the only kind of anomaly
that can still be present is the Unnecessary one. Moreover, some new (Unnecessary) anomalies
could have been introduced with respect to the initial set of rules, due to the shifts among other
rules. These anomalies are dealt with in this last step as they can be easily solved by removing the
rx rule (that is the rule with highest priority that is completely dominated by ry).
At the end of this process, the initial set of rules have been reduced and all the anomalies solved.
```