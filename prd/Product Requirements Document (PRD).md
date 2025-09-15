# **Product Requirements Document (PRD)**

**Product Name:** Traffic Collection Deployment AI Agent

**Author:** Julia Weitz

**Team**: Dmytro, Guy & Shaked

**Date:** 14/09/2025

**Purpose:** Hackathon

---

## **1\. Overview**

The **Traffic collection Deployment AI Agent** is an intelligent assistant that helps customers deploy, troubleshoot, and manage Salt traffic collection across multiple environments.

The agent will:

* Answer user’s deployment-related questions as deployment recommendations via Claude code interface.

* Retrieve information dynamically from cloud assets and knowledge bases.

* Retain learnings across customer interactions for improved assistance over time.

* Handle errors and provide guided troubleshooting. 

In the future \- The AI agent will be available via the **main dashboard** and within **collector tiles** in the Salt Security console. Currently no other than “claude code” user interfaces are used.

Basic architecture:

* Customer is runs claude code CLI  
* Claude code runs orchestrator either implicitly (based on the user prompt) or explicitly (if .command is used).  
* Implementation is based on:  
  * Orchestrator main sub agent  
  * Orchestrator calls gang of sub agents to specific tasks (see below)  
  * Sub agent may use MCPs to access external resources.

---

## **2\. Goals & Objectives**

* **Simplify Deployment**: Customers can ask natural language questions about collector deployment.

* **Improve Support Experience**: Reduce the need for manual documentation checks or support tickets or solution architects intervention. 

* **Contextual Intelligence**: Tailor answers using customer-specific architectures.

* **Continuous Learning**: Learn from past customer interactions while ensuring privacy.

* **Error Handling**: Detect, suggest fixes, and guide customers through troubleshooting based on past conversations and mutual architectures.

## **4\. Architecture & Components**

### **4.1 Orchestrator**

* Central controller (orchestrator) that manages sub-agent invocation.

* Routes customer requests to appropriate sub-agents.

* Ensures conversation continuity.  
* Handles customer-facing dialogue.  
* Asks clarifying questions when needed.

* Combines responses from other agents into natural answers.  
* Understands satisfactions of customers. 

### **4.2 Sub-Agents** 

1. **Reporter** *\- Sub-agent that knows how to keep data in history of DB and to provide deployment SOW* 

   * Stores anonymous conversation history in a DB.  
   * Create a deployment SOW  
     1. The SOW will include a summary of the recommendation, a table of the recommended options  
     2. The table will outline each option with its description, number of resources it should be deployed to, link to the Doc360 article of the solution, level of expertise required to execute, permissions required for the deployment  
     3. The SOW will outline recommended deployment options rated by comprehensiveness of traffic capture, deployment simplicity and probability of success, and time of deployment  
   * Reporter creates as output the following:  
     1. SOW deployment proposal:  
        1. Produced as Markdown file.  
        2. If diagrams are needed use mermaid  
     2. Session summary  
        1. Stored in the project git repo under "/sessions/\[API key/session version\]  
        2. Session summary include:  
           1. Exported Compacted version of the session from orchestration level”  
           2.  Deployment SOW  
           3. List of failures and differences reported by sub agents between source of knowledge (WWW,documentation etc)  
           4. Json that includes the snapshot as collected from Cloud assets.  
           5. Version \- should be incremented by one after every fix.  
           6. Do not overwrite \- for every session create a new sub folder  
     3. Scrubbed version  
        1. Follow the same logic:  
           1. Stored in project repo under “general\_sessions/\[session\_hash\]  
           2. Hash is md5 over API key (thus ensuring we always relay on latest and probably most useful version)  
           3. Overwrite is allowed.  
           4. Contents should include same files as the unscrubbed version after deleting:  
              1. Any customer ID  
              2. Replace resources specific names with random uuid.  
   * Create scrubbed version of results that is stored for future reference and learning  
       
