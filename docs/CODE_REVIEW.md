CODE REVIEW
===========

## Common 
* 리뷰는 아무나 할 수 있다. 상대를 존중하는 마음을 가지고 리뷰에 임하며 원색적인 비난이나 공격적인 태도는 지양한다.
* 그러나 머지를 하기 위해선 다음 조건 들이 패스 해야 한다. 
  * 코드 오너의 리뷰 승인이 필요하다.
  * Bot에서 모든 테스트 결과가 통과 되어야 한다.
* 리뷰에 자주 사용되는 용어는 다음과 같다.
  * LGTM : Looks Good To Me
  * IMHO : In My Humble Opinion
  * PTAL : Please Take A Look
  * NIT :  A small change that may not be very important, but is technically correct.

## 리뷰어  
* 리뷰어는 Pull Request 생성 후 24시간 내 피드백을 줘야 한다.
* 리뷰어는 다음과 같은 부분에 중점을 두고 리뷰를 해야 한다.
  * commit description이 72byte를 넘어가는지, 이 부분은 추후 자동화 예정이다.
  * 패치의 간결성
  * 코딩 스타일
* 리뷰가 완료되면 코드 오너는 해당 Pull request를 merge한다.

## 리뷰이
* 리뷰이는 리뷰어의 피드백에 대해 응답하거나 반영하며 이어서 리뷰를 받을 수 있다.
