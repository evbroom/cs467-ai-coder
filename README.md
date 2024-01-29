# cs467-ai-coder
CS467 - AI Coder - Animal Adoption

# Installing PostgreSQL in a Django Application (assuming Django is already installed)

### 1. Install PostgreSQL
- Download and install PostgreSQL from the [official website](https://www.postgresql.org/download/).

### 2. Install psycopg2
- Install psycopg2: `pip install psycopg2-binary` (This is the PostgreSQL adapter for Python)

## 3. Configure PostgreSQL for Django
- Log in to the PostgreSQL command line interface: `psql -U username`
- Create a database for your project: `CREATE DATABASE myproject;`
- Create a user: `CREATE USER myuser WITH PASSWORD 'cs467';`
- Grant privileges: `GRANT ALL PRIVILEGES ON DATABASE myproject TO myuser;`
- Exit PostgreSQL interface: `\q`

## 4. Update Django Settings
### Note: settings.py will contain a password (for now). We will move to environment variables once everyone has a dev environment set up
- Open `myproject/settings.py`
- Find the `DATABASES` setting and modify it to use PostgreSQL:

  ```python
  DATABASES = {
      'default': {
          'ENGINE': 'django.db.backends.postgresql',
          'NAME': 'myproject',
          'USER': 'myuser',
          'PASSWORD': 'cs467',
          'HOST': 'localhost',
          'PORT': '',
      }
  }

## 5. Run Migrations
- Make migrations: `python manage.py makemigrations`
- Apply migrations: `python manage.py migrate`
