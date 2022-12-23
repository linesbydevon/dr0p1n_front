CREATE DATABASE base_dropin;
CREATE USER dropinuser WITH PASSWORD 'dropin';
GRANT ALL PRIVILEGES ON DATABASE base_dropin TO dropinuser;