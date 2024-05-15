FROM nginx:1.25.2-alpine-slim

# default.conf 삭제
RUN rm /etc/nginx/conf.d/default.conf

# 작성한 nginx.conf 복제
# COPY ./.platform/nginx/nginx.conf /etc/nginx/nginx.conf