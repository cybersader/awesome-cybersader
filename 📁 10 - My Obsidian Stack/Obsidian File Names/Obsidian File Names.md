---
aliases: 
tags: 
publish: true
permalink:
date created: Friday, December 20th 2024, 9:24 am
date modified: Friday, December 20th 2024, 9:24 am
---

In Windows, file names support a wide range of Unicode characters, but there are some restrictions. Here are the general rules and guidelines for Unicode characters in Windows file names:

# Characters Allowed in Windows File Names

1. **Most Unicode Characters**: This includes letters, numbers, symbols, and emojis.
2. **Case Sensitivity**: File names in Windows are case-insensitive, but the case is preserved.
3. **Spaces and Unicode Whitespace**: Spaces and many Unicode whitespace characters are allowed.

# Characters Not Allowed

The following characters are reserved or disallowed:

- `\ / : * ? " < > |`
- Characters with ASCII values 0–31 (control characters).
- The file name cannot end with a space or a period (`.`).

## Additional Notes

- Windows file systems like NTFS support Unicode, so emojis and many special characters are valid.
- Certain characters might be problematic depending on the software used to access or process the file.

