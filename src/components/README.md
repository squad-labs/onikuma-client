### Description

프로젝트 내에서 사용되는 UI 컴포넌트를 정의하는 폴더입니다. 각 컴포넌트는 기능을 포함합니다. 컴포넌트는 common/과 container/로 구분됩니다. common/ 컴포넌트는 기능을 포함한 UI 컴포넌트이고, container/ 컴포넌트는 common/ 컴포넌트를 aggregate하는 역할을 합니다.

때문에 common/ 내부에 있는 컴포넌트는 서로 의존성을 가질 수 없고, common/ 내부에 있는 컴포넌트가 container/ 내부에 있는 컴포넌트에 대한 의존성을 가질 수도 없습니다. container/ 컴포넌트는 common/ 컴포넌트에 대해 의존성을 가질 수 있습니다.
