#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { SaltApiClient } from "./salt-api-client.js";
import { z } from "zod";

const server = new Server(
  {
    name: "salt-api-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Initialize Salt API client
const saltClient = new SaltApiClient();

// Tool schemas
const ListCloudAssetsArgsSchema = z.object({
  limit: z.number().min(1).max(1000).optional().default(100),
  offset: z.number().min(0).optional().default(0),
});

const GetCloudAssetArgsSchema = z.object({
  id: z.string().min(1),
});

// List tools handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_cloud_assets",
        description: "Get a list of company cloud assets from Salt Security API",
        inputSchema: {
          type: "object",
          properties: {
            limit: {
              type: "number",
              description: "Maximum number of assets to return (1-1000, default: 100)",
              minimum: 1,
              maximum: 1000,
              default: 100,
            },
            offset: {
              type: "number",
              description: "Number of assets to skip for pagination (default: 0)",
              minimum: 0,
              default: 0,
            },
          },
        },
      },
      {
        name: "get_cloud_asset",
        description: "Get a specific cloud asset by ID from Salt Security API",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The unique identifier of the cloud asset",
            },
          },
          required: ["id"],
        },
      },
    ],
  };
});

// Call tool handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "list_cloud_assets": {
        const parsed = ListCloudAssetsArgsSchema.parse(args);
        const result = await saltClient.listCloudAssets(parsed.limit, parsed.offset);
        
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case "get_cloud_asset": {
        const parsed = GetCloudAssetArgsSchema.parse(args);
        const result = await saltClient.getCloudAsset(parsed.id);
        
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      content: [
        {
          type: "text",
          text: `Error: ${errorMessage}`,
        },
      ],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Salt API MCP server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});