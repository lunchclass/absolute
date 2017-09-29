Absolute v2
===========
[![Linux/Max Build Status](https://travis-ci.org/lunchclass/absolute.svg?branch=master)](https://travis-ci.org/lunchclass/absolute/branches)
[![Windows Build status](https://ci.appveyor.com/api/projects/status/099u4iekeny4lpsa/branch/master?svg=true)](https://ci.appveyor.com/project/romandev/absolute/branch/master)

Absolute is web-based ordering platform like siren-order for starbucks.
We are focused on creating a platform that is portable, cheaper, easier,
decenteralized, appless.

### What of v1?
There was a previous incarnation of this project. We had written it in the most quick and dirty manner that was handy because we required it as a dependency in an experiment. But it made maintenance difficult eventually.

So, we decided to restart from scratch to build on solid foundations after long discussion.
The following things are important differences between v1 and v2.
- Use TypeScript instead of Javascript with Babel.
  - It makes our build system simpler and we can use many syntax sugars such as explicit type and access modifiers in language level.
- SHOULD write tests in any change.
  - We did skip too many tests in feature implementation. Our goal is keeping our test coverage over 85% in v2.
- SHOULD write design documents when implementing a new feature.
  - We did miss too many documents in feature implementation. It made maintenance difficult eventually. It is mandatory to write a design document when implementing a new feature in v2.

## Getting started
There is no additional work for testing Absolute project.

#### Linux & Mac
- You can just run the following command simply.
  - ```./absolute```

#### Windows
- If you are using Bash style shell such as git-bash and cygwin, you can run the following command as on Linux.
  - ```./absolute```
- If you are using CMD or PowerShell, you should run the following command without ```./``` prefix.
  - ```absolute```
