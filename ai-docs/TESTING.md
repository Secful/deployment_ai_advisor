# Testing Strategy

## Multi-Agent Testing Approach

### Agent Unit Testing
Each sub-agent requires isolated testing with mocked dependencies:

```typescript
// Example test structure for sub-agents
describe('DeploymentAdvisor', () => {
  beforeEach(() => {
    mockDataExtractor = createMockDataExtractor();
    mockWebSearch = createMockWebSearch();
  });

  it('should generate deployment recommendation for AWS API Gateway', async () => {
    // Test implementation
  });
});
```

### Integration Testing Patterns

#### Orchestrator-SubAgent Integration
- **Message Flow Testing**: JSON communication validation
- **Retry Logic Testing**: Failure scenario handling
- **Context Preservation**: Multi-turn conversation state
- **Error Propagation**: End-to-end error handling

#### MCP Integration Testing
- **Tool Discovery**: Available tools enumeration
- **Request/Response Validation**: Schema compliance testing
- **Error Handling**: MCP protocol error responses
- **Performance Testing**: Response time and throughput

### Testing Framework Requirements

#### Mock Data Strategies
```typescript
interface MockCloudAssets {
  awsApiGateway: CloudAsset[];
  azureAPIM: CloudAsset[];
  gcpApiGateway: CloudAsset[];
}

interface MockCustomerScenarios {
  simpleDeployment: CustomerContext;
  complexArchitecture: CustomerContext;
  errorTroubleshooting: CustomerContext;
}
```

#### Test Data Management
- **Fixture Organization**: Structured test data by scenario
- **Dynamic Generation**: Parameterized test case creation
- **Anonymization Testing**: PII removal validation
- **Historical Data Simulation**: Session history mocking

### Validation Testing

#### Deployment SOW Validation
```bash
# Validate generated SOW completeness
npm test -- --grep "SOW generation"

# Test recommendation quality scoring
npm test -- --grep "recommendation ranking"
```

#### Knowledge Gap Detection
- **Missing Documentation**: Knowledge base completeness
- **External Source Conflicts**: Documentation consistency
- **Learning Loop Validation**: Improvement over time
- **Customer Satisfaction**: Success metric tracking

### Performance Testing Standards

#### Agent Response Times
- **Individual Agent**: < 2 seconds per invocation
- **Orchestrator Flow**: < 10 seconds end-to-end
- **Data Extraction**: < 5 seconds for cloud asset retrieval
- **Report Generation**: < 3 seconds for SOW creation

#### Concurrency Testing
- **Multiple Sessions**: Parallel customer interactions
- **Resource Contention**: Shared data source access
- **Memory Management**: Long-running session handling
- **Error Recovery**: Graceful degradation under load

### Customer Experience Testing

#### Natural Language Processing
```typescript
interface TestScenarios {
  deploymentQuestions: string[];
  errorDescriptions: string[];
  validationRequests: string[];
  followUpQuestions: string[];
}
```

#### Conversation Flow Testing
- **Intent Recognition**: Question categorization accuracy
- **Context Maintenance**: Multi-turn conversation coherence
- **Clarification Handling**: Missing information requests
- **Satisfaction Detection**: Completion signal recognition

## Running Tests

### Development Testing
```bash
# Run all agent unit tests
npm test

# Run integration tests
npm run test:integration

# Run specific agent tests
npm test -- --grep "DeploymentAdvisor"

# Run performance tests
npm run test:performance
```

### Mock Service Setup
```bash
# Start mock MCP servers
npm run test:setup-mocks

# Initialize test data
npm run test:seed-data

# Clean test environment
npm run test:cleanup
```

## Test Coverage Requirements

### Code Coverage Targets
- **Agent Logic**: 90% statement coverage
- **Error Handling**: 100% error path coverage
- **Integration Points**: 85% interaction coverage
- **Critical Paths**: 100% deployment flow coverage

### Functional Coverage Areas
- **All Customer Flows**: Initial deployment, error handling, validation
- **All Data Sources**: MCP integration, web search, historical data
- **All Output Formats**: SOW generation, JSON responses, error messages
- **All Error Scenarios**: Network failures, data inconsistencies, timeouts

## Continuous Testing Strategy

### Automated Test Execution
- **Pre-commit Hooks**: Unit test execution
- **CI/CD Pipeline**: Full test suite on pull requests
- **Nightly Testing**: Performance and integration tests
- **Production Monitoring**: Real customer interaction validation

### Quality Gates
- **Test Coverage**: Minimum 85% overall coverage
- **Performance**: Response time thresholds
- **Error Rate**: < 1% critical error rate
- **Customer Satisfaction**: Success metric tracking