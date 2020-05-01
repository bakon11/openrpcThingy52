import { Server, ServerOptions } from "@open-rpc/server-js";
import { HTTPServerTransportOptions } from "@open-rpc/server-js/build/transports/http";
import { WebSocketServerTransportOptions } from "@open-rpc/server-js/build/transports/websocket";
import { OpenrpcDocument } from "@open-rpc/meta-schema";
import { parseOpenRPCDocument } from "@open-rpc/schema-utils-js";
import methodMapping from "./generated-method-mapping";
import doc from "./openrpc.json";
import fs from "fs";
export async function start() {
  const serverOptions: ServerOptions = {
    openrpcDocument: await parseOpenRPCDocument(doc as OpenrpcDocument),
    transportConfigs: [
      {
        type: "HTTPTransport",
        options: {
          port: process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT, 10) : 4441,
          middleware: [],
        } as HTTPServerTransportOptions,
      },
      {
        type: "HTTPSTransport",
        options: {
          port: process.env.HTTPS_PORT ? parseInt(process.env.HTTPS_PORT, 10) : 4442,
          middleware: [],
          key: fs.readFileSync("./ssl/server.key"),
          cert:fs.readFileSync("./ssl/server.cert"),

        } as HTTPServerTransportOptions,
      },
      {
        type: "WebSocketTransport",
        options: {
          port: process.env.WS_PORT || 3331,
          middleware: [],
        } as WebSocketServerTransportOptions,
      },
    ],
    methodMapping,
  };

  console.log("Starting Server"); // tslint:disable-line
  const s = new Server(serverOptions);

  s.start();
  if (serverOptions.transportConfigs) {
    console.log(serverOptions.transportConfigs.map((t: any) => `${t.type} running on: ${t.options.port}`).join("\n")); //tslint:disable-line
  }
}
