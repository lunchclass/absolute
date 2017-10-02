# CODE_REVIEW
1. [리뷰준비](#리뷰준비)
2. [리뷰어찾기](#리뷰어찾기)
3. [리뷰요청](#리뷰요청)
4. [리뷰승인](#리뷰승인)

## 리뷰준비
### CI확인
리뷰는 기본적으로 CI 가 모두 PASS 한 뒤에 요청하는 것을 원칙으로 합니다. CI 는 풀리퀘스트를 보냄과 동시에 자동으로 실행됩니다.
![ResultOfCI](https://hyungheo.github.io/png/ci.sample.png)

## 리뷰어찾기

### 코드오너
[CODEOWNERS](https://github.com/lunchclass/absolute/blob/master/docs/CODEOWNERS) 를 확인하여 코드오너를 리뷰어로 할당합니다. 코드오너가 아니더라도 리뷰는 누구나 가능하지만 머지를 위해서는 반드시 코드오너의 리뷰와 승인이 필요합니다.

```
# Order is important; the last matching pattern takes the most precedence.

# Absolute Project Owners
* @romandev
```

### 기존코드수정시
기존 코드를 수정해야 하는 경우 해당 코드의 컨트리뷰터를 리뷰어에 추가해 주시기를 권장합니다.
해당 코드의 컨트리뷰터를 찾기 위해 git blame 명령어를 사용할 수 있습니다.

예) absolute.cmd 의 1번부터 3번 라인을 수정한 경우
```
git blame -L 1,3 HEAD^ absolute.cmd

git blame -L 1,3 absolute.cmd
439684c6 (Jinho Bang 2017-09-29 19:11:25 +0900 1) :: Copyright (c) 2017 The Absolute Authors.
439684c6 (Jinho Bang 2017-09-29 19:11:25 +0900 2) ::
439684c6 (Jinho Bang 2017-09-29 19:11:25 +0900 3) :: Licensed under the Apache License, V
```

## 리뷰요청
리뷰어를 할당되면 리뷰요청이 전달됩니다.
리뷰어 중 코드오너는 리뷰요청뒤 24시간내로 리뷰를 해야 합니다.(공휴일과 주말은 제외)
24시간내에 리뷰가 완료되어야 함을 의미하는 것은 아닙니다만, 적어도 의미있는 피드백을 요청자에게 주어야 합니다.
리뷰어는 리뷰이를 존중하며 리뷰시 공격적이나 상대를 비난하는 태도는 지양합니다.

## 리뷰승인
코드오너가 *LGTM* 을 코멘트로 추가하고 Approve 를 해주어야만 리뷰가 승인됩니다. *LGTM* 는 `Looks Good to me`를 의미합니다.

참고로 리뷰에 자주 사용되는 용어는 다음과 같습니다.
 * LGTM : Looks Good To Me
 * IMHO : In My Humble Opinion
 * PTAL : Please Take A Look
 * NIT :  A small change that may not be very important, but is technically correct.


## 리뷰승인후
머지전에 upstream 을 베이스로 fetch 와 리베이스를 진행하여 컨플릭이 발생하는지를 확인합니다.
```
git fetch upstream
git rebase upstream/master

# 컨틀릭트 파일이 존재하여 리졸브가 필요했을 경우
git rebase --continue
```
