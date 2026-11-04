# Security Specification & Test Matrix for TS Prompt Store

## 1. Data Invariants
- Prompts are public read-only for store visitors, with write permissions restricted to authenticated publishers or system workflows.
- Increment actions on counters (e.g., `copyCount`, `likesCount`, `viewsCount`) must only increment within bounded delta constraints and cannot overwrite core prompt content, image URLs, or titles.
- Prompt documents must enforce valid string types, strict length boundaries (e.g. title <= 200, prompt <= 5000, description <= 1000, imageUrl <= 2048), and proper array sizes for tags (max 15 items).
- No unvalidated fields or arbitrary payload pollution ("Shadow Update" prevention).
- Categories are read-only for public visitors.

## 2. The Dirty Dozen Payloads (Rejection Targets)
1. **Unbounded Title Injection**: Payload with `title` string length > 200 chars.
2. **Denial-of-Wallet Array**: Tags array with > 50 elements.
3. **Ghost Field Mutation**: Writing a prompt with an unexpected administrative privilege flag `isAdminOverride: true`.
4. **Invalid Image URL Type**: Providing a number or nested object instead of a string URL.
5. **Prompt Content Deletion**: Empty or non-string `prompt` text field.
6. **Path Traversal / Malformed ID**: Prompt creation with document ID violating `^[a-zA-Z0-9_\-]+$`.
7. **Negative Likes Counter**: Attempting to set `likesCount: -9999`.
8. **Arbitrary Write to System Collections**: Attempting to write into unconfigured `/configs/system`.
9. **Tampering with Categories**: Anonymous user attempting to delete or overwrite `/categories/{categoryId}`.
10. **Null Required Field**: Payload missing `category` or `prompt` text.
11. **Huge Counter Mutation**: Incrementing `viewsCount` by 50,000 in a single request.
12. **Malicious Script in Field**: Exceeding strict field length or malformed type structures.

## 3. Security Rules Verification
All 12 adversarial test vectors must evaluate to `PERMISSION_DENIED` under the hardened ruleset.
