#base image
FROM nikolaik/python-nodejs:python3.12-nodejs18

#set working directory
WORKDIR /app

#copy node js dependencies
COPY package*.json ./
RUN npm install 

#copy application code
COPY . .

#set up virtual environment and upgrade pip
RUN python3.12 -m venv /app/virtual_e
    
RUN /app/virtual_e/bin/pip install --upgrade pip

#copy backend .env file
COPY backend/backend_details.env /app/backend/backend_details.env

#Installing python dependencies
COPY backend/v_e_utils/requirements_original.txt /app/backend/v_e_utils/requirements.txt
RUN /app/virtual_e/bin/pip install -r /app/backend/v_e_utils/requirements.txt

#expose ports
EXPOSE 3001 5001

#starting the application
CMD ["sh", "-c", "npm start & node backend/server.js"]