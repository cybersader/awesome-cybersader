# HDFS Hadoop Map Reduce

# MapReduce Architecture

## The idea

- Separate into groups which can all be analyzed in parallel

![Untitled](LESSONS/Untitled%2030.png)

## MapReduce Process

- Map → list(k2,v2)
- Reduce(k2,list(v2)) → list(k2,v3)

### Example

- Input - Occurences of something
- Split - Splitting up the data
- Map - Still not aggregating and counting.  Just KV pairs (Deer, 1)(Car,1)(Car,1)
- Shuttle/Sort - group up matching keys
- Reduce - count the values
- Output: Keys with Values as the amount of occurences

## Local Aggregation (Combiner)

- Combining at the Map task or phase

# Hadoop Map Reduce Commands

## Basic HDFS DFS Commands

Below are basic `hdfs dfs` or `hadoop fs` Commands.

| Command | Description |
| --- | --- |
| -ls | List files with permissions and other details |
| -mkdir | Creates a directory named path in HDFS |
| -rm | To Remove File or a Directory |
| -rmr | Removes the file that identified by path / Folder and subfolders |
| -rmdir | Delete a directory |
| -put | Upload a file / Folder from the local disk to HDFS |
| -cat | Display the contents for a file |
| -du | Shows the size of the file on hdfs. |
| -dus | Directory/file of total size |
| -get | Store file / Folder from HDFS to local file |
| -getmerge | Merge Multiple Files in an HDFS |
| -count | Count number of directory, number of files and file size |
| -setrep | Changes the replication factor of a file |
| -mv | HDFS Command to move files from source to destination |
| -moveFromLocal | Move file / Folder from local disk to HDFS |
| -moveToLocal | Move a File to HDFS from Local |
| -cp | Copy files from source to destination |
| -tail | Displays last kilobyte of the file |
| -touch | create, change and modify timestamps of a file |
| -touchz | Create a new file on HDFS with size 0 bytes |
| -appendToFile | Appends the content to the file which is present on HDF |
| -copyFromLocal | Copy file from local file system |
|  |  |
| -copyToLocal | Copy files from HDFS to local file system |
| -usage | Return the Help for Individual Command |
| -checksum | Returns the checksum information of a file |
| -chgrp | Change group association of files/change the group of a file or a path |
| -chmod | Change the permissions of a file |
| -chown | change the owner and group of a file |
| -df | Displays free space |
| -head | Displays first kilobyte of the file |
| -Create Snapshots | Create a snapshot of a snapshottable directory |
| -Delete Snapshots | Delete a snapshot of from a snapshottable directory |
| -Rename Snapshots | Rename a snapshot |
| -expunge | create new checkpoint |
| -Stat | Print statistics about the file/directory |
| -truncate | Truncate all files that match the specified file pattern to the specified length |
| -find | Find File Size in HDFS |