# Troubleshooting Guide

## Common Issues and Solutions

---

## 1. Database Connection Errors

### Error: "No module named 'MySQLdb'" or "No module named 'pymysql'"

**Solution:**
```bash
pip install PyMySQL
```

### Error: "ERROR 2003: Can't connect to MySQL server on 'localhost' (10061)"

**Solution:**
- Ensure MySQL is running
- On Windows:
  ```bash
  net start MySQL80  # or your MySQL version
  ```
- Check if MySQL is installed:
  ```bash
  mysql --version
  ```
- Verify connection details in `.env`:
  ```
  DB_HOST=localhost
  DB_PORT=3306
  DB_USER=root
  DB_PASSWORD=your_password
  ```

### Error: "Access denied for user 'root'@'localhost'"

**Solution:**
- Check your MySQL password in `.env` matches
- Reset MySQL root password if forgotten:
  ```bash
  mysql -u root
  ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
  FLUSH PRIVILEGES;
  ```

### Error: "Unknown database 'ems_db'"

**Solution:**
Create the database manually:
```bash
mysql -u root -p
CREATE DATABASE ems_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

---

## 2. Migration Errors

### Error: "django.db.utils.ProgrammingError: 1064"

**Solution:**
```bash
cd ems_project
python manage.py migrate --fake-initial
python manage.py migrate
```

### Error: "conflicting migrations"

**Solution:**
```bash
cd ems_project
python manage.py makemigrations
python manage.py migrate
```

### Error: "Table already exists"

**Solution:**
```bash
# Reset migrations (WARNING: This deletes all data)
cd ems_project
python manage.py flush
python manage.py migrate
```

---

## 3. Virtual Environment Issues

### Error: "venv\Scripts\activate is not recognized"

**Solution (Windows):**
```bash
python -m venv venv
venv\Scripts\activate.bat
```

**Solution (macOS/Linux):**
```bash
python -m venv venv
source venv/bin/activate
```

### Error: "Could not find python3"

**Solution:**
- Install Python 3.8+
- Add Python to PATH:
  ```bash
  python -m venv venv  # Use 'python' or 'python3' depending on installation
  ```

---

## 4. Dependency Installation Issues

### Error: "pip: command not found"

**Solution:**
- Ensure pip is installed:
  ```bash
  python -m pip --version
  python -m pip install --upgrade pip
  ```
- Install using Python module:
  ```bash
  python -m pip install -r requirements.txt
  ```

### Error: "Couldn't find a version that satisfies the requirement"

**Solution:**
- Update pip:
  ```bash
  pip install --upgrade pip
  ```
- Clear pip cache:
  ```bash
  pip cache purge
  pip install -r requirements.txt
  ```

### Error: "Module not found" when running a file

**Solution:**
- Ensure virtual environment is activated
- Reinstall dependencies:
  ```bash
  pip install -r requirements.txt
  ```

---

## 5. Django Server Issues

### Error: "Address already in use"

**Solution:**
The default port 8000 is in use. Use a different port:
```bash
python manage.py runserver 8001
```

Or find and kill the process (Windows):
```bash
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

Or (macOS/Linux):
```bash
lsof -i :8000
kill -9 <PID>
```

### Error: "DisallowedHost at /"

**Solution:**
Add your host to `ALLOWED_HOSTS` in `settings.py`:
```python
ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'yourdomain.com', '*']
```

Or in `.env`:
```
ALLOWED_HOSTS=localhost,127.0.0.1,yourdomain.com
```

### Error: "ModuleNotFoundError: No module named 'ems_project'"

**Solution:**
- Ensure you're running from the correct directory:
  ```bash
  cd ems_project  # Django project directory
  python manage.py runserver
  ```
- Verify `ems_project/settings.py` exists

---

## 6. Authentication Issues

### Error: "Authentication credentials were not provided"

**Solution:**
- Include token in request header:
  ```
  Authorization: Token YOUR_TOKEN_HERE
  ```
- Get a token by logging in:
  ```bash
  curl -X POST http://localhost:8000/api/users/users/login/ \
    -H "Content-Type: application/json" \
    -d '{"username": "john", "password": "pass"}'
  ```

### Error: "Invalid token" or "Token not found"

**Solution:**
- Token may be expired or invalid
- Get a new token by logging in again
- Check token in browser DevTools → Application → LocalStorage

### Error: "User not found after successful login"

**Solution:**
- Create a superuser:
  ```bash
  cd ems_project
  python manage.py createsuperuser
  ```

---

## 7. CORS Errors

### Error: "Access to XMLHttpRequest blocked by CORS"

**Solution:**
- Check `CORS_ALLOWED_ORIGINS` in `.env`:
  ```
  CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
  ```
- Restart the Django server after changing
- Verify frontend is running on the specified port

### Error: "CORS header 'Access-Control-Allow-Origin' missing"

