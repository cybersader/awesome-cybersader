# GPT Project Workspace

---

# Pres and Paper

[Presentation](GPT%20Project%20Workspace/Presentation.md)

# Architecture

[Project Overview and Architecture](GPT%20Project%20Workspace/Project%20Overview%20and%20Architecture.md)

# Development

[ReXplorer main and superjobs](GPT%20Project%20Workspace/ReXplorer%20main%20and%20superjobs.md)

[Data Acquisition](GPT%20Project%20Workspace/Data%20Acquisition.md)

[Topic Extraction or Ideation](GPT%20Project%20Workspace/Topic%20Extraction%20or%20Ideation.md)

[Topic Expansion](GPT%20Project%20Workspace/Topic%20Expansion.md)

[GPT Trainer](GPT%20Project%20Workspace/GPT%20Trainer.md)

## Storing Data “Portably”

To make your application portable without using a traditional database, you can consider the following options:

1. **SQLite**: SQLite is a lightweight, serverless, and self-contained database engine. It stores data in a single file, making it easy to move and manage. SQLite is ideal for small to medium-sized applications and requires minimal setup. It's also included in Python's standard library, which means you don't need to install any additional packages to use it. SQLite offers most of the features of a traditional database while keeping your application portable.
2. **JSON Files**: Instead of using a database, you can store your data in JSON files. This approach is suitable for small amounts of data and simple data structures. Each training job can have a dedicated JSON file containing its information (job ID, status, tags, etc.). To manage the jobs, you can read, update, or delete the JSON files as required. To make it more organized, you can store all job-related JSON files in a specific directory within your application.
3. **CSV Files**: Similar to JSON files, you can store your data in CSV files. CSV files are useful when working with tabular data and can be easily imported or exported. You can manage the training jobs by reading, updating, or deleting rows in the CSV file corresponding to specific job IDs.
4. **Pickling**: Python's **`pickle`** module allows you to serialize and deserialize Python objects. You can use pickling to store your data as binary files. This method is suitable for storing complex Python objects, but keep in mind that pickled files may not be portable across different Python versions or platforms.

## Web-Based Clients

[Turning into Web](GPT%20Project%20Workspace/Turning%20into%20Web.md)

# GPT Questions

[How GPT Training Works](GPT%20Project%20Workspace/How%20GPT%20Training%20Works.md)