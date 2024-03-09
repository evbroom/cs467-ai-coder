#!/usr/bin/env bash
# Exit on error
set -o errexit

# Modify this line as needed for your package manager (pip, poetry, etc.)
pip install -r requirements.txt

# Apply any outstanding database migrations
python paws_together_backend/manage.py migrate

if [[ $CREATE_SUPERUSER == "true" ]];
then
  python paws_together_backend/manage.py createsuperuser --no-input
fi
