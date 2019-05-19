FROM britesnow/base-node

RUN mkdir /service && mkdir /service/web-folder && mkdir /service/server

WORKDIR /service

COPY web-folder/ ./web-folder/

COPY server/ ./server/

COPY package.json tsconfig.json entry-point.sh  ./

RUN npm install

CMD ["/service/entry-point.sh"]