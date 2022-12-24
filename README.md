# DR0P1N

![DR0P1N LOGO](./readMeAssets/dropinlogo.jpg)

## CONCEPT

DR0P1N is a web app that enables skateboarders in the Richmond metro area to find and share skate spots with fellow skaters.

### FUNCTIONALITY

Upon registering an account, the user should be able to browse local spots, update information about these spots, create new spots, comment on spots, and DR0P1N to spots.

#### WHATS A DR0P1N?

DR0P1Ns are similar to the concept of "checking in" on the old Four Square app. The general idea is that users can arrive at a spot and DR0P1N on the app to let other users know where they're skating.

Users can check spots to see how many active DR0P1Ns there are. This has a couple benefits:

1. It lets users from out of town know where the popular skate spots are.
2. It lets local skaters link up with friends they see are active at a spot.
3. It enables users to decide whether or not they want to show up to a crowded skate spot.

## GETTING STARTED

[Checkout my trello board](https://trello.com/b/V4GlD6DK/dr0p1n)

### MVP GOALS

1. User registration and log-in for protected routes.
2. An interactive map with geo-markers representing local skatespots.
3. Mapping card elements of local spots
4. A spot detail view where users can get more information about a spot, read and post comments, update spot information, and DR0P1N.

### STRETCH

1. Adding events to spots (meetups, skate competitions, clean-ups, volunteering, etc)
2. Friends lists, leaderboards for regular DROPINs
3. User settings/panel to change username, password, upload profile picture, etc.

### PLANNING

![DR0P1N ERD AND WIREFRAME](./readMeAssets/dr0p1n_ERD_wireframe.jpg)

### TECHNOLOGY AND RESOURCES

#### FRONT END TECH
1. [React.js](https://beta.reactjs.org/) for frontend
2. [React Leaflet](https://react-leaflet.js.org/) for map rendering and interactivity

#### BACK END TECH
1. [Django](https://docs.djangoproject.com/en/4.1/)
2. [Django REST framework](https://www.django-rest-framework.org/)}
3. [Simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/index.html)
4. [Django CORS Headers](https://pypi.org/project/django-cors-headers/)
5. [psycopg2-binary](https://pypi.org/project/psycopg2-binary/)
6. [Pillow](https://pillow.readthedocs.io/en/stable/installation.html)

#### BACK END RESOURCES
1. [Authentication & Refreshing Tokens Implementation](https://youtu.be/xjMP0hspNLE) | Dennis Ivy | Youtube
2. [Refreshing Tokens With Axios Interceptors](https://youtu.be/16-1mTdGBoM) | Dennis Ivy | Youtube
3. [JWT.IO](https://jwt.io/) for decoding tokens/testing.