2. **Data Extractor** \- Sub-agent that knows how to read from all saved data  make use of it for future sessions with other customers

   * Reads cloud asset data (APIM, API Gateway, etc.) through MCP.

   * Queries the product’s KB / documentation  
   * Use flow chart  
   * Uses past anonymous sessions to improve future answers for new customers/sessions.  
   * Uses past sessions for the same customers \- no issues of privacy.
   * this sub agent is the only one allowed to use the doc360 MCP

3. **Error & Solution Handler** \- Sub-agents that keeps an eye on errors and solutions handling

   * Detects error-related queries.

   * Provides known solutions or recommended next steps based on specific use cases/architectures  
       
4. **Validator** *\- Sub-agent that understands if deployment is successful*

   * Scans deployment’s results (uses **Data Extractor**)  
   * Compares the SOW and the status of deployment and provides the diff  
       
5. **Deployment Advisor** \- sub agent is the SME (subject matter expert) responsible to create the optimal collectors deployment plan for the customer.  
   1. General logic:  
      1. Ask the data extractor to retrieve the current status of the cloud assets.  
      2. Consult KB documentation and flow chart \[create a dedicated flowcharts directory where charts will be added\] to decide what is the best way to get full coverage: which collectors to use etc.  
      3. Fill any gaps possible and solve dilemmas using access to WWW.  
      4. Fill remaining gaps in knowledge by Q\&A session with the customer (claude code user).  
      5. At any given point we can repeat steps.  
      6. Upon completion of the flow:  
         1.  generate JSON, based on which the reporter will generate the SOW.  
         2. Export the cloud assets json as collected by the data extractor (will be included in the history folder)  
   2. In some cases the orchestrator may run the deployment Advisor after running the trouble shooter sub agent. In that case the Deployment Advisor will get the trouble shooter output report as input. If that happens this data source gets priority over all others when suggesting the updated deployment SOW.  
   * *At any time the sub agent May ask additional questions to the customer*

---

## **5\. Flows & Scenarios**

### **5.1 Initial Flow (Deployment Guidance) \- For MVP**

**Customer asks:** “What Collector matches my architecture?” or “Do I have all of the necessary prerequisites to install a collector?”

1. Orchestrator triggers **Deployment Advisor**  
2. **Deployment Advisor** advises with **Data extractor** → gathers details.  
3. **Deployment Advisor** generates a JSON sends it to the **Orchestrator**  
4. The **orchestrator** sends it to the **Reporter** for SOW creation  
5. **Reporter** send it back to orchestrator to send it to the customer  
6. Possible responses to the customers:  
   1.  “Based on your AWS API Gateway setup and architecture, the recommended collector is XYZ”  
   2. “It appears that you are missing the following prerequisites in order to deploy X collector. Would you like me to provide you with instructions on how to enable the missing prerequisites?” Y/N  
      1. If Y “Here are your missing prerequisites  
         1. A. Clear instructions in Cloud  
         2. B Clear instructions in Cloud  
            

---

### **5.2 Error Flow (Deployment advise Troubleshooting)** 

**Customer asks:** “I have encountered this error, can you help me out: “xxxxxxxxxxxx””

1. Orchestrator triggers **Error Handler** → checks known errors for specific customer’s architectures.   
2. Error Handler generates a JSON sends it to the **Orchestrator**  
3. Perform Initial flow  
4. If unresolved and no further solution is found,  suggest escalating to support and **Error Handler** learns from it.   
5. Possible responses to the customers:  
   1. “Thank you for sharing the error. Based on your architecture and the error you shared with me, the issue may be resolved by xxxxxxxxx. Please update me once done, I will be able to validate if the deployment is now successful. If you encounter any additional error, we will take care of it together ”   
   2. Thank you for sharing the error. Based on your architecture and the error you shared with me, I suggest escalating to support for further troubleshooting”

---

### **5.5 Validate Flow ( Validator)**

**Customer asks:** “Is my collector setup complete?”

