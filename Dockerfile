# ============================
# Stage 2: Setup Backend (Node.js)
# ============================
#Node.js base image
FROM node:18 AS backend-build

#working directory for application
WORKDIR /app

#package.json
COPY frontend/package.json ./

#Install node js dependencies
RUN npm install 

#copy backend code 
COPY backend ./

#copy ml folder
COPY backend/ML /app/ML

# ============================
# Stage 3: Setup Python Environment
# ============================
FROM python:3.11 AS python-env

#set working directory
WORKDIR /app

COPY backend/v_e_utils/requirements_original.txt /app/v_e_utils/requirements_original.txt

#install virtual environment
RUN python -m venv /app/Routes_help/virtual_e --copies

#activate virtual environment and install dependencies
RUN /app/Routes_help/virtual_e/bin/pip install -r /app/v_e_utils/requirements_original.txt

# ============================
# Stage 4: Final Image (Combining Everything)
# ============================
#combine node.js and python environments
FROM mcr.microsoft.com/devcontainers/javascript-node:18-bookworm AS final

# Set working directory
WORKDIR /app

# Install system dependencies (Python + FFmpeg)
RUN apt-get update && apt-get install -y ffmpeg python3.11 python3.11-venv python3.11-dev

# Copy backend from backend-build stage
COPY --from=backend-build /app .

# Copy Python environment from python-env stage
COPY --from=python-env /app /app

#debug
#RUN ls -R /app 

RUN chmod +x /app/Routes_help/virtual_e/bin/python3.11
#permissions
RUN chmod -R 755 /app/Routes_help/virtual_e

#expose port in which backend server runs
EXPOSE 5001 

#start app
CMD ["sh", "-c", "node server.js"]
