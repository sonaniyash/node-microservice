FROM mongo:4
RUN mkdir /config
WORKDIR /config
COPY /config/wait-for-it.sh .
COPY /config/mongo-setup.js .
COPY /config/mongo-setup.sh .
RUN chmod +x /config/wait-for-it.sh
RUN chmod +x /config/mongo-setup.sh
RUN sed -i -e 's/\r$//' /config/wait-for-it.sh
RUN sed -i -e 's/\r$//' /config/mongo-setup.sh
CMD [ "bash", "-c", "/config/wait-for-it.sh mongodb1:27017 -- /config/mongo-setup.sh"]