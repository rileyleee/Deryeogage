#base image 설정
FROM node:14-alpine as build

#컨테이너 내부 작업 디렉토리 설정
WORKDIR /app

#app dependencies
COPY package*.json ./

#pakage.json 및 pakage-lock.json 파일에 명시된 의존성 패키지들을 설치
RUN npm install

#호스트 머신의 현재 디렉토리 파일들을 컨테이너 내부로 전부 복사
COPY . .

#run build
RUN npm run build

#prod enviroment
FROM nginx:stable-alpine

#이전 빌드 단계에서 빌드한 결과물을 /usr/share/nginx/html로 복사한다.
COPY --from=build /app/build /usr/share/nginx/html

# 기본 NGINX 설정 파일을 삭제한다. (custom 설정과 충돌 방지)
RUN rm /etc/nginx/conf.d/default.conf

#custom 설정파일을 컨테이너 내부로 복사한다.
COPY nginx.conf /etc/nginx/conf.d

#컨테이너의 3000번 포트를 열어준다.
EXPOSE 3000

#nginx 서버를 실행하고 백그라운드로 동작하도록
CMD ["nginx", "-g", "daemon off;"]