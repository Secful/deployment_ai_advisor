# External Data Schema - Current Implementation

## Overview
External database schemas and repository entity definitions that the Traffic Collection Deployment AI Agent interfaces with for deployment guidance.

## External Database Schema - SALT SECURITY CLOUD ASSETS API

### Cloud Assets Data Structure
```json
{
  "id": "string",
  "name": "string",
  "type": "string",
  "provider": "aws|azure|gcp",
  "region": "string",
  "status": "active|inactive",
  "metadata": {
    "tags": {},
    "configuration": {},
    "endpoints": []
  },
  "created_at": "string",
  "updated_at": "string"
}
```

### Asset Types
- **API Gateway**: AWS API Gateway, Azure APIM, GCP API Gateway
- **Load Balancer**: Application Load Balancer, Network Load Balancer
- **Container Services**: EKS, AKS, GKE clusters
- **Database Services**: RDS, Azure SQL, Cloud SQL
- **Storage Services**: S3, Blob Storage, Cloud Storage

## Repository Entities - PLANNED

### Session Storage Entity
```typescript
interface CustomerSession {
  sessionId: string;
  customerId: string;
  version: number;
  timestamp: string;
  orchestratorLog: SessionLog;
  deploymentSOW: DeploymentSOW;
  cloudAssetsSnapshot: CloudAsset[];
  subAgentReports: SubAgentReport[];
}
```

### Deployment SOW Entity
```typescript
interface DeploymentSOW {
  summary: string;
  recommendations: DeploymentOption[];
  architecture: string;
  diagrams?: string[]; // Mermaid diagram content
}

interface DeploymentOption {
  name: string;
  description: string;
  resourceCount: number;
  documentationLink: string;
  expertiseLevel: "beginner" | "intermediate" | "expert";
  permissions: string[];
  comprehensiveness: number; // 1-10 scale
  simplicity: number; // 1-10 scale
  successProbability: number; // 1-10 scale
  timeEstimate: string;
}
```

### Sub-Agent Communication Entity
```typescript
interface SubAgentReport {
  agentName: string;
  status: "success" | "partial" | "fail";
  outputData: any;
  errors?: string[];
  knowledgeGaps?: string[];
  externalSourceDiffs?: SourceDiff[];
}

interface SourceDiff {
  source: "kb" | "web" | "aws_docs";
  conflictDescription: string;
  recommendedResolution: string;
}
```

## External API Data Models - DOCUMENT360

### Knowledge Base Article Schema
```typescript
interface Doc360Article {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  lastUpdated: string;
  url: string;
}
```

### Collector Documentation Structure
- **Installation Guides**: Step-by-step deployment instructions
- **Troubleshooting Articles**: Common issues and solutions
- **Architecture Diagrams**: Deployment topology examples
- **Prerequisite Checklists**: Required permissions and configurations

## Historical Data Schema - PLANNED

### Anonymized Session Storage
```typescript
interface ScrubbedSession {
  sessionHash: string; // MD5 of company_id
  generalizedArchitecture: string;
  deploymentChallenges: string[];
  successfulSolutions: string[];
  failurePatterns: string[];
  resourceMapping: Record<string, string>; // Real names -> UUIDs
}
```

### Learning Data Structure
- **Architecture Patterns**: Common cloud setups and optimal collectors
- **Error Patterns**: Frequent deployment issues and resolutions
- **Success Metrics**: Deployment completion rates by architecture type
- **Knowledge Evolution**: Documentation updates and gap identification

## External Entities - NOT YET IMPLEMENTED

### MCP Schema Validation
```typescript
// Zod schemas for MCP tool validation
const CloudAssetSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  provider: z.enum(['aws', 'azure', 'gcp']),
  // ... additional fields
});
```

### Error Classification Schema
```typescript
interface ErrorClassification {
  errorType: string;
  architecture: string[];
  frequencyScore: number;
  resolutionSteps: string[];
  escalationThreshold: number;
}