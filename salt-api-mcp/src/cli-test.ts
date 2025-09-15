#!/usr/bin/env node

import { McpTools } from "./mcp-tools.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

function maskToken(token: string): string {
  if (!token || token.length <= 6) {
    return "***";
  }
  const start = token.substring(0, 3);
  const end = token.substring(token.length - 3);
  return `${start}...${end}`;
}

function printTokenStatus() {
  const token = process.env.SALT_BEARER_TOKEN;
  
  if (!token) {
    console.log("❌ SALT_BEARER_TOKEN not configured");
    console.log("📝 Setup Instructions:");
    console.log("   1. Create .env file: cp .env.example .env");
    console.log("   2. Edit .env and set: SALT_BEARER_TOKEN=your_actual_token");
    console.log("   3. Restart the CLI test");
    console.log();
    return false;
  }
  
  console.log(`✅ SALT_BEARER_TOKEN loaded: ${maskToken(token)}`);
  console.log();
  return true;
}

function printUsage() {
  console.log("🧪 MCP Server CLI Test Mode");
  console.log("============================\n");
  console.log("Usage:");
  console.log("  npm run test-mode -- <tool> [options]\n");
  console.log("Available tools:");
  console.log("  list_tools                    - List available MCP tools");
  console.log("  list_cloud_assets [options]   - List cloud assets");
  console.log("  get_cloud_asset --id <id>     - Get specific cloud asset\n");
  console.log("Options for list_cloud_assets:");
  console.log("  --limit <number>    Maximum number of assets (1-1000, default: 100)");
  console.log("  --offset <number>   Pagination offset (default: 0)\n");
  console.log("Options for get_cloud_asset:");
  console.log("  --id <string>       Asset ID (required)\n");
  console.log("Examples:");
  console.log("  npm run test-mode -- list_tools");
  console.log("  npm run test-mode -- list_cloud_assets");
  console.log("  npm run test-mode -- list_cloud_assets --limit 5 --offset 10");
  console.log("  npm run test-mode -- get_cloud_asset --id asset-123");
}

function parseArgs(args: string[]) {
  if (args.length < 1) {
    return null;
  }

  const tool = args[0];
  const params: any = {};

  // Parse remaining arguments as key-value pairs
  for (let i = 1; i < args.length; i += 2) {
    if (!args[i].startsWith('--')) {
      console.error(`❌ Invalid argument: ${args[i]}. Arguments must start with --`);
      return null;
    }
    
    const key = args[i].substring(2); // Remove --
    const value = args[i + 1];
    
    if (!value) {
      console.error(`❌ Missing value for argument: ${args[i]}`);
      return null;
    }

    // Convert numbers
    if (['limit', 'offset'].includes(key)) {
      const numValue = parseInt(value);
      if (isNaN(numValue)) {
        console.error(`❌ ${key} must be a valid number`);
        return null;
      }
      params[key] = numValue;
    } else {
      params[key] = value;
    }
  }

  return { tool, params };
}

class MCPCLITester {
  private mcpTools: McpTools;

  constructor() {
    this.mcpTools = new McpTools();
  }

  private async listTools() {
    return await this.mcpTools.listTools();
  }

  private async callTool(toolName: string, args: any) {
    return await this.mcpTools.callTool(toolName, args);
  }

  async runTest(tool: string, params: any): Promise<void> {
    console.log("🧪 MCP Server CLI Test Mode");
    console.log("============================\n");
    
    // Check token status first
    const hasToken = printTokenStatus();
    if (!hasToken) {
      process.exit(1);
    }
    
    console.log(`📋 Testing tool: ${tool}`);
    if (Object.keys(params).length > 0) {
      console.log(`📝 Parameters: ${JSON.stringify(params)}`);
    }
    console.log();

    try {
      let result: any;
      
      if (tool === "list_tools") {
        result = await this.listTools();
        console.log(`✅ SUCCESS - Found ${result.tools?.length || 0} tools`);
        console.log("📄 Available tools:");
        result.tools?.forEach((t: any) => {
          console.log(`   • ${t.name}: ${t.description}`);
        });
      } else {
        result = await this.callTool(tool, params);
        
        const isError = result?.content?.[0]?.text?.startsWith("Error:");
        const errorText = result?.content?.[0]?.text || "";
        const isAuthError = errorText.includes("Authentication failed");
        const isNotFoundError = errorText.includes("Resource not found");
        const isTokenMissingError = errorText.includes("Salt Security Bearer token not configured");

        if (isError) {
          if (isTokenMissingError) {
            console.log("❌ ERROR - Bearer token not configured");
            console.log(`📄 Error: ${errorText}`);
          } else if (isAuthError) {
            console.log("❌ ERROR - Authentication failed");
            console.log("💡 Check if your Bearer token is valid and has the required permissions");
            console.log(`📄 Error: ${errorText}`);
          } else if (isNotFoundError) {
            console.log("❌ ERROR - API endpoint not found");
            console.log("💡 The API endpoint may have changed or your token may not have access");
            console.log(`📄 Error: ${errorText}`);
          } else {
            console.log("❌ ERROR - Tool execution failed");
            console.log(`📄 Error: ${errorText}`);
          }
        } else {
          console.log("✅ SUCCESS - Tool executed successfully");
          console.log(`📄 Response: ${result.content[0].text.substring(0, 200)}...`);
        }
      }
    } catch (error) {
      console.log("❌ FATAL ERROR");
      console.log(`📄 Error: ${error instanceof Error ? error.message : String(error)}`);
      process.exit(1);
    }
  }
}

async function main() {
  const args = process.argv.slice(2); // Remove 'node' and script name
  
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    printUsage();
    process.exit(0);
  }

  const parsed = parseArgs(args);
  if (!parsed) {
    console.error("\n❌ Invalid arguments\n");
    printUsage();
    process.exit(1);
  }

  const { tool, params } = parsed;

  // Validate tool names
  const validTools = ['list_tools', 'list_cloud_assets', 'get_cloud_asset'];
  if (!validTools.includes(tool)) {
    console.error(`❌ Unknown tool: ${tool}`);
    console.error(`Valid tools: ${validTools.join(', ')}`);
    process.exit(1);
  }

  // Validate required parameters
  if (tool === 'get_cloud_asset' && !params.id) {
    console.error("❌ get_cloud_asset requires --id parameter");
    process.exit(1);
  }

  try {
    const tester = new MCPCLITester();
    await tester.runTest(tool, params);
  } catch (error) {
    console.error("💥 Fatal error:", error);
    process.exit(1);
  }
}

main();