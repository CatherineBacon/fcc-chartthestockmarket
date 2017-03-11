# Chart the Stock Market

This app was created as part of the following FreeCodeCamp challenge: https://www.freecodecamp.com/challenges/chart-the-stock-market

**Final app: http://catherinecollinson.com/fcc-chartthestockmarket/**

## Objective

Build a full stack JavaScript app that is functionally similar to [this](http://watchstocks.herokuapp.com/).

### User Stories:

- I can view a graph displaying the recent trend lines for each added stock.

- I can add new stocks by their symbol name.

- I can remove stocks.

- I can see changes in real-time when any other user adds or removes a stock. For this you will need to use Web Sockets.


## Libraries/Frameworks

The basis for the code was [Create React App](https://github.com/facebookincubator/create-react-app).

I used the [google finance](https://github.com/pilwon/node-google-finance) api to fetch the stock market data for the files.

To sync the data between users in real-time I used [Firebase](https://firebase.google.com/).

Styling was achieved using css built in to the Create React App along with [Bootstrap](http://getbootstrap.com/).

Built [this](https://github.com/CatherineBacon/google-finance-proxy) microserver to proxy requests to google finance api (to avoid CORS issues) to enable this to be a signle page app without a server.