**Solution:**
- Ensure `django-cors-headers` is installed:
  ```bash
  pip install django-cors-headers
  ```
- Check `INSTALLED_APPS` in settings includes `corsheaders`
- Check `MIDDLEWARE` includes CorsMiddleware

---

## 8. Payment/Stripe Issues

### Error: "Invalid API Key"

**Solution:**
- Verify `STRIPE_SECRET_KEY` in `.env`:
  ```
  STRIPE_SECRET_KEY=sk_test_your_actual_key_here
  ```
- Use test keys for development
- Restart Django server

### Error: "The card was declined"

**Solution:**
- Use Stripe test card numbers:
  - Success: `4242 4242 4242 4242`
  - Decline: `4000 0000 0000 0002`
  - 3D Secure: `4000 0025 0000 3010`

### Error: "No such payment intent"

**Solution:**
- Ensure payment exists before processing
- Check payment ID in request matches database

---

## 9. File Upload Issues

### Error: "The submitted file is empty"

**Solution:**
- Ensure file is being sent as multipart/form-data
- Client-side example:
  ```javascript
  const formData = new FormData();
  formData.append('image', fileInput.files[0]);
  formData.append('title', 'Event Title');
  ```

### Error: "Could not determine image type"

**Solution:**
- Ensure image file is in supported format (JPEG, PNG, GIF)
- Image size should be reasonable (< 10MB recommended)

### Error: "Media directory not found"

**Solution:**
- Create media directory:
  ```bash
  mkdir media
  mkdir staticfiles
  ```
- Verify `MEDIA_ROOT` and `STATIC_ROOT` in settings

---

## 10. Performance Issues

### Solution: Server is slow

**Checklist:**
- Check database connection (local vs remote)
- Enable query caching
- Use database indexes (already configured)
- Monitor with Django Debug Toolbar:
  ```bash
  pip install django-debug-toolbar
  ```
- Check for N+1 queries
- Use `.select_related()` and `.prefetch_related()`

### Solution: High memory usage

**Checklist:**
- Paginate large querysets
- Use `.values()` instead of `.all()` if only specific fields needed
- Monitor with:
  ```bash
  python manage.py shell_plus --print-sql
  ```

---

## 11. Testing Issues

### Error: "Test database cannot be created"

**Solution:**
- Ensure test database privileges
- Use:
  ```bash
  python manage.py test --keepdb
  ```

### Running Tests

```bash
# Run all tests
python manage.py test

# Run specific app tests
python manage.py test users

# Run specific test case
python manage.py test users.tests.UserTestCase

# Verbose output
python manage.py test -v 2
```

---

## 12. Static Files Issues

### Error: "CSS/JS not loading in production"

**Solution:**
```bash
cd ems_project
python manage.py collectstatic --noinput
```

### Configure in production (Nginx/Apache):

```nginx
location /static/ {
    alias /path/to/project/staticfiles/;
}

location /media/ {
    alias /path/to/project/media/;
}
```

---

## 13. Email Notification Issues

If you want to enable email notifications (future feature):

```python
# settings.py
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'your-email@gmail.com'
EMAIL_HOST_PASSWORD = 'your-app-password'
```

---

## Debugging Tools

### Django Shell
```bash
cd ems_project
python manage.py shell
```

### Check database connection
```python
from django.db import connection
print(connection.queries)
```

### View all registered URLs
```bash
python manage.py show_urls
```

### Check migrations
```bash
python manage.py showmigrations
```

### Create test data
```bash
python manage.py shell
>>> from users.models import UserProfile
>>> UserProfile.objects.create(...)
```

---

## Logging

Enable detailed logging in `settings.py`:

```python
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'debug.log',
        },
    },
    'root': {
        'handlers': ['file'],
        'level': 'DEBUG',
    },
}
```

Then check `debug.log` for detailed information.

---

## Getting Help

### Useful Resources
- Django Documentation: https://docs.djangoproject.com/
- Django REST Framework: https://www.django-rest-framework.org/
- MySQL Documentation: https://dev.mysql.com/doc/
- Stripe Documentation: https://stripe.com/docs

### Stack Overflow Tags
- `django`
- `django-rest-framework`
- `mysql`
- `python`

---

## General Debugging Steps

1. **Check the error message** - Read it carefully, it usually tells you what's wrong
2. **Check logs** - Look at console output and log files
3. **Verify configuration** - Check `.env` file is correct
4. **Restart services** - Restart Django, MySQL, browser
5. **Clear cache** - Clear browser cache, pip cache, Django cache
6. **Use simpler testing** - Test with API client (Postman) before frontend
7. **Check dependencies** - Ensure all packages are installed with correct versions
8. **Isolate the problem** - Test individual functions/endpoints in isolation
9. **Search for solutions** - Google the error message + Django
10. **Ask for help** - Give context and full error message when asking
