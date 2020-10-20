# datanalyze
Datanalyze is Mines Nancy's computer science department student project. It aims the development of an data analysis and machine learning platform. The students in charge are Damien Couillard (3rd year student) and Benjamin Izart (2nd year student). This repository contains the in-development codebase.

## Quickstart
The in-development platform relies on Docker and docker-compose so first, you need to install them both. See : https://docs.docker.com/get-docker/

Then, clone the repository.
```
$ git clone 
```

To build the platform run in the root directory (please be sure that you have the permission to run docker-compose, else try with ```sudo``` or equivalent).
```
$ docker-compose build
```

When the platform is built locally, it can be launched using
```
$ docker-compose up
```

To shutdown the platform and save the data  use 
```
$ docker-compose down
```
To shutdown the platform and erase all data use
```
$ docker-compose down -v
```

## Changelog
---
**NOTE**

The repository changelog is weekly updated. It is more a students work report than a real versionning. This section only contains last week report. To see the full changelog, please refer to Changelog.md in the root directory.

---
 **Week 2** - from 19/10/2020 to 25/10/2020
 
  * React tutorial for UI development
  * Changelog and README update
