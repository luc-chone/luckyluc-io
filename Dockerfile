FROM britesnow/base-node

RUN mkdir /service && mkdir /service/web-folder && mkdir /service/server

WORKDIR /service

COPY web-folder/ /service/web-folder/

COPY server/ /service/server/

WORKDIR /service/server
RUN npm install

CMD ["/service/server/entry-point.sh"]