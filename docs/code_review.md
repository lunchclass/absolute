# CODE_REVIEW
1. [Prepare reviews](#preparereviews)
2. [Find reviewers](#findreviewers)
3. [Request reviews](#requestreviews)
4. [Approve reviews](#approvereviews)

## <a name="preparereviews"></a>Prepare reviews
### Check CI
Reviews should be started after passing all CI tests. CI is automatically ran when you create a pull-request.
![ResultOfCI](https://hyungheo.github.io/png/ci.sample.png)

## <a name="findreviewers"></a>Find reviewers

### Code Owners
You can assign reviewers for your pull-requests but an approval of code owners is required to merge you patch to the mater branch.
Code owners are requested as reviewers automatically if your patch includes the source that the code owner is responsible for.
[CODEOWNERS](https://github.com/lunchclass/absolute/blob/master/CODEOWNERS)
   ```
   # Order is important; the last matching pattern takes the most precedence.

   # Absolute Project Owners
   * @romandev
   ```

### When modifying existing code
It is recommended to add contributors who related to your patches as reviewers.
You can find the contributor who commited related code using "git blame".

ex) If you want to know who modified source code line 1 ~ 3 in absolute.cmd
   ```
   git blame -L 1,3 HEAD^ absolute.cmd

   git blame -L 1,3 absolute.cmd
   439684c6 (tester 2017-09-29 19:11:25 +0900 1) :: Copyright (c) 2017 The Absolute Authors.
   439684c6 (tester 2017-09-29 19:11:25 +0900 2) ::
   439684c6 (tester 2017-09-29 19:11:25 +0900 3) :: Licensed under the Apache License, V
   ```

## <a name="requestreviews"></a>Request reviews
If you are a code owner, please review within 24 hours when you get review requests. (Exclude holidays and weekends)
At least reviewers should leave the meaningful comment.
Do not critisize and aggressive to reviewees. Please respect. :D

## <a name="approvereviews"></a>Approve reviews
Reviews are approved when code owners comment *LGTM* then approve. *LGTM* means `Looks Good to me`.

Those acronyms are often used.
 * LGTM : Looks Good To Me
 * IMHO : In My Humble Opinion
 * PTAL : Please Take A Look
 * NIT :  A small change that may not be very important, but is technically correct.
 * ditto : The same


## After approving reviews
You have to check if the conflicting occurs when fetch and rebase based on upstream before merging.
   ```
   git fetch upstream
   git rebase upstream/master

# when resolve is required because of conflict files
   git rebase --continue
   ```

