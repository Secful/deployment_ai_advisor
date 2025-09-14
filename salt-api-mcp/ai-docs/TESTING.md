# Testing

## Test Strategy
Comprehensive testing approach focusing on API integration, schema validation, and error handling. Testing ensures reliability of the Salt Security API integration and MCP protocol implementation.

## Running Tests

```bash
# Run all tests (Jest framework)
npm test

# Run CLI testing mode (implemented and working)
npm run test-mode -- list_tools
npm run test-mode -- list_cloud_assets --limit 5
npm run test-mode -- get_cloud_asset --id test-asset-123

# Show CLI test help
npm run test-mode -- --help

# Build and run tests
npm run build && npm run test-mode:build
```

## Test Coverage
- **Target Coverage**: 90%+ for critical paths
- **Required Coverage**: 80%+ for all modules
- **Coverage Report**: HTML report generated in `coverage/` directory

### Coverage Areas
- API client request/response handling
- Schema validation for all data structures
- Error handling for all failure scenarios
- MCP tool registration and execution
- Authentication and configuration management

## Writing Tests

### Test Organization
```
src/
├── __tests__/
│   ├── salt-api-client.test.ts    # API client tests
│   ├── index.test.ts              # MCP server tests
│   └── schemas.test.ts            # Schema validation tests
└── __mocks__/
    ├── axios.ts                   # Axios mock
    └── salt-responses.ts          # Mock API responses
```

### Test Categories

#### 1. Unit Tests
- **API Client Methods**: Test individual methods in isolation
- **Schema Validation**: Test Zod schema parsing and error handling
- **Error Mapping**: Test API error to user error transformation
- **Configuration**: Test environment variable handling

#### 2. Integration Tests
- **MCP Tool Execution**: End-to-end tool call testing
- **API Client Integration**: Real API calls with mock responses
- **Error Propagation**: Error handling across layers
- **Authentication Flow**: Bearer token injection and validation

#### 3. Schema Tests
- **Valid Data**: Test schema parsing with correct data
- **Invalid Data**: Test schema rejection with incorrect data
- **Optional Fields**: Test handling of missing optional fields
- **Type Coercion**: Test proper type validation and conversion

### Test Patterns

#### API Client Testing
```typescript
describe('SaltApiClient', () => {
  let client: SaltApiClient;
  
  beforeEach(() => {
    // Mock axios responses
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn(),
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() }
      }
    });
    
    // Set test environment
    process.env.SALT_BEARER_TOKEN = 'test_token';
    client = new SaltApiClient();
  });
  
  it('should list cloud assets with default parameters', async () => {
    const mockResponse = { data: mockCloudAssetsResponse };
    (client as any).client.get.mockResolvedValue(mockResponse);
    
    const result = await client.listCloudAssets();
    
    expect(result).toEqual(mockCloudAssetsResponse);
    expect((client as any).client.get).toHaveBeenCalledWith('/cloud-assets', {
      params: { limit: 100, offset: 0 }
    });
  });
});
```

#### Schema Validation Testing
```typescript
describe('CloudAssetSchema', () => {
  it('should validate complete cloud asset', () => {
    const validAsset = {
      id: 'asset_123',
      name: 'test-asset',
      type: 'EC2Instance',
      provider: 'AWS',
      region: 'us-east-1',
      status: 'running',
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-01-20T14:45:00Z',
      tags: { Environment: 'test' },
      metadata: { instance_type: 't3.micro' }
    };
    
    const result = CloudAssetSchema.parse(validAsset);
    expect(result).toEqual(validAsset);
  });
  
  it('should validate minimal cloud asset', () => {
    const minimalAsset = { id: 'asset_123' };
    
    const result = CloudAssetSchema.parse(minimalAsset);
    expect(result.id).toBe('asset_123');
  });
  
  it('should reject asset without id', () => {
    const invalidAsset = { name: 'test-asset' };
    
    expect(() => CloudAssetSchema.parse(invalidAsset)).toThrow();
  });
});
```

