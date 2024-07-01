## Git 활용

#### 몇 가지 룰

1. 최소 단위로 기능 개발하기! 
> 최소 단위로 작업 나눠서 개발하고 Pull Request 올리기! 다른 규칙들이 대부분 1번을 얼마나 잘 지키느냐에 의존하기 때문에 1번을 잘 지켜야합니다.

2. 최소 단위로 커밋하기
> 파일 하나에서도 변경 사항을 추적할 수 있도록 하는 것이 가장 좋습니다. 가능하면 커밋 하나에는 수정된 파일 5개 이상 넘지 않도록 지켜주세요. 물론 파일 경로를 수정하거나, 파일 이름을 바꾸거나 삭제하는 등 작업 진행과 관련해서 일반적이지 않은 상황에서는 괜찮습니다. 커밋이 얼마나 작게 나누어져있느냐에 따라 리뷰 난이도가 달라집니다.

3. 최소 단위로 파일 관리하기
> 하나의 Pull Request 안에서 수정되는 파일은 적을수록 좋습니다. 하나의 Pull Request에 수정된 파일이 하나만 있어도 괜찮습니다. Pull Request에서 수정된 파일이 20개 이상은 넘지 않도록 해주세요. 보통 Pull Request 단위로 리뷰를 진행하기 때문에 이것 역시 리뷰 난위도에 영향을 미칩니다.


#### 브랜치 관리

main: 제품 릴리즈 브랜치
release: 제품 릴리즈 전 릴리스와 똑같은 소스를 유지하는 서브 브랜치(급할 경우에 main에 바로 머지되는 등의 문제가 있을 수 있을 때 release 소스를 안정적으로 유지해야 하기 때문)
develop: 제품 테스트에 사용하는 브랜치

feat-...
refactor-...
bug-...
위와 같은 브랜치는 아래 명령어를 통해 생성됩니다.
```bash
git checkout -b feat-[작업자 명]-[브랜치 명] origin/develop
```

기본적으로 모든 브랜치는 base 브랜치를 develop으로 하고 기능 개발이 완료되면 develop 브랜치에 머지합니다. 다만, 몇 가지 다른 케이스가 있습니다.

케이스: 기능 개발을 완료하고 해당 브랜치의 Pull Request가 올라가 있는 상황. 하지만 해당 Pull Request가 머지가 되지 않은 상황.
이 경우 위에 Pull Request가 머지되기 이전 추가 기능 개발을 하고 싶을 때!!! 이 때는 develop 브랜치가 아닌 Pull Request로 올라가 있는 브랜치를 베이스 브랜치로 합니다.
만약, 첫 번째 Pull Request가 머지되면 자동으로 두 번째 Pull Request의 베이스 브랜치가 develop으로 바뀌게 됩니다.

추가 주의 사항: 만약 다른 사람이 작업한 브랜치가 develop에 머지되면 작업 중인 브랜치에서 develop 브랜치로 이동 후 해당 내용을 develop에서 pull을 받고 다시 현재 작업 중인 브랜치에서 리베이스 합니다. 아래 커맨드 사용가능

```bash
# current: cli-jaehun-login

git checkout develop # develop으로 이동

git pull origin develop # pull 받음

git chekcout cli-jaehun-login # 원래 브랜치로 이동

git rebase develop # 리베이스

```

### 코드 리뷰

1. 각자 기능 개발을 위한 브랜치 생성

2. 기능 개발 후 Pull Request 올리기

3. 해당 Pull Request에 대해 reviewer를 상대방으로 설정, assignee를 자신으로 설정, tag는 작업 내용에 따라서!