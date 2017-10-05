# Contribution Guide
A guide for the Absolute contributors.
It contains the rules that the contributor should follow and useful content such as the process of a pull-request.  

- [Preparations](#preparations)  
- [Creating an issue](#creating_an_issue)
- [Patch](#patch)  
  - [Patch size](#patch_size)  
  - [Add file](#add_file)
- [Commit](#commit)  
  - [Coding style](#coding_style)  
  - [Description](#description)
- [Pull-request](#pull-request)
- [Code review](#code_review)
- [Add AUTHORS](#add_authors)

## Preparations
Fork a lunchclass/absolute repo & add into your github repo.  

Click **Fork** in lunchclass/absolute repo,
![fork-1](https://hyungheo.github.io/png/fork-1.png)

Select your repo for creating the project.  
![fork-2](https://hyungheo.github.io/png/fork-2.png)

Clone the forked project into your local git. (*If your account is **hyungheo***)
```
git clone https://github.com/hyungheo/absolute.git
```
Add a lunchclass/absolute repo as 'upstream' to remote.
```
git remote add upstream https://github.com/lunchclass/absolute.git
git remote -v
```

That is, **origin** should be your forked repo and **upstream** should be *lunchclass/absolute* repo.
```
origin    https://github.com/hyungheo/absolute.git (fetch)
origin    https://github.com/hyungheo/absolute.git (push)
upstream	https://github.com/lunchclass/absolute.git (fetch)
upstream	https://github.com/lunchclass/absolute.git (push)
```

If you want to update the latest patch of lunchclass/absolute, fetch and rebase from upstream.
```
git fetch upstream
git rebase upstream/master
# if you need a resolve because of the conflict file,
git rebase --continue
```

## Creating_an_issue
If you've found a bug in existing code, or have come up with a new idea, please post it on the issue first.
(For more information, see the [Issue Reporting](/docs/issue_reporting.md) section.)
Talk to the code owners about your issue before patching them.
You can find out who is the code owner through [CODEOWNERS](https://github.com/lunchclass/absolute/blob/master/docs/CODEOWNERS).

## Patch
### Patch_size
Small size patches are recommended. This rule makes faster and better code reviews possible.
Also it is easy to catch issues you may find in the review process.
Nonetheless, if you have a lot of fixes due to the new implementation, it is a good idea to divide the patches into small steps.

ex)   
First, upload frame of functions without content
```TypeScript
function foo(num: number): number {
  // Not Implemented
}

function foo(num: number): number {
  // Not Implemented
}
```

Next, implement in one
```TypeScript
function foo(num: number): number {
  let ret : number = 0;
  if( num <= 1 ) {
    return num;
  } else if( num > 1 ) {
    ret =  foo(num-1) + foo(num-2);
  }
  return ret;
}

function foo(num: number): number {
  // Not Implemented
}
```

Finally, implement in the other
```TypeScript
function foo(num: number): number {
  let ret : number = 0;
  if( num <= 1 ) {
    return num;
  } else if( num > 1 ) {
    ret =  foo(num-1) + foo(num-2);
  }
  return ret;
}


function bar(num: number): number {
  return foo(num);
}
```

### Add_file
If the patch contains new file additions, you should add boilerplate notice and it must show the year. For more information, see [LICENSE.md](/LICENSE.md).  
ex)  
```TypeScript
/*
 * Copyright (c) 2017 The Absolute Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 function foo(num: number): number {
```

## Commit
### Coding_style
Before committing, you need to make sure that your coding style follows the rules of this project. Absolute conforms to the coding style of
[Microsoft / TypeScript](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines).  

### Description
Please consider the following rules to create a commit message. Consistently writing is the best way to collaborate with other contributors. For more infomation, see
[here](https://chris.beams.io/posts/git-commit).  

- Separate text and titles using blank lines
- Limit title to 50 characters
- Title starts with an uppercase letter
- Do not use periods in the title
- Use word with imperative mood in title
- Limit one line to 72 characters
- Write down **why** i modified **something**

### Push
After committing, push it to your origin(forked) repo.
If possible, we recommend rebasing to the latest history of upstream (*lunchclass / absolute*) first.
```
git fetch upstream
git rebase upstream/master
git push origin
```

## Pull-request
Send a pull-request to the absolute_2.0 branch of upstream repo.
![PullRequest](https://hyungheo.github.io/png/pullrequest.png)

At the same time as the pull-request is sent out, the CI will perform the build check and lint for the patch.
If CI passes normally, you can see "All checks have passed" in the pull-request webpage.
![ResultOfCI](https://hyungheo.github.io/png/ci.sample.png)

## Code_review
In order for your pull-request to be applied to the master branch, you have to go through the review phase.
To pass, the following conditions apply:
- Approval of reviewers with the review authority
- Pass all test cases at CI

Even if you do not have permission to review, you can review the pull-requests opened by contributors.
But reviewers should respect and avoid being aggressive in their reviews or blaming them.
For more information, see [docs / code_review.md](/docs/code_review.md).

## Add_AUTHORS
If this is your first patch, be sure to add your name and email to [AUTHORS](https://github.com/lunchclass/absolute/blob/master/docs/AUTHORS). When adding names, be sure to fill in **alphabetical order**.

ex) When *Aberaham Lee* uploads the first patch, if there is a Jinho Bang in the existing AUTHORS file...
```
# Names should be added to this file with this pattern:
#
# For individuals:
#   Name <email address>
#
# For organizations:
#   Organization <fnmatch pattern>
#
# Please update your name in this file with you first change.
# Please keep your name in alphabetical order.

Jinho Bang <zino@chromium.org>
```

*Aberaham Lee* should be added **above** the *Jinho Bang*.
```
# Names should be added to this file with this pattern:
#
# For individuals:
#   Name <email address>
#
# For organizations:
#   Organization <fnmatch pattern>
#
# Please update your name in this file with you first change.
# Please keep your name in alphabetical order.

Aberaham Lee <abe@lunchclass.org>
Jinho Bang <zino@chromium.org>
```
