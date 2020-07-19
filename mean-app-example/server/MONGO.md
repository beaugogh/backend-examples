### mongo shell command cheatsheet

([MongoDB compass](https://www.mongodb.com/products/compass) would also do)

To enter the mongo shell

```shell
$ mongo
```

To show available databases

```shell
$ show dbs
```

To see the current database

```shell
$ db
```

To switch to a specific database

```shell
$ use my_db
```

To show existing collections/tables

```shell
$ show collections
```
or

```shell
$ show tables
```

To find, insert, update, remove data in a database

```shell
$ db.my_db.find().pretty()
$ db.my_db.insert({"foo":"bar"})
$ db.my_db.update({"foo":"bar"})
$ db.my_db.remove({"foo":"bar"})
```

To create/remove a collection/table in a database

```shell
$ db.createCollection('foo')
$ db.foo.drop()
```



