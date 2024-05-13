FROM python:3.10.14

COPY ./requirements.txt /flaskfolder/requirements.txt

COPY . /flaskfolder/

WORKDIR /flaskfolder/

RUN pip install -r requirements.txt

CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]