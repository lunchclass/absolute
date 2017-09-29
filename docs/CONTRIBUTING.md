# Contribution Guide

absolute_2.0 컨트리뷰터를 위한 가이드입니다.
풀리퀘스트를 보내고 패치가 머지되기까지의 과정에서 컨트리뷰터가 따라야 하는 규칙이나 참고하면 유용한 내용들을 담고 있습니다.

목차
=================
1. [준비](#준비)
2. [이슈등록](#이슈등록)
3. [패치준비](#패치준비)  
  3-1. [패치사이즈](#패치사이즈)  
  3-2. [파일추가](#파일추가)
4. [커밋준비](#커밋준비)  
  4-1. [코딩스타일](#코딩스타일)  
  4-2. [디스크립션](#디스크립션)
5. [풀리퀘스트](#풀리퀘스트)
6. [코드리뷰](#코드리뷰)
7. [AUTHORS추가](#AUTHORS추가)


## 준비
lunchclass/absolute 저장소를 포크하여 본인의 Github 저장소에 추가합니다.  

1. lunchclass/absolute 레포에서 **Fork** 를 클릭한 뒤  

![fork-1](https://hyungheo.github.io/png/fork-1.png)

2. 프로젝트를 생성할 본인의 저장소를 선택합니다.  

![fork-2](https://hyungheo.github.io/png/fork-2.png)


3. 본인의 저장소에 포크한 프로젝트가 생성된 것을 확인이 되면 작업할 로컬 GIT 에 클론합니다. (*저장소 이름이 **hyungheo** 인 경우*)
```
git clone https://github.com/hyungheo/absolute.git
```

4. 클론 한 뒤에는 리모트 upstrem 에 lunchclass/absolute 를 추가합니다.
```
git remote add upstream https://github.com/lunchclass/absolute.git
git remote -v
```
**origin** 은 나의 저장소, **upstream** 은 *lunchclass/absolute* 여야 합니다.
```
origin	https://github.com/hyungheo/absolute.git (fetch)
origin	https://github.com/hyungheo/absolute.git (push)
upstream	https://github.com/lunchclass/absolute.git (fetch)
upstream	https://github.com/lunchclass/absolute.git (push)
```


5. lunchclass/absolute 의 최신 패치를 업데이트하고 하고 싶으면 upstream 으로 부터 fetch 와 rebase 를 진행합니다.
```
git fetch upstream
git rebase upstream/master
# 컨틀릭트 파일이 존재하여 리졸브가 필요했을 경우
git rebase --continue
```


## 이슈등록
기존 코드에서 버그를 발견하셨거나 새로운 아이디어가 떠오르셨다면 먼저 이슈에 올려주시길 바랍니다. (이슈등록과 관련하여 자세한 내용은 [이슈등록가이드](https://github.com/lunchclass/absolute/blob/master/docs/REPORTING_ISSUE) 란을 참조)

등록한 뒤에는 패치를 준비하시기 이전에 먼저 코드오너와 함께 올리신 이슈에 대해서 이야기를 해보시길 권합니다. 코드오너가 누구인지는 [CODEOWNERS](https://github.com/lunchclass/absolute/blob/master/docs/CODEOWNERS) 를 통해 확인하실 수 있습니다.

## 패치준비
### 패치사이즈
패치는 가능하다면 적당히 작은 사이즈로 올려주시는 편이 좋습니다. 지나치게 많은 수정을 한 패치에 포함시키면 리뷰어가 좋은 코드리뷰를 하기가 어려워지며 리뷰과정에서 발견할 수 있는 이슈를 놓칠 확률이 높아집니다. 만약 새로운 구현으로 인해 수정사항이 많은 경우는 패치를 단계별로 작게 나누어서 올리시는 것도 좋은 방법입니다.

예)   
1. 첫번째 패치에서는 함수들의 껍데기만 먼저 올림
```TypeScript
function foo(num: number): number {
  // Not Implemented
}

function foo(num: number): number {
  // Not Implemented
}
```
2. 두번째 패치에서 한 함수의 구현부를 추가
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

3. 세번째 패치에서 마지막 함수의 구현부를 추가
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

### 파일추가
패치가 기존에 없던 새로운 파일추가를 포함하고 있다면 라이센스를 추가하셔야 합니다. 그리고 라이센스에는 반드시 연도가 표시되어야만 합니다. 라이센스 작성과 관련하여 자세한 내용은 [LICENCE_GUIDE](https://github.com/lunchclass/absolute/blob/master/docs/LICENCE_GUIDE.md) 를 참고하시기 바랍니다.

예)  

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

## 커밋준비
### 코딩스타일
패치가 어느정도 준비되었다면 커밋하시기 전에 먼저 코딩스타일이 본 프로젝트의 규칙을 따르고 있는지 확인이 필요합니다. [CODING_STYLE](https://github.com/lunchclass/absolute/blob/master/docs/CODING_STYLE.md) 를 참고하시길 바랍니다.

### 디스크립션

커밋 메시지는 다음 규칙을 고려해서 작성해 주시길 권장합니다. 일관성 있게 커밋메시지를 잘 작성하는 것은 다른 컨트리뷰터와 협업하기 위한 가장 훌륭한 방법입니다. 커밋메시지 작성법과 관련해서는 [이곳](https://chris.beams.io/posts/git-commit)을 참조하시면 좋습니다.

* 빈 라인을 이용해서 본문과 제목 분리
* 제목 줄을 50 자로 제한
* 제목은 대문자로 시작
* 제목에 마침표를 사용하지 않음
* Imperative mood 한 용어로 제목을 작성
* 한 라인을 72 자로 제한
* 본문에는 무엇을 왜 수정했는가를 기입

### 푸시
커밋이 완료되었다면 본인의 저장소(origin)에 푸시합니다. 가능하다면 upstream (*lunchclass/absolute*) 의 최신 히스토리로 리베이스를 한 뒤 푸시하시기를 권장합니다.
```
git fetch upstream
git rebase upstream/master
git push origin
```

## 풀리퀘스트
커밋을 전에 포크한 본인의 Github 저장소에 푸시합니다. 그 뒤 upstream 의 absolute_2.0 브랜치에 풀리퀘스트를 보냅니다.
![PullRequest](https://hyungheo.github.io/png/pullrequest.png)

풀리퀘스트가 보내짐과 동시에 CI 가 패치에 대한 빌드확인과 린트실행 및 테스트를 진행하게 됩니다.  
CI 가 정상적으로 통과하였다면 보낸 풀리퀘스트에서 "All checks have passed" 를 보실 수 있습니다.
![ResultOfCI](https://hyungheo.github.io/png/ci.sample.png)

## 코드리뷰
1. [리뷰준비](#리뷰준비)
2. [리뷰어찾기](#리뷰어찾기)
3. [리뷰요청](#리뷰요청)
4. [리뷰승인](#리뷰승인)

### 리뷰준비
#### CI확인
리뷰는 기본적으로 CI 가 모두 PASS 한 뒤에 요청하는 것을 원칙으로 합니다. CI 는 풀리퀘스트를 보냄과 동시에 자동으로 실행됩니다.
![ResultOfCI](https://hyungheo.github.io/png/ci.sample.png)

### 리뷰어찾기

#### 코드오너
[CODEOWNERS](https://github.com/lunchclass/absolute/blob/master/docs/CODEOWNERS) 를 확인하여 코드오너를 리뷰어로 할당합니다. 코드오너가 아니더라도 리뷰는 누구나 가능하지만 머지를 위해서는 반드시 코드오너의 리뷰와 승인이 필요합니다.

```
# Order is important; the last matching pattern takes the most precedence.

# Absolute Project Owners
* @romandev
```

#### 기존코드수정시
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

### 리뷰요청
리뷰어를 할당되면 리뷰요청이 전달됩니다.
리뷰어 중 코드오너는 리뷰요청뒤 24시간내로 리뷰를 해야 합니다.(공휴일과 주말은 제외)
24시간내에 리뷰가 완료되어야 함을 의미하는 것은 아닙니다만, 적어도 의미있는 피드백을 요청자에게 주어야 합니다.

### 리뷰승인
코드오너가 *LGTM* 을 코멘트로 추가하고 Approve 를 해주어야만 리뷰가 승인됩니다. *LGTM* 는 `Looks Good to me`를 의미합니다.

참고로 리뷰에 자주 사용되는 용어는 다음과 같습니다.
 * LGTM : Looks Good To Me
 * IMHO : In My Humble Opinion
 * PTAL : Please Take A Look
 * NIT :  A small change that may not be very important, but is technically correct.


### 리뷰승인후
머지전에 upstream 을 베이스로 fetch 와 리베이스를 진행하여 컨플릭이 발생하는지를 확인합니다.
```
git fetch upstream
git rebase upstream/master

# 컨틀릭트 파일이 존재하여 리졸브가 필요했을 경우
git rebase --continue
```


## AUTHORS추가
첫번째 패치라면 반드시 [AUTHORS](https://github.com/lunchclass/absolute/blob/master/docs/AUTHORS) 에 본인의 이름과 이메일을 추가해 주시기 바랍니다. 이름을 추가하실 때는 반드시 알파벳순서대로 기입해 주셔야 합니다.

예) *Aberaham Lee* 가 첫 패치를 올릴 때 기존 AUTHORS 파일에 Jinho Bang 이 있다면
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

*Aberaham Lee* 는 *Jinho Bang* 위에 기입해주셔야 합니다.
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
