## TODO List

### Frontend

1) Update own % state of the user (frontend)
2) Polish the UI
2.1) Landing page
2.2) Timer page
2.3) Round page
2.4) Round end page

3) Round end handling (probably just move to the index page for now afte 5 sec delay)

### Backend

1) Cleanup on redis .
2) Redis round life-cycle management
3) Redis state management
3.1) Make sure disconnected user is being removed from the queue (if waiting)
3.2) Make sure the finished rounds are being deleted from the cache
3.3) Make sure to handle properly all cases for typing / error handling 
3.4) User access management
4) Random text generation