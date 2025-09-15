#!/usr/bin/env node

import { SaltApiClient } from "./salt-api-client.js";
import { z } from "zod";

// Shared schemas
const ListCloudAssetsArgsSchema = z.object({
  limit: z.number().min(1).max(1000).optional().default(100),
  offset: z.number().min(0).optional().default(0),
});

const GetCloudAssetArgsSchema = z.object({
  id: z.string().min(1),
});

export class McpTools {
  private saltClient: SaltApiClient;

  constructor() {
    this.saltClient = new SaltApiClient();
  }

  // Tool discovery - returns available MCP tools
  async listTools() {
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
  }

  // Tool execution - handles calling the actual tools
  async callTool(toolName: string, args: any) {
    try {
      switch (toolName) {
        case "list_cloud_assets": {
          const parsed = ListCloudAssetsArgsSchema.parse(args);
          const result = await this.saltClient.listCloudAssets(parsed.limit, parsed.offset);
          
          return {
            content: [
              {
                type: "text",
                text: result.yaml || JSON.stringify(result, null, 2),
              },
            ],
          };
        }

        case "get_cloud_asset": {
          const parsed = GetCloudAssetArgsSchema.parse(args);
          const result = await this.saltClient.getCloudAsset(parsed.id);
          
          return {
            content: [
              {
                type: "text",
                text: result.yaml || JSON.stringify(result, null, 2),
              },
            ],
          };
        }

        default:
          throw new Error(`Unknown tool: ${toolName}`);
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
  }
}