# THREE.js

## Three.js 란?

웹페이지에 3D 객체를 쉽게 렌더링하도록 도와주는 자바스크립트 3D 라이브러리이다. 3D 객체를 렌더링하는 데 WebGL을 사용한다. WebGL은 점, 선, 삼각형만을 그리는 아주 단순한 시스템이기 때문에 WebGL만 사용해서 무언가를 만들려면 상당히 많은 양의 코드가 필요하다. Three.js는 씬, 광원, 그림자, 물체, 텍스처와 같은 3D 요소들의 처리를 도와 직관적인 코드를 짤 수 있도록 해준다.

## Three.js 앱의 구조

### 1. Scene

배경색, 안개 등의 요소를 포함한다. 여러개의 3D 객체와 빛들이 모인 장면이다.

### 2. Camera

장면을 화면에 담기 위한 카메라이다. 시야각, 종횡비, 카메라 시작 끝 지점, 카메라 위치 등을 설정한다.

### 3. Geometry

기하학 객체의 정점 데이터로 구, 정육면체, 면, 개, 고양이 등 다양한 것들이 될 수 있다. Three.js에서는 기본적으로 내장 `Geometry` 객체를 제공한다.

### 4. Material(재질)

기하학 객체를 그리는 데 사용하는 표현 속성이다. 색이나 밝기 등을 지정한다.

### 5. Mesh

어떤 `Material`로 하나의 `Geometry`를 그리는 객체이다. 여러개의 `Mesh`가 하나의 `Material` 또는 `Geometry`를 동시에 참조할 수 있다.
