# Open AI Image General



```mermaid
flowchart TD
    A[Client] --> [Server on Render]B;
    B --> [OpenAI Image Generator]C;
    C --> B;
    B --> A;
    D[Client Saves Prompt] --> B
    B --> [MongoDBAtlas]E
```