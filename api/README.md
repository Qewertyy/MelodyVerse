# ConnectVerse


## Deploy Locally
To use this API, you will need Node.js and npm installed on your machine. You can install the necessary dependencies by running once you have cloned the repository:

```bash
echo "MONGODB_URI=<your_mongodb_uri>" > Melodyverse/api/.env
echo "JWT_SECRET=<your_jwt_secret>" >> Melodyverse/api/.env
cd Melodyverse/api && npm i && npm run dev
```

## Deploy to vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FQewertyy%2FMelodyverse&demo-title=MelodyVerse&demo-url=https%3A%2F%2Fmelodyverse-api.vercel.app%2F)

## Usage

### Endpoints
- **GET /api/user** - Retrieves information about a user.
- **POST /api/auth/register** - Registers a new user.
- **POST /api/auth/login** - Logs in a user.

### Response
The API returns a JSON response with the following structure:

```json
{
  "success": true,
  [key]:value
}
```

In case of an error, the response will include an appropriate error message along with the HTTP status code.