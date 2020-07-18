use CyberShopee
go

create table roles( roleId int primary key, roleName varchar(20))
create table users(userId int primary key,  userPassword varchar(20), roleId int references roles(roleId))


create table customers(userId int primary key references users(userId), userName varchar(15), email varchar(30) unique, phoneNo varchar(15) unique,
					   address varchar(60), pincode varchar(6))

create table categories(categoryId int primary key, categoryName varchar(20))

create table products(productId int primary key, productName varchar(20), categoryId int references categories(categoryId), price money, description varchar(40), imageUrl varchar(40))

create table orderDetails(orderItemId int primary key, userId int references users(userId),
						  productId int references products(productId), quantity int, price money, totalAmount money)

create table shoppingCart(cartNo int primary key, userId int references customers(userId), productId int references products(productId), quantity int, price money,
						 totalAmount money)
select * from products
select * from categories




