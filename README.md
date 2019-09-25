# Replate-Node
The Backend for the Lambda School Build Weeks Project, build with Node and Express.  September, 2019

<h2>Not all methods are functional.  API base functionality still being built.  

BASE_URL =  http://0bbfee1e.ngrok.io

/locations
available methods: GET, POST
<code>
{
	"location": "san jose"
}
</code>

/auth/login
<strong>post </strong>
sample request object : 
<code>
{
"username" : "user1",
"password": pass
}
</code>

returns the user object with a JWT token.

/auth/register
<strong>POST </strong>
sample request object : 
<code>
{
"restaurant_name" : "wendy's
"username" : "wendy",
"password": pass
}
</code>

<code>
{
"volunteer_name" : "Johnny"
"username" : "wendy",
"password": pass
}
</code>


/locations/:id
available methods: GET, PUT, DELETE

/restaurants
available methods: GET, POST
<code>
{
"restaurant_name" : "Flower Child"
}
</code>

/restaurants/:id
available methods: GET, PUT, DELETE

/volunteers
available methods: GET, POST, PUT, DELETE

/volunteers/:id
available methods: GET, PUT, DELETE

/pickups
available methods : GET, POST, PUT, DELETE

/pickups/:id
available methods : GET, PUT, DELETE

/nonprofits
available methods : GET, POST, PUT, DELETE

/nonprofits/:id
available methods : GET, PUT, DELETE


