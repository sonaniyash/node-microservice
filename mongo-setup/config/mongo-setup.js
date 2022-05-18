rsconf = {
    _id : "mongo-replica-0",
    members: [
        {
            "_id": 0,
            "host": "mongodb://localhost:27017",
            "priority": 4
        }
    ]
 }

rs.initiate(rsconf); 

db = db.getSiblingDB('test-database');
db.createUser({
  user:  'user',
  pwd: 'password',
  roles: [{
    db: 'test-database'
  }]
});