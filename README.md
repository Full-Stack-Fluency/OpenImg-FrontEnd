# Open AI Image General

Code Name: OpenImg

## Summary of idea:

User will be able to use image generator API to create custom image using words.

What problem or pain point does it solve? a. Keep it high level without going into too much detail. (3-4 sentences is enough)
Art for people that aren't artist.

Minimum Viable Product (MVP) definition. 
Allows use to save rendered images to the database.

-------------------------------------------------------------------------------------------------------------------------------------------------


1. Logs in
2. Creates Prompt and gets Image back
3. Saves that prompt 
4. Edits that prompt
## Step1 : Client logs in
```mermaid
flowchart TD
    A[Client clicks Log in] --> B[Client is redirected to Auth0 login];
    B[Auth0 sends client back to site] --> C{website UI};
```
## Step 2: Client creates a prompt and gets the image based on that
```mermaid
flowchart TD
    A[Client creates prompt] --> B{Server on Render sends prompt to API};
    B --> C{OpenAI Image Generator Creates Image and sends it back};
    C --> B;
    B --> A;
```
## Step 3: Client saves their prompt to DB
```mermaid
flowchart TD
    A[Client saves prompt] --> B{Server on Render sends prompt with email info to DB};
    B --> C{MongoDB Atlas stores prompt with user email};
```
## Step 4: Client updates their prompt
```mermaid
flowchart TD
    A[Client wants to edit a prompt] --> B{Server on Render requests prompt};
    C[Client Updates Prompt] --> B{Server on Render requests prompt};
    B --> C{MongoDB Atlas sends prompt};
```
