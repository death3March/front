# proto

```
npx grpc_tools_node_protoc \
  -I=./src \
  --ts_out=./src \
  ./src/api/server-message.proto
```