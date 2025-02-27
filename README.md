# ticket-system
Jira Like system

Steps to run:
1. Run deploy.sh  - This will start frontend application on port 3000
2. Run runBEscript.sh - This will start node-server

Note - This uses json-server. So GET request works fine but PUT & PATCH does not work as json-server doesn't work on arrays of nested onject. So those results have only be acheieved from state changes.