1. Orchestrator triggers **Validator.**  
2. **Validator** returns a JSON of diff and send it to the **Orchestrator**

3. Orchestrator provides details to the customer:  
4. Possible responses to the customers:  
   3. “Deployment successful\! You did an awesome job\!”  
   4. “Deployment successful\! You did an awesome job\!. Although the procedure was performed, I am not seeing traffic being mirrored, can you make sure traffic is generated?”  
   5. “Deployment is not yet successful. I am still seeing a missing input. Could you please make sure that xxxxxx

---

## **6\. Privacy & Compliance**

* No customer-specific identifiers stored.

* All conversations are anonymized before retention.

* Data storage follows security best practices.

---

## **7\. UI / UX Requirements**

* The Advisor should Expose APIs that are ready for invocation and consuming by a front end UI

---

## **8\. Success Metrics**

* **Deflection Rate**: 50 % of questions resolved without support tickets.

* **Adoption**: 90% of customers who wish to deploy try out the AI agent.

* **Time to Resolution**: Average reduction compared to support-only model.

---

## **9\. Future Enhancements (Out of Scope Now)**

* Multi-language support.

* Direct integration with support ticketing systems.  
* UI/UX 

---

**10\. General Rules:**

* Inter agents communication:  
  * All subagents communicate between themselves in Json files as output. The jsons will be described in the subagent md  
  * subagents will report success fail of the operation as part of the output report  
  * If agent A is calling agent B and b responds with fail/partial fail \- A will retry up to 3 times.  
* Agents responsibility and functionality sharing \- Each agent will have unique responsibility, and functionality capabilities. If agent A and B share responsibility/functionality one of the following solutions should be chosen for the architecture:  
  * A calls B / B calls A  
  * A calls orchestrator and Orchestrator calls B   
  * Subagent D is created as “utils sub agent” that is called by A and B  
* Flows:  
  * Agent description will include explicit flows and examples  
  * Orchestrator flows will cover:  
    * Initial deployment flow  
    * Error handling flow \- user tried the original deployment SOW, failed and asks for a fix.  
    * Validate deployment  
* Make sure that all agents md files match the required structure of a sub agent ,for example:  
* name: git-reviewer  
* description: "🟡 Analyzes commit messages and code quality. Called by git-orchestrator when commit/code quality review is needed. Focuses solely on code/commit quality, not git operation validation."  
* tools: \["Read", "Grep", "Bash", "mcp\_\_github\_\_\*"\]  
* \---  
* Source of truth by descending order:  
  * Product KB and internal documentation are the highest priority and always takes precedence.  
    * Access is done through MCP.   
    * Only read (get) operations are allowed  
  * Customer answers retrieved through Q\&A sessions between the agent and the customer.  
  * History:  
    * There are two relevant history storages:  
      * Customer specific history \- stored reports etc- only accessible for this specific customer. Customer A can not see Customer B related history.  
      * General scrubbed history \-stored reports etc   
    * When judging precedence between history reports (either for data explicitly mentioned in the report, or result/insight stemming from the content stored in the report) take into account:  
      * How long ago was the history report created ? new reports have higher credibility  
      * Changes in the versions and architecture of the deployment in the report, compared to actual status as extracted from cloud assets.

			Calculate the overall credibility \- and according to the mark you got (between 1 and 10\) decide precedence over other data sources.

* All sub agents are allowed to access WWW and AWS documentation  
  * If there is a mismatch between Product KB/internal documentation and WWW content \- make sure that the diff is:  
    *  included in Json output \- [Julia Weitz](mailto:juliaw@salt.security)/[Shaked Vax](mailto:shakedva@salt.security)\- should it be exposed to customer.  
      * Stored in the “history” \- for both customer and as part of the scrubbed version that is stored for all customer usage.

**11\. Deployment as the customer’s side:**

The resulting product is the set of claude code agents (described in this PRD) and commands that facilitate to run those agents. This set shall be transferable to another instance of claude code installation.  
