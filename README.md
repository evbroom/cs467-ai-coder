# cs467-ai-coder
CS467 - AI Coder - Animal Adoption

## Backend Setup and Running Instructions

1. **Install Python**: The application is built with Django, which requires Python. You can download it from the [official Python website](https://www.python.org/downloads/).

2. **Install PostgreSQL**: As the application uses PostgreSQL for the database, it needs to be installed. You can download it from the [official PostgreSQL website](https://www.postgresql.org/download/).

3. **Set up the PostgreSQL database locally**: After installing PostgreSQL, you need to create a new database and user with the credentials provided in the `settings.py` file. Here are the commands you need to run in the PostgreSQL command line:

    ```sql
    CREATE DATABASE pawsapp;
    CREATE USER postgres WITH PASSWORD 'cs467';
    GRANT ALL PRIVILEGES ON DATABASE pawsapp TO postgres;
    ```
    ** Note this password is hardcoded in settings.py for local development. We will hide credentials before we deploy.

4. **Create a Virtual Environment**: Before installing Django, it's recommended to create a virtual environment. This can be done using the following commands in your terminal:

    ```bash
    python -m venv env
    ```

    To activate the virtual environment, use:

    - On Windows:
      ```bash
      env\Scripts\activate
      ```
    - On MacOS/Linux:
      ```bash
      source env/bin/activate
      ```
      
5. **Install Django**: You can install Django by running the following command in your terminal:

    ```bash
    pip install Django
    ```

6. **Clone the application repository**: Clone the application repository to your local machine using Git.

7. **Install the required Python packages**: Navigate to the directory where you cloned the repository and install the required Python packages using the following command:

    ```bash
    pip install -r requirements.txt
    ```

8. **Run the Django migrations**: This will create the necessary tables in your database. Run the following commands:

    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

9. **Create a Django superuser**: To access the admin panel, you need to create a superuser. Run the following command and follow the prompts:

    ```bash
    python manage.py createsuperuser
    ```
10. **Start the Django server**: You can start the Django server using the following command:

    ```bash
    python manage.py runserver
    ```

Now, you should be able to access the application in your web browser at `http://localhost:8000`.
The admin page is located at `http://localhost:8000/admin`
**Note**: Remember to deactivate your virtual environment when you're done working on the project by running `deactivate` in your terminal.