#### MCP Server Testing
```typescript
describe('MCP Server', () => {
  it('should register correct tools', async () => {
    const listToolsResponse = await server.handleRequest({
      method: 'tools/list',
      params: {}
    });
    
    expect(listToolsResponse.tools).toHaveLength(2);
    expect(listToolsResponse.tools[0].name).toBe('list_cloud_assets');
    expect(listToolsResponse.tools[1].name).toBe('get_cloud_asset');
  });
  
  it('should handle list_cloud_assets tool call', async () => {
    const mockResponse = { data: [{ id: 'asset_123' }] };
    jest.spyOn(saltClient, 'listCloudAssets').mockResolvedValue(mockResponse);
    
    const response = await server.handleRequest({
      method: 'tools/call',
      params: {
        name: 'list_cloud_assets',
        arguments: { limit: 10 }
      }
    });
    
    expect(response.content[0].text).toContain('asset_123');
  });
});
```

### Error Testing
```typescript
describe('Error Handling', () => {
  it('should handle 401 authentication errors', async () => {
    const error = {
      response: { status: 401, statusText: 'Unauthorized' }
    };
    (axios.create().get as jest.Mock).mockRejectedValue(error);
    
    await expect(client.listCloudAssets()).rejects.toThrow(
      'Authentication failed. Please check your Bearer token.'
    );
  });
  
  it('should handle network errors', async () => {
    const error = { code: 'ENOTFOUND' };
    (axios.create().get as jest.Mock).mockRejectedValue(error);
    
    await expect(client.listCloudAssets()).rejects.toThrow(
      'Network error: Unable to reach Salt Security API'
    );
  });
  
  it('should handle schema validation errors', async () => {
    const invalidResponse = { data: { invalid: 'data' } };
    (axios.create().get as jest.Mock).mockResolvedValue(invalidResponse);
    
    await expect(client.getCloudAsset('test_id')).rejects.toThrow(
      'Invalid API response format'
    );
  });
});
```

## Test Data

### Mock API Responses
```typescript
// __mocks__/salt-responses.ts
export const mockCloudAssetsResponse = {
  data: [
    {
      id: 'asset_ec2_123',
      name: 'web-server-test',
      type: 'EC2Instance',
      provider: 'AWS',
      region: 'us-east-1',
      status: 'running',
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-01-20T14:45:00Z',
      tags: {
        Environment: 'test',
        Team: 'backend'
      },
      metadata: {
        instance_type: 't3.micro',
        ami_id: 'ami-12345678'
      }
    }
  ],
  total: 1,
  limit: 100,
  offset: 0,
  has_more: false
};

export const mockSingleAssetResponse = {
  id: 'asset_s3_456',
  name: 'test-bucket',
  type: 'S3Bucket',
  provider: 'AWS',
  region: 'us-west-2',
  status: 'active',
  tags: {
    Purpose: 'testing'
  }
};
```

### Test Environment Setup
```typescript
// jest.setup.ts
beforeEach(() => {
  // Reset environment variables
  delete process.env.SALT_BEARER_TOKEN;
  
  // Clear axios mocks
  jest.clearAllMocks();
});

afterEach(() => {
  // Cleanup
  jest.restoreAllMocks();
});
```

### Mock Configurations
```typescript
// __mocks__/axios.ts
export default {
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() }
    }
  }))
};
```

## Continuous Integration

### GitHub Actions Test Workflow
```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '20'
        
    - run: npm ci
    - run: npm run build
    - run: npm test
    - run: npm run test:coverage
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info
```

### Pre-commit Hooks
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run test && npm run build",
      "pre-push": "npm run test:coverage"
    }
  }
}
```

## Test Configuration

### Jest Configuration
```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.test.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/**/__mocks__/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};
```

### TypeScript Test Configuration
```json
// tsconfig.test.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "types": ["jest", "node"]
  },
  "include": [
    "src/**/*",
    "src/**/__tests__/**/*",
    "jest.setup.ts"
  ]
}
```